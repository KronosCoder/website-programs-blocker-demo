import { useLanguage } from '../../context/LanguageContext'
import { ThreeDot } from 'react-loading-indicators'

export function LoadingSpinner() {
    const { t } = useLanguage()

    return (
        <div className="min-h-screen flex items-center justify-center">
            <ThreeDot color={["#8854ff", "#ac87ff", "#cfbaff", "#f2edff"]} />
        </div>
    )
}
