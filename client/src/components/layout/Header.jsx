import { Link, useNavigate } from 'react-router-dom'
import { ArrowLeft, LogOut, Github } from 'lucide-react'
import { LanguageToggle } from '../common/LanguageToggle'
import { useLanguage } from '../../context/LanguageContext'
import { removeToken } from '../../utils/api'
import { confirmDialog } from '../../utils/toast'

export function Header({ roomId }) {
    const { t } = useLanguage()
    const navigate = useNavigate()

    const handleSignOut = async () => {
        const isConfirmed = await confirmDialog({
            title: t('signOutConfirmTitle'),
            text: t('signOutConfirmText'),
            confirmButtonText: t('yesSignOut'),
            icon: 'warning'
        })

        if (isConfirmed) {
            removeToken()
            navigate('/auth')
        }
    }

    const openGithub = () => {
        window.open('https://github.com/KronosCoder', '_blank')
    }

    return (
        <header className="text-center mb-8 animate-fade-in relative">
            {/* Back Button */}
            <Link
                to="/rooms"
                className="absolute top-0 left-0 p-3 rounded-xl glass-button text-slate-400 hover:text-blue-300 hover:bg-white/5 transition-all group"
                title={t('backToRooms')}
            >
                <ArrowLeft className="w-6 h-6 group-hover:-translate-x-1 transition-transform" />
            </Link>

            {/* Top Right Actions */}
            <div className="absolute top-0 right-0 flex items-center gap-3">
                <button
                    onClick={openGithub}
                    className="p-2 rounded-lg glass-button text-slate-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                    title={t('githubRepo')}
                >
                    <Github className="w-5 h-5" />
                </button>
                <button
                    onClick={handleSignOut}
                    className="p-2 rounded-lg glass-button text-slate-400 hover:text-red-400 hover:bg-red-500/10 transition-colors cursor-pointer"
                    title={t('signOut')}
                >
                    <LogOut className="w-5 h-5" />
                </button>
                <LanguageToggle />
            </div>

            <div className="inline-flex items-center gap-3 mb-2">
                <h1 className="text-4xl md:text-5xl font-bold text-white">
                    {t('appTitle')}
                </h1>
            </div>
            <p className="text-slate-400 text-lg">
                {t('appSubtitle')}
            </p>
            <div className="mt-3 inline-block px-4 py-1.5 rounded-full glass-button text-sm font-semibold text-blue-300 border border-blue-500/30">
                {t('currentConfigRoom')} : {roomId}
            </div>
        </header>
    )
}

