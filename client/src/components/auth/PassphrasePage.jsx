import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Lock, Unlock, ArrowRight } from 'lucide-react'
import { useLanguage } from '../../context/LanguageContext'
import { LanguageToggle } from '../common/LanguageToggle'

export function PassphrasePage() {
    const { t } = useLanguage()
    const navigate = useNavigate()
    const [passphrase, setPassphrase] = useState('')
    const [error, setError] = useState(false)

    // TODO: move this to env or improved security in real app
    // const CORRECT_PASSPHRASE = import.meta.env.VITE_PASSPHRASE 

    const handleUnlock = async (e) => {
        e.preventDefault()

        try {
            const response = await fetch('http://localhost:3001/api/verify-passphrase', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ passphrase }),
            });

            const data = await response.json();

            if (data.success) {
                navigate('/')
            } else {
                setError(true)
                setTimeout(() => setError(false), 2000)
            }
        } catch (err) {
            console.error('Auth error:', err);
            setError(true)
            setTimeout(() => setError(false), 2000)
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
                                type="password"
                                value={passphrase}
                                onChange={(e) => {
                                    setPassphrase(e.target.value)
                                    setError(false)
                                }}
                                placeholder={t('passphrasePlaceholder')}
                                className={`w-full px-5 py-3 rounded-xl glass-input text-white placeholder-slate-500 focus:outline-none transition-all ${error ? 'border-red-500/50 shadow-[0_0_20px_rgba(239,68,68,0.15)]' : ''
                                    }`}
                                autoFocus
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full py-3 rounded-xl btn-gradient font-bold text-white shadow-lg flex items-center justify-center gap-2 group"
                        >
                            <span>{t('unlock')}</span>
                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
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
