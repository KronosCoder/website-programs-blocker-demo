import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useLanguage } from '../../context/LanguageContext'

export function Pagination({ currentPage, totalPages, onPageChange }) {
    const { t } = useLanguage()

    if (totalPages <= 1) return null

    return (
        <div className="flex items-center justify-center gap-4 mt-4 pt-4 border-t border-slate-700">
            <button
                onClick={() => onPageChange(Math.max(currentPage - 1, 1))}
                disabled={currentPage === 1}
                className={`p-2 rounded-lg transition-all ${currentPage === 1
                    ? 'bg-slate-800 text-slate-600 cursor-not-allowed'
                    : 'bg-slate-700 hover:bg-slate-600 text-white cursor-pointer'}`}
            >
                <ChevronLeft className="w-5 h-5" />
            </button>
            <span className="text-[var(--text-secondary)] text-sm">
                {t('page')} {currentPage} {t('of')} {totalPages}
            </span>
            <button
                onClick={() => onPageChange(Math.min(currentPage + 1, totalPages))}
                disabled={currentPage >= totalPages}
                className={`p-2 rounded-lg transition-all ${currentPage >= totalPages
                    ? 'bg-slate-800 text-slate-600 cursor-not-allowed'
                    : 'bg-slate-700 hover:bg-slate-600 text-white cursor-pointer'}`}
            >
                <ChevronRight className="w-5 h-5" />
            </button>
        </div>
    )
}

