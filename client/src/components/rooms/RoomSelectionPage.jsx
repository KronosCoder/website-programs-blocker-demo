import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Building2, DoorOpen, ChevronDown, ChevronUp, LogOut, Github } from 'lucide-react'
import { useLanguage } from '../../context/LanguageContext'
import { LanguageToggle } from '../common/LanguageToggle'
import { removeToken } from '../../utils/api'
import { confirmDialog } from '../../utils/toast'

const BUILDING_NUMBER = 9
const FLOORS = [2, 3, 4]

function generateRoomsForFloor(floor) {
    const rooms = []
    rooms.push({
        id: `${BUILDING_NUMBER}${floor}A`,
        label: `${BUILDING_NUMBER}${floor}A`,
        floor,
        roomNumber: 'A',
    })
    // Rooms 1-9
    for (let room = 1; room <= 9; room++) {
        rooms.push({
            id: `${BUILDING_NUMBER}${floor}${room}`,
            label: `${BUILDING_NUMBER}${floor}${room}`,
            floor,
            roomNumber: room,
        })
    }
    return rooms
}

export function RoomSelectionPage() {
    const { t } = useLanguage()
    const navigate = useNavigate()
    const [expandedFloor, setExpandedFloor] = useState(2) // Default expand floor 2

    const handleRoomSelect = (roomId) => {
        navigate(`/${roomId}`)
    }

    const toggleFloor = (floor) => {
        setExpandedFloor(prev => prev === floor ? null : floor)
    }

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

    return (
        <>
            {/* Background Animations */}
            <div className="app-background">
                <div className="light-orb light-orb-1 animate-glow"></div>
                <div className="light-orb light-orb-2 animate-glow"></div>
                <div className="light-orb light-orb-3 animate-glow"></div>
                <div className="light-orb light-orb-4 animate-glow"></div>
            </div>

            <div className="min-h-screen p-4 md:p-8 flex justify-center items-start relative">

                {/* Language Toggle */}
                {/* Top Right Actions */}
                <div className="absolute top-4 right-4 md:top-8 md:right-8 z-10 flex items-center gap-3">
                    <button
                        onClick={() => window.open('https://github.com/KronosCoder/website-programs-blocker-demo', '_blank')}
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

                <div className="max-w-4xl w-full mx-auto mt-8 md:mt-16">

                    {/* Header */}
                    <header className="text-center mb-10 animate-fade-in">
                        <div className="w-20 h-20 mx-auto bg-white/5 rounded-2xl flex items-center justify-center mb-5 ring-1 ring-white/10 shadow-lg">
                            <Building2 className="w-10 h-10 text-blue-400" />
                        </div>
                        <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
                            {t('selectRoom')}
                        </h1>
                        <p className="text-slate-400 text-sm md:text-base">
                            {t('roomSelectionDescription')}
                        </p>
                        <div className="mt-4 inline-block px-5 py-2 rounded-full glass-button text-sm font-semibold text-blue-300 border border-blue-500/30">
                            {t('building')} {BUILDING_NUMBER}
                        </div>
                    </header>

                    {/* Floor Accordion */}
                    <div className="space-y-3 animate-fade-in">
                        {FLOORS.map((floor, floorIndex) => {
                            const rooms = generateRoomsForFloor(floor)
                            const isExpanded = expandedFloor === floor

                            return (
                                <div
                                    key={floor}
                                    className="glass-card rounded-2xl overflow-hidden"
                                    style={{ animationDelay: `${floorIndex * 0.05}s` }}
                                >
                                    {/* Floor Header (clickable) */}
                                    <button
                                        onClick={() => toggleFloor(floor)}
                                        className="w-full px-6 py-4 flex items-center justify-between cursor-pointer group transition-all hover:bg-white/[0.02]"
                                    >
                                        <div className="flex items-center gap-3">
                                            <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${isExpanded
                                                ? 'bg-blue-500/20 ring-1 ring-blue-500/40'
                                                : 'bg-white/5 ring-1 ring-white/10'
                                                }`}>
                                                <span className={`text-lg font-bold ${isExpanded ? 'text-blue-400' : 'text-slate-400'}`}>
                                                    {floor}
                                                </span>
                                            </div>
                                            <div className="text-left">
                                                <h3 className="text-white font-semibold text-base">
                                                    {t('floor')} {floor}
                                                </h3>
                                                <p className="text-slate-500 text-xs">
                                                    10 {t('rooms')}
                                                </p>
                                            </div>
                                        </div>
                                        <div className={`transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}>
                                            <ChevronDown className="w-5 h-5 text-slate-400" />
                                        </div>
                                    </button>

                                    {/* Room Grid (expandable) */}
                                    <div className={`overflow-hidden transition-all duration-300 ease-in-out ${isExpanded ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
                                        }`}>
                                        <div className="px-6 pb-5 pt-1">
                                            <div className="grid grid-cols-5 sm:grid-cols-5 md:grid-cols-10 gap-2">
                                                {rooms.map((room) => (
                                                    <button
                                                        key={room.id}
                                                        onClick={() => handleRoomSelect(room.id)}
                                                        className="room-card group cursor-pointer"
                                                        title={`${t('room')} ${room.label}`}
                                                    >
                                                        <div className="flex flex-col items-center justify-center py-3 px-2">
                                                            <DoorOpen className="w-5 h-5 text-slate-500 group-hover:text-blue-400 transition-colors mb-1.5" />
                                                            <span className="text-sm font-bold text-white group-hover:text-blue-300 transition-colors">
                                                                {room.label}
                                                            </span>
                                                        </div>
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>

                    {/* Footer hint */}
                    <p className="text-center text-slate-600 text-xs mt-8 mb-4">
                        {t('footerText')}
                    </p>
                </div>
            </div>
        </>
    )
}
