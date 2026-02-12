import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Lock, ArrowRight, Loader2, Eye, EyeOff } from 'lucide-react'
import { useLanguage } from '../../context/LanguageContext'
import { LanguageToggle } from '../common/LanguageToggle'
import { Toast } from '../../utils/toast'
import { API_BASE, setToken } from '../../utils/api'

export function PassphrasePage() {
    const { t } = useLanguage()
    const navigate = useNavigate()
    const [passphrase, setPassphrase] = useState('')
    const [error, setError] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [showPassphrase, setShowPassphrase] = useState(false)

    const handleUnlock = async (e) => {
        e.preventDefault()
        setError(false)
        setIsLoading(true)

        try {
            if (passphrase === '') {
                Toast.fire({
                    icon: 'error',
                    title: t('passphraseRequired')
                })
                return
            }

            const response = await fetch(`${API_BASE}/verify-passphrase`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ passphrase }),
            });


            const data = await response.json();

            if (data.success) {
                // Store JWT token
                setToken(data.token)

                Toast.fire({
                    icon: 'success',
                    title: t('passphraseVerified')
                })
                navigate('/rooms')
            } else {
                setError(true)
                Toast.fire({
                    icon: 'error',
                    title: t('incorrectPassphrase') || 'Incorrect Passphrase'
                })
                setTimeout(() => setError(false), 2000)
            }
        } catch (err) {
            console.error('Auth error:', err);
            setError(true)
            Toast.fire({
                icon: 'error',
                title: 'An error occurred during verification'
            })
            setTimeout(() => setError(false), 2000)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <>
            {/* Background Animations (Same as App.jsx) */}
            <div className="app-background">
                <div className="light-orb light-orb-1 animate-glow"></div>
                <div className="light-orb light-orb-2 animate-glow"></div>
                <div className="light-orb light-orb-3 animate-glow"></div>
            </div>

            <div className="min-h-screen flex items-center justify-center p-4">

                {/* Language Toggle */}
                <div className="absolute top-4 right-4 md:top-8 md:right-8">
                    <LanguageToggle />
                </div>

                <div className="max-w-md w-full glass-card rounded-2xl p-8 animate-fade-in relative overflow-hidden">

                    {/* Decorative Top Line */}
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"></div>

                    <div className="text-center mb-8">
                        <div className="w-16 h-16 mx-auto bg-white/5 rounded-full flex items-center justify-center mb-4 ring-1 ring-white/10 shadow-lg">
                            <Lock className="w-8 h-8 text-blue-400" />
                        </div>
                        <h1 className="text-2xl font-bold text-white mb-2">{t('enterPassphrase')}</h1>
                        <p className="text-slate-400 text-sm">{t('passphraseDescription')}</p>
                    </div>

                    <form onSubmit={handleUnlock} className="space-y-4">
                        <div className="relative">
                            <input
                                type={showPassphrase ? 'text' : 'password'}
                                value={passphrase}
                                onChange={(e) => {
                                    setPassphrase(e.target.value)
                                    setError(false)
                                }}
                                placeholder={t('passphrasePlaceholder')}
                                className={`w-full px-5 py-3 pr-12 rounded-xl glass-input text-white placeholder-slate-500 focus:outline-none transition-all ${error ? 'border-red-500/50 shadow-[0_0_20px_rgba(239,68,68,0.15)]' : ''
                                    }`}
                                autoFocus
                                disabled={isLoading}
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassphrase(!showPassphrase)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors cursor-pointer"
                                tabIndex={-1}
                            >
                                {showPassphrase ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                            </button>
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className={`w-full py-3 rounded-xl btn-gradient font-bold text-white shadow-lg flex items-center justify-center gap-2 group cursor-pointer ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
                        >
                            {isLoading ? (
                                <>
                                    <Loader2 className="w-5 h-5 animate-spin" />
                                    <span>Verifying...</span>
                                </>
                            ) : (
                                <>
                                    <span>{t('unlock')}</span>
                                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                </>
                            )}
                        </button>

                        {error && (
                            <p className="text-red-400 text-sm text-center animate-pulse-soft">
                                {t('incorrectPassphrase')}
                            </p>
                        )}
                    </form>
                </div>
            </div>
        </>
    )
}
