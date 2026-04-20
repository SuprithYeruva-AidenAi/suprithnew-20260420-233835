import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { DashboardService, type DashboardModel, type DashboardCard } from '../services/dashboardService'
import { UOITimeoutError, UOIUnavailableError } from '../api/uoi'

const LOGO = 'https://s3-alpha-sig.figma.com/img/26ec/3ab4/0588c7482da725dcdeb68b2897f9bde2?Expires=1777852800&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=ShoM0pDLFtIglvPWeRLcrNHkP-8DajZ~UfTydATZnIyvxRx0Q8vNaKu-xBitsol0veqqwq1r4p1azXwhatXwj7sKArxvuNthVWmFirx22koohe8997mFNM6GF2P9FJZQ6hnguVRCcCTWizRFgiWWnqabTviIJl1EuaMxA65dwinn4u47OVQuKOW4HPfBJ49i-x-lqHrsAbGLy9XfBAQqpYzMCSsmnWFH-jgrpSRysU3HqoilRLqyQb6LtiIX7mix4qKeTiJI50ywXWQYf5zHXGyqc7Ry5JQaJUdS88v~1e1Kd-i6t7RipipnfhyJG71UbhW-m-9vh~8Pv9t2nKWPxg__'
const BANNER = 'https://s3-alpha-sig.figma.com/img/b174/518e/b937b0d57f4c2d0945d9af6744ea37cb?Expires=1777852800&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=IgUA6SYvFf2bjGgsXM9J5LdtV64i7P4flXUmwMMHKPU2p-1U2k5xNVoMDLJGb36~0R9fhLA3-R4J8Oa6ZcLqag1QpNk-HKKxxuU-CGLDPXJ2bCTGjAYI75AgmPGXwCbFnru0pQrP17-RGZWVmZztqjrrj0iyzMaGAQi~e3rOYgP~wEvKIk~GREpl6aAlwcSxDSPWAwZ2HudtFnl80kbsFHUXAwYD7eLzdB1NQekU82kBZTpg1MxSE~pEY11CYUeEZ84SO-hyRPP68HVlYDyWBWmAFvksSIFj7q4WsTeptzmtxQeWEv2o2YTErSwcjm4BaJC1BmcmX7hfIVbtkZtFbw__'
const REWARD1_IMG = 'https://s3-alpha-sig.figma.com/img/3ccc/e6dc/76312628f87fe4b2face85c5785f97c9?Expires=1777852800&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=GhaZPejTzke73Bac0TcIa9Ka8QfE1svJkJKAmX9vBmxuxClyX5GI605d2rWLR02X70oJAWg~aalQBukfGG7TAupVf84tGtC8uA3mFFdtu~CpDDoZ5Mds6AJuHjxSvF-aAU2s7q9cTSrC7J-hZ9Lud0ik~M9Kpl7AGE1nll7LSB0tXKhuyDrgHoQ0POfuhs766Iv7Bf6dFmdIQXNB0fDua5xyOuI7jUYQu3LyrFBt8--0QBFEi9TMQpLiszMlxmo2MYx7TnEVa7aAalfEuO81Uc9UoOQDZuS3jxs1umlWslzCFI32G7Z5NDCj5UhTMnQSRhIxjPOtQ9S6PftVMJW03g__'
const REWARD1_LOGO = 'https://s3-alpha-sig.figma.com/img/86bf/5a50/b8f3a3749921a7a5868d0591a840460d?Expires=1777852800&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=roDYZCuP6L95dqOCJWUcchZ3j2HP8gd~x9MbTBJCHBULbSAd3GRACaGNZVY5f2SBbAQ5~gPFsFBMqRfz~Wmpxl7Zza0ZpLgIX5D-zdEe1BVX7EPzQXCMs26Afyrz1A-k0-TDwjDGZZsfftsUINAIE~iOkoXjGMtgScU6xOOTHNW~JL6Ip4AgOGfElYKGOeHY--5sMXi6qw~KPrMS8JG~FYUqwiIZlSpEeul~A~FGVIiHHqBOi~ZO-i0OUtklAkZsjLb3iBV~NtHCeWGa6G4zy2x6cPzDyTRqHozLZSh05vQYxseV-o361MFESUfScUeQMPNGr5tIyjDkLY-BvqOaSA__'
const REWARD2_IMG = 'https://s3-alpha-sig.figma.com/img/85ca/0b3b/5576e86be97d861823edf673af1c11f8?Expires=1777852800&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=a6Q-4PS8zNmSpAlOSoIJckd-Mt0qPamBFfQwVawVB17k1R2k9ZcuGq~PaW-ZT2ay39Qh8WjdKmxuuBYNPbv5lOgShBkXaAcv3ruXC9eMwKH9PX9v3fCc5~zoDXLOYJqxtDA5bhwtsvSPYkBzux3Zfy~SMuQp2xHuTup6mt6YBAU1v0fsvO~oTQz0m4ZSCJauehADpfMW1t~SGV9iRdMU9FyYMBzG6FSD0sQwyGelAAtRYF036ATKHMGRAGK-pCF1cZ51tzAsQ8QNn6bRnPHXXqc1inCVU4sS6iajgHw0dF1~ZtExq32bAJ-BvfBu3EMwZhHmbuih0NRGLGfmCXciyw__'
const REWARD2_LOGO = 'https://s3-alpha-sig.figma.com/img/0a97/bee0/ba771711c17f9b573620e9c39ee75371?Expires=1777852800&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=AaIqBKwZJBxD-AYIr1D7d-Z-tU9A4QIBUyszzsTsVZizP~YcsLXaaYNg7RPa9KLFNbjlb6o1dlvRj4xnQvG8VIKpThOeQx1BpwcAA6dnnXi0Fy82kW4OkQPf4vdo8UU01vpg50tFd85zpcPGfYitrrXI7qRctA0f0cGceOhaYnBVVrLP2ALIEMUQ8otnv7v6hkXG7O~wtmP982yugkwlmjf0eSf155azufB4AmbUPrl8q1Jd6XRkHBCXFNmg03L7jtWSwFvpFl4gk2rNCoyQHU50~aWwtJmn0WqoGC-SyEjL6AMcU6FbN-OGFnwCFjfeKR76n2hGjcKMRC2-r0phng__'
const REWARD3_IMG = 'https://s3-alpha-sig.figma.com/img/8287/f018/93dadb02e8922d16e90a39a645f04366?Expires=1777852800&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=FvBJcOyMPYJHiTC4X9l8Vkx13O3GdrJe7wpaabFamd~EcJzIoVR3jvqG2QnO98WXacHJpRnCEAR9wgS5aRkeBPplVEFH9F6t2AS56pHoZxV498Os0MDS0UrLQaG-4rGLR7p2LOOQ4EEXMvv09A6st8XqSQMUGZSuV1J8vH27mPhK6-udbegy~TWKGmOZ7VDiVZgGVt9isDg7u5LTihrUGxbcKtABoSkFE0CaO36TjvHaRRwbgMesxCzovYOA~~utbTHg1RZiBZqTUFxDDUgxybvkMNkYLCoH9~uQGrAS~8fPPx-ljm8iDmFwEdLR-L0rzG-u-lR9g0HBGraZdeAajA__'
const REWARD3_LOGO = 'https://s3-alpha-sig.figma.com/img/3aa6/8189/82dafd597dffb5e00a3a6d89d162beec?Expires=1777852800&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=TOw1O9cQBy-MGUjIPJVPwkDsmgJIL4PN5crLB9WM5I73zJiYN1UpUItZE1A6iz9GEBi-E6tJjUDsrH4nAjaRlDbhKLQ7lENfpvExbfAW6nlRTMUyJscu5BqxVgmO1bSq1xhwnJqwxKZSWwKspmbPRjudGhOnEL3qq4YTvu9CygBP~P8nUDXRTFj2a0LBGNoig~VmfFFxZzTVpkgAP0SqKBi4cI-fKJQOspOmYGSqozxVqXI66MvEFy4~dbIoCUOV68OvGqYh4yoploGPlWvii7by00kY6JHa3c~PaAWEMihmm2S9InzyDdfq7y0~-zJqdGjbe-qW-Iq6-kRMEg__'

// ── Inline SVG icon replacements (no lucide-react dependency) ────────────
function HomeIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  )
}
function ShieldIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  )
}
function FileIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z" />
      <polyline points="13 2 13 9 20 9" />
    </svg>
  )
}
function SettingsIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
    </svg>
  )
}
function PanelLeftIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
      <line x1="9" y1="3" x2="9" y2="21" />
    </svg>
  )
}
function HelpCircleIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <circle cx="12" cy="12" r="10" />
      <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
      <line x1="12" y1="17" x2="12.01" y2="17" />
    </svg>
  )
}
function BellIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
      <path d="M13.73 21a2 2 0 0 1-3.46 0" />
    </svg>
  )
}
function UserIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  )
}
function ChevronRightIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <polyline points="9 18 15 12 9 6" />
    </svg>
  )
}
function ArrowRightIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="12 5 19 12 12 19" />
    </svg>
  )
}
function CarIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <rect x="1" y="3" width="15" height="13" />
      <polygon points="16 8 20 8 23 11 23 16 16 16 16 8" />
      <circle cx="5.5" cy="18.5" r="2.5" />
      <circle cx="18.5" cy="18.5" r="2.5" />
    </svg>
  )
}
function ShieldCheckIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <polyline points="9 12 11 14 15 10" />
    </svg>
  )
}

function errorMsg(e: unknown): string {
  if (e instanceof UOITimeoutError) return 'The service timed out. Please try again.'
  if (e instanceof UOIUnavailableError) return 'The service is temporarily unavailable. Please try again shortly.'
  return 'Something went wrong. Please try again.'
}

function SkeletonCard() {
  return (
    <div className="flex flex-col rounded-[8px] overflow-hidden shadow-[0px_1px_4px_0px_rgba(0,0,0,0.05)] bg-white">
      <div className="px-[16px] py-[16px] border-b border-[#000000] flex flex-row items-center gap-[8px]">
        <div className="w-[24px] h-[24px] rounded-[4px] bg-[#e0e0e0] animate-pulse" />
        <div className="w-[80px] h-[16px] rounded-[4px] bg-[#e0e0e0] animate-pulse" />
        <div className="ml-auto w-[70px] h-[20px] rounded-[12px] bg-[#e0e0e0] animate-pulse" />
      </div>
      <div className="px-[16px] py-[16px] flex flex-col gap-[12px]">
        <div className="w-full h-[14px] rounded-[4px] bg-[#e0e0e0] animate-pulse" />
        <div className="w-[70%] h-[14px] rounded-[4px] bg-[#e0e0e0] animate-pulse" />
        <div className="w-[50%] h-[14px] rounded-[4px] bg-[#e0e0e0] animate-pulse" />
      </div>
    </div>
  )
}

interface CoverageCardProps {
  title: string
  icon: React.ReactNode
  covered: boolean
  loading: boolean
  error: string | null
  onRetry: () => void
  children: React.ReactNode
}

function CoverageCard({ title, icon, covered, loading, error, onRetry, children }: CoverageCardProps) {
  if (loading) return <SkeletonCard />
  return (
    <div className="flex flex-col rounded-[8px] overflow-hidden shadow-[0px_1px_4px_0px_rgba(0,0,0,0.05)]">
      <div className="flex flex-row items-center gap-[8px] px-[16px] py-[16px] bg-white rounded-tl-[8px] rounded-tr-[8px] border-b border-[#000000]">
        <div className="flex flex-row items-center gap-[8px] flex-1">
          {icon}
          <span className="text-[16px] font-medium leading-[24px] text-[#212121]" style={{ fontFamily: 'Noto Sans, sans-serif' }}>{title}</span>
        </div>
        {covered ? (
          <div className="flex flex-row items-center gap-[4px] px-[8px] py-[4px] bg-[#005eb8] rounded-[24px]">
            <ShieldCheckIcon className="w-[14px] h-[14px] text-white" />
            <span className="text-[12px] font-medium leading-[16.8px] text-white" style={{ fontFamily: 'Noto Sans, sans-serif' }}>COVERED</span>
          </div>
        ) : (
          <div className="flex flex-row items-center gap-[4px] px-[8px] py-[4px] bg-[#f5f5f5] rounded-[24px]">
            <span className="text-[12px] font-medium leading-[16.8px] text-[#8d8d8d]" style={{ fontFamily: 'Noto Sans, sans-serif' }}>NOT COVERED</span>
          </div>
        )}
      </div>
      <div className="flex flex-col gap-[16px] px-[16px] py-[16px] bg-white rounded-bl-[8px] rounded-br-[8px] flex-1">
        {error ? (
          <div className="flex flex-col gap-[8px]">
            <p className="text-[14px] text-[#dc3545]" style={{ fontFamily: 'Noto Sans, sans-serif' }}>{error}</p>
            <button
              onClick={onRetry}
              className="self-start px-[12px] py-[6px] bg-[#005eb8] rounded-[6px] text-white text-[13px] cursor-pointer hover:opacity-90"
              style={{ fontFamily: 'Noto Sans, sans-serif' }}
            >Retry</button>
          </div>
        ) : children}
      </div>
    </div>
  )
}

export default function DashboardHome() {
  const navigate = useNavigate()
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [model, setModel] = useState<DashboardModel | null>(null)
  const [globalLoading, setGlobalLoading] = useState(true)
  const [globalError, setGlobalError] = useState<string | null>(null)
  const [cardErrors, setCardErrors] = useState<Record<string, string | null>>({})
  const [cardLoading, setCardLoading] = useState<Record<string, boolean>>({})
  const [showUserMenu, setShowUserMenu] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  const loadSummary = (refresh = false) => {
    setGlobalLoading(true)
    setGlobalError(null)
    const ctrl = new AbortController()
    const fn = refresh
      ? DashboardService.refreshSummary(ctrl.signal)
      : DashboardService.getSummary(ctrl.signal)
    fn
      .then(m => { setModel(m); setGlobalLoading(false) })
      .catch(e => {
        if (e?.name === 'AbortError') return
        setGlobalError(errorMsg(e))
        setGlobalLoading(false)
      })
    return ctrl
  }

  useEffect(() => {
    const ctrl = loadSummary(false)
    return () => ctrl.abort()
  }, [])

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setShowUserMenu(false)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  const retryCard = (productCode: string) => {
    setCardErrors(prev => ({ ...prev, [productCode]: null }))
    setCardLoading(prev => ({ ...prev, [productCode]: true }))
    DashboardService.listByProduct(productCode)
      .then(() => setCardLoading(prev => ({ ...prev, [productCode]: false })))
      .catch(e => {
        setCardErrors(prev => ({ ...prev, [productCode]: errorMsg(e) }))
        setCardLoading(prev => ({ ...prev, [productCode]: false }))
      })
  }

  const handleLogout = () => {
    DashboardService.invalidate()
    setShowUserMenu(false)
    navigate('/login')
  }

  const getCard = (code: string): DashboardCard | undefined =>
    model?.cards.find(c => c.productCode === code)

  const isCardLoading = (code: string) => globalLoading || !!cardLoading[code]
  const getCardError = (code: string) => cardErrors[code] ?? (getCard(code)?.errorMessage ?? null)

  const travelCard = getCard('TR01')
  const homeCard = getCard('HM01')
  const motorCard = getCard('MO01')
  const helperCard = getCard('DH01')

  const greeting = model?.greeting ?? 'Good evening'

  return (
    <div className="h-screen w-full flex flex-col overflow-hidden font-[Noto_Sans]">
      <div className="flex flex-row flex-1 overflow-hidden">
        {/* Sidebar */}
        <aside
          className={`h-full shrink-0 flex flex-col bg-white border-r border-[#000000] shadow-[0px_1px_4px_0px_rgba(0,0,0,0.05)] transition-all duration-300 overflow-y-auto ${
            sidebarOpen ? 'w-[240px]' : 'w-[64px]'
          }`}
        >
          <div className="flex flex-col gap-[24px] p-[16px] flex-1">
            <div className="flex flex-col gap-[10px]">
              {sidebarOpen && (
                <img src={LOGO} alt="UOI Logo" className="w-[100px] h-[51px] object-contain" />
              )}
            </div>
            <nav className="flex flex-col gap-[12px]">
              <div
                className="flex flex-row items-center gap-[12px] px-[12px] py-[10px] rounded-[8px] cursor-pointer"
                style={{ background: 'linear-gradient(to right, rgba(0,94,184,0.10) 1%, rgba(92,85,235,0.10) 100%)' }}
                onClick={() => navigate('/dashboard')}
              >
                <HomeIcon className="w-[24px] h-[24px] text-[#005eb8] shrink-0" />
                {sidebarOpen && <span className="text-[16px] font-medium leading-[24px] text-[#005eb8]" style={{ fontFamily: 'Noto Sans, sans-serif' }}>Dashboard</span>}
              </div>
              <div
                className="flex flex-row items-center gap-[12px] px-[12px] py-[10px] rounded-[8px] cursor-pointer hover:bg-[#f5f5f5]"
                onClick={() => navigate('/dashboard')}
              >
                <ShieldIcon className="w-[24px] h-[24px] text-[#212121] shrink-0" />
                {sidebarOpen && <span className="text-[16px] leading-[24px] text-[#212121]" style={{ fontFamily: 'Noto Sans, sans-serif' }}>Policies</span>}
              </div>
              <div
                className="flex flex-row items-center gap-[12px] px-[12px] py-[10px] rounded-[8px] cursor-pointer hover:bg-[#f5f5f5]"
                onClick={() => navigate('/dashboard')}
              >
                <FileIcon className="w-[24px] h-[24px] text-[#212121] shrink-0" />
                {sidebarOpen && <span className="text-[16px] leading-[24px] text-[#212121]" style={{ fontFamily: 'Noto Sans, sans-serif' }}>Claims</span>}
              </div>
              <div
                className="flex flex-row items-center gap-[12px] px-[12px] py-[10px] rounded-[8px] cursor-pointer hover:bg-[#f5f5f5]"
                onClick={() => navigate('/dashboard')}
              >
                <SettingsIcon className="w-[24px] h-[24px] text-[#212121] shrink-0" />
                {sidebarOpen && <span className="text-[16px] leading-[24px] text-[#212121]" style={{ fontFamily: 'Noto Sans, sans-serif' }}>Rewards</span>}
              </div>
            </nav>
          </div>
          <div className="flex flex-row justify-end items-center gap-[12px] px-[16px] py-[16px]">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="cursor-pointer bg-transparent border-none p-0 flex items-center justify-center"
            >
              <PanelLeftIcon className="w-[24px] h-[24px] text-[#212121]" />
            </button>
          </div>
        </aside>

        {/* Right column */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Header */}
          <header className="w-full flex flex-row items-center px-[24px] py-[12px] bg-white border-b border-[#000000] shrink-0" style={{ minHeight: '56px' }}>
            <div className="flex flex-row items-center gap-[20px] flex-1 justify-end">
              <button onClick={() => navigate('/dashboard')} className="cursor-pointer bg-transparent border-none p-0">
                <HelpCircleIcon className="w-[24px] h-[24px] text-[#212121]" />
              </button>
              <button onClick={() => navigate('/dashboard')} className="cursor-pointer bg-transparent border-none p-0">
                <BellIcon className="w-[24px] h-[24px] text-[#212121]" />
              </button>
              <div className="w-px h-[32px] bg-[#000000]" style={{ opacity: 0.09 }} />
              <div className="relative" ref={menuRef}>
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="flex flex-row items-center gap-[6px] cursor-pointer bg-transparent border-none p-0"
                >
                  <div className="w-[32px] h-[32px] rounded-full bg-[#b3d1ff] flex items-center justify-center">
                    <UserIcon className="w-[18px] h-[18px] text-[#005eb8]" />
                  </div>
                  <span className="text-[14px] font-medium text-[#212121]" style={{ fontFamily: 'Noto Sans, sans-serif' }}>CW</span>
                </button>
                {showUserMenu && (
                  <div className="absolute right-0 top-[40px] z-50 bg-white rounded-[8px] shadow-[0px_4px_16px_0px_rgba(0,0,0,0.12)] flex flex-col py-[8px] min-w-[160px]">
                    <button
                      onClick={() => { setShowUserMenu(false); navigate('/dashboard') }}
                      className="px-[16px] py-[10px] text-left text-[14px] text-[#212121] hover:bg-[#f5f5f5] cursor-pointer"
                      style={{ fontFamily: 'Noto Sans, sans-serif' }}
                    >Profile</button>
                    <button
                      onClick={handleLogout}
                      className="px-[16px] py-[10px] text-left text-[14px] text-[#dc3545] hover:bg-[#f5f5f5] cursor-pointer"
                      style={{ fontFamily: 'Noto Sans, sans-serif' }}
                    >Logout</button>
                  </div>
                )}
              </div>
            </div>
          </header>

          {/* Scrollable main */}
          <main
            className="flex-1 overflow-y-auto"
            style={{ background: 'linear-gradient(to bottom, rgba(0,94,184,0.07) 0%, rgba(92,85,235,0.07) 73%), #ffffff' }}
          >
            <div className="flex flex-col items-center px-[32px] pt-[48px] pb-[100px] gap-[28px]">
              <div className="flex flex-col gap-[32px] w-full max-w-[980px]">

                {/* Greeting + Banner */}
                <div className="flex flex-col gap-[24px]">
                  <div className="flex flex-col gap-[12px]">
                    <p className="text-[32px] font-bold leading-[38.4px] text-[#212121]" style={{ fontFamily: 'Noto Sans, sans-serif' }}>
                      {greeting}, Chris 👋
                    </p>
                    <p className="text-[16px] leading-[24px] text-[#6e6e6e]" style={{ fontFamily: 'Noto Sans, sans-serif' }}>
                      Here&#39;s an overview of your insurance policies and recent activities
                    </p>
                  </div>
                  <div className="w-full rounded-[8px] overflow-hidden shadow-[0px_1px_4px_0px_rgba(0,0,0,0.05)]" style={{ height: '270px' }}>
                    <img src={BANNER} alt="20% off motor insurance" className="w-full h-full object-cover" />
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="flex flex-col gap-[20px]">
                  <span className="text-[20px] font-bold leading-[24px] text-[#212121]" style={{ fontFamily: 'Noto Sans, sans-serif' }}>Quick Actions</span>
                  <div className="flex flex-row gap-[20px]">
                    <div className="flex-1 flex flex-col gap-[24px] p-[16px] bg-white rounded-[8px] shadow-[0px_1px_4px_0px_rgba(0,0,0,0.05)] cursor-pointer hover:opacity-90" onClick={() => navigate('/dashboard')}>
                      <div className="flex flex-row gap-[12px]">
                        <ChevronRightIcon className="w-[24px] h-[24px] text-[#212121] shrink-0" />
                        <div className="flex flex-col gap-[4px] flex-1">
                          <span className="text-[16px] font-medium leading-[24px] text-[#212121]" style={{ fontFamily: 'Noto Sans, sans-serif' }}>Submit Claim</span>
                          <span className="text-[14px] leading-[21px] text-[#6e6e6e]" style={{ fontFamily: 'Noto Sans, sans-serif' }}>Prepare documents for claims</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex-1 flex flex-col gap-[24px] p-[16px] bg-white rounded-[8px] shadow-[0px_1px_4px_0px_rgba(0,0,0,0.05)] cursor-pointer hover:opacity-90" onClick={() => navigate('/dashboard')}>
                      <div className="flex flex-row gap-[12px]">
                        <div className="w-[24px] h-[24px] rounded-full flex items-center justify-center shrink-0" style={{ background: 'linear-gradient(to right, rgba(0,94,184,0.10) 1%, rgba(92,85,235,0.10) 100%)' }} />
                        <div className="flex flex-col gap-[4px] flex-1">
                          <span className="text-[16px] font-medium leading-[24px] text-[#212121]" style={{ fontFamily: 'Noto Sans, sans-serif' }}>Buy New Policy</span>
                          <span className="text-[14px] leading-[21px] text-[#6e6e6e]" style={{ fontFamily: 'Noto Sans, sans-serif' }}>Explore a wide range of policies</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex-1 flex flex-col gap-[24px] p-[16px] bg-white rounded-[8px] shadow-[0px_1px_4px_0px_rgba(0,0,0,0.05)] cursor-pointer hover:opacity-90" onClick={() => navigate('/dashboard')}>
                      <div className="flex flex-row gap-[12px]">
                        <div className="w-[24px] h-[24px] rounded-full flex items-center justify-center shrink-0" style={{ background: 'linear-gradient(to right, rgba(0,94,184,0.10) 1%, rgba(92,85,235,0.10) 100%)' }} />
                        <div className="flex flex-col gap-[4px] flex-1">
                          <span className="text-[16px] font-medium leading-[24px] text-[#212121]" style={{ fontFamily: 'Noto Sans, sans-serif' }}>Help &amp; Support</span>
                          <span className="text-[14px] leading-[21px] text-[#6e6e6e]" style={{ fontFamily: 'Noto Sans, sans-serif' }}>Learn more about our FAQs</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Your Coverage */}
                <div className="flex flex-col gap-[20px]">
                  <div className="flex flex-row items-center gap-[28px]">
                    <div className="flex flex-row items-center gap-[8px] flex-1">
                      <span className="text-[20px] font-bold leading-[24px] text-[#212121]" style={{ fontFamily: 'Noto Sans, sans-serif' }}>Your Coverage</span>
                      <span className="text-[20px] leading-[24px] text-[#6e6e6e]" style={{ fontFamily: 'Noto Sans, sans-serif' }}>(5)</span>
                    </div>
                    <button className="flex flex-row items-center gap-[4px] cursor-pointer bg-transparent border-none p-0" onClick={() => navigate('/dashboard')}>
                      <span className="text-[14px] text-[#0d6efd]" style={{ fontFamily: 'Noto Sans, sans-serif' }}>View All</span>
                      <ArrowRightIcon className="w-[16px] h-[16px] text-[#0d6efd]" />
                    </button>
                  </div>

                  {globalError && !globalLoading && (
                    <div className="flex flex-col gap-[8px] p-[16px] bg-white rounded-[8px] shadow-[0px_1px_4px_0px_rgba(0,0,0,0.05)]">
                      <p className="text-[14px] text-[#dc3545]" style={{ fontFamily: 'Noto Sans, sans-serif' }}>{globalError}</p>
                      <button onClick={() => loadSummary(true)} className="self-start px-[12px] py-[6px] bg-[#005eb8] rounded-[6px] text-white text-[13px] cursor-pointer hover:opacity-90" style={{ fontFamily: 'Noto Sans, sans-serif' }}>Retry</button>
                    </div>
                  )}

                  {/* Row 1: Travel + Home */}
                  <div className="grid grid-cols-2 gap-[20px]">
                    <CoverageCard
                      title="Travel"
                      icon={<ShieldCheckIcon className="w-[24px] h-[24px] text-[#212121]" />}
                      covered={travelCard?.hasCoverage ?? false}
                      loading={isCardLoading('TR01')}
                      error={getCardError('TR01')}
                      onRetry={() => retryCard('TR01')}
                    >
                      <div className="flex flex-col gap-[16px]">
                        <div className="flex flex-row items-center gap-[8px] px-[12px] py-[8px] rounded-[8px] border border-[#e0e0e0]" style={{ background: 'linear-gradient(to bottom, rgba(0,94,184,0.07) 0%, rgba(92,85,235,0.07) 73%), #ffffff' }}>
                          <div className="flex-1">
                            <span className="text-[14px] font-medium leading-[21px]" style={{ fontFamily: 'Noto Sans, sans-serif', background: 'linear-gradient(to right, #005eb8 1%, #5c55eb 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>New trip? Get covered in 2 minutes.</span>
                          </div>
                          <button className="px-[16px] py-[8px] bg-[#005eb8] rounded-[8px] text-white text-[14px] font-medium cursor-pointer hover:opacity-90 shadow-[0px_1px_4px_0px_rgba(0,0,0,0.05)] shrink-0" style={{ fontFamily: 'Noto Sans, sans-serif' }} onClick={() => navigate('/dashboard')}>Buy Now</button>
                        </div>
                        {travelCard && travelCard.recentItems.length > 0 ? (
                          travelCard.recentItems.map((item, i) => (
                            <div key={item.id || i} className="flex flex-row items-center gap-[4px] px-[12px] py-[12px] bg-[#f9f9f9] rounded-[12px] cursor-pointer hover:opacity-90" onClick={() => navigate('/dashboard')}>
                              <div className="flex flex-col gap-[4px] flex-1">
                                <div className="flex flex-row items-center gap-[8px]">
                                  <span className="text-[14px] font-medium leading-[21px] text-[#212121]" style={{ fontFamily: 'Noto Sans, sans-serif' }}>{item.title}</span>
                                  {item.status && <span className={`text-[12px] font-medium px-[6px] py-[2px] rounded-[4px] ${item.status === 'In Force' ? 'text-[#22c55e] bg-[#f0fdf4]' : item.status === 'Expired' ? 'text-[#dc3545] bg-[#fff5f5]' : 'text-[#6e6e6e] bg-[#f5f5f5]'}`} style={{ fontFamily: 'Noto Sans, sans-serif' }}>{item.status}</span>}
                                </div>
                                <span className="text-[14px] leading-[21px] text-[#6e6e6e]" style={{ fontFamily: 'Noto Sans, sans-serif' }}>Policy No: {item.id || 'PNF320104124A23'}</span>
                              </div>
                              <ChevronRightIcon className="w-[16px] h-[16px] text-[#212121]" />
                            </div>
                          ))
                        ) : (
                          <>
                            <div className="flex flex-row items-center gap-[4px] px-[12px] py-[12px] bg-[#f9f9f9] rounded-[12px] cursor-pointer" onClick={() => navigate('/dashboard')}>
                              <div className="flex flex-col gap-[4px] flex-1">
                                <div className="flex flex-row items-center gap-[8px]">
                                  <span className="text-[14px] font-medium leading-[21px] text-[#212121]" style={{ fontFamily: 'Noto Sans, sans-serif' }}>InsureTravel (Annual Trip)</span>
                                  <span className="text-[12px] font-medium px-[6px] py-[2px] rounded-[4px] text-[#22c55e] bg-[#f0fdf4]" style={{ fontFamily: 'Noto Sans, sans-serif' }}>In Force</span>
                                </div>
                                <span className="text-[14px] leading-[21px] text-[#6e6e6e]" style={{ fontFamily: 'Noto Sans, sans-serif' }}>Policy No: PNF320104124A23</span>
                              </div>
                              <ChevronRightIcon className="w-[16px] h-[16px] text-[#212121]" />
                            </div>
                            <div className="flex flex-row items-center gap-[4px] px-[12px] py-[12px] bg-[#f9f9f9] rounded-[12px] cursor-pointer" onClick={() => navigate('/dashboard')}>
                              <div className="flex flex-col gap-[4px] flex-1">
                                <div className="flex flex-row items-center gap-[8px]">
                                  <span className="text-[14px] font-medium leading-[21px] text-[#212121]" style={{ fontFamily: 'Noto Sans, sans-serif' }}>UniTravel (Single Trip)</span>
                                  <span className="text-[12px] font-medium px-[6px] py-[2px] rounded-[4px] text-[#dc3545] bg-[#fff5f5]" style={{ fontFamily: 'Noto Sans, sans-serif' }}>Expired</span>
                                </div>
                                <span className="text-[14px] leading-[21px] text-[#6e6e6e]" style={{ fontFamily: 'Noto Sans, sans-serif' }}>Policy No: PNF320104124A23</span>
                              </div>
                              <ChevronRightIcon className="w-[16px] h-[16px] text-[#212121]" />
                            </div>
                          </>
                        )}
                      </div>
                    </CoverageCard>

                    <CoverageCard
                      title="Home"
                      icon={<HomeIcon className="w-[24px] h-[24px] text-[#212121]" />}
                      covered={homeCard?.hasCoverage ?? true}
                      loading={isCardLoading('HM01')}
                      error={getCardError('HM01')}
                      onRetry={() => retryCard('HM01')}
                    >
                      <div className="flex flex-col gap-[12px]">
                        {homeCard && homeCard.recentItems.length > 0 ? (
                          homeCard.recentItems.map((item, i) => (
                            <div key={item.id || i} className="flex flex-row items-center gap-[4px] px-[12px] py-[12px] bg-[#f9f9f9] rounded-[12px] cursor-pointer hover:opacity-90" onClick={() => navigate('/dashboard')}>
                              <div className="flex flex-col gap-[4px] flex-1">
                                <div className="flex flex-row items-center gap-[8px]">
                                  <span className="text-[14px] font-medium leading-[21px] text-[#212121]" style={{ fontFamily: 'Noto Sans, sans-serif' }}>{item.title}</span>
                                  {item.status && <span className={`text-[12px] font-medium px-[6px] py-[2px] rounded-[4px] ${item.status === 'In Force' ? 'text-[#22c55e] bg-[#f0fdf4]' : item.status === 'Expired' ? 'text-[#dc3545] bg-[#fff5f5]' : 'text-[#6e6e6e] bg-[#f5f5f5]'}`} style={{ fontFamily: 'Noto Sans, sans-serif' }}>{item.status}</span>}
                                </div>
                                <span className="text-[14px] leading-[21px] text-[#6e6e6e]" style={{ fontFamily: 'Noto Sans, sans-serif' }}>Policy No: {item.id || 'PNF320104124A23'}</span>
                              </div>
                              <ChevronRightIcon className="w-[16px] h-[16px] text-[#212121]" />
                            </div>
                          ))
                        ) : (
                          <div className="flex flex-row items-center gap-[4px] px-[12px] py-[12px] bg-[#f9f9f9] rounded-[12px] cursor-pointer" onClick={() => navigate('/dashboard')}>
                            <div className="flex flex-col gap-[4px] flex-1">
                              <div className="flex flex-row items-center gap-[8px]">
                                <span className="text-[14px] font-medium leading-[21px] text-[#212121]" style={{ fontFamily: 'Noto Sans, sans-serif' }}>UniHome</span>
                                <span className="text-[12px] font-medium px-[6px] py-[2px] rounded-[4px] text-[#f59e0b] bg-[#fffbeb]" style={{ fontFamily: 'Noto Sans, sans-serif' }}>Renewal Due</span>
                              </div>
                              <span className="text-[14px] leading-[21px] text-[#6e6e6e]" style={{ fontFamily: 'Noto Sans, sans-serif' }}>Policy No: PNF320104124A23</span>
                            </div>
                            <ChevronRightIcon className="w-[16px] h-[16px] text-[#212121]" />
                          </div>
                        )}
                      </div>
                    </CoverageCard>
                  </div>

                  {/* Row 2: Motor + Helper */}
                  <div className="grid grid-cols-2 gap-[20px]">
                    <CoverageCard
                      title="Motor"
                      icon={<CarIcon className="w-[24px] h-[24px] text-[#212121]" />}
                      covered={motorCard?.hasCoverage ?? false}
                      loading={isCardLoading('MO01')}
                      error={getCardError('MO01')}
                      onRetry={() => retryCard('MO01')}
                    >
                      <p className="text-[16px] leading-[24px] text-[#212121]" style={{ fontFamily: 'Noto Sans, sans-serif' }}>
                        Protect your car from $X/year with your pre-filled details. Get quote{' '}
                        <span className="text-[#005eb8] underline cursor-pointer" onClick={() => navigate('/dashboard')}>here</span>.
                      </p>
                    </CoverageCard>

                    <CoverageCard
                      title="Helper"
                      icon={<UserIcon className="w-[24px] h-[24px] text-[#212121]" />}
                      covered={helperCard?.hasCoverage ?? true}
                      loading={isCardLoading('DH01')}
                      error={getCardError('DH01')}
                      onRetry={() => retryCard('DH01')}
                    >
                      <div className="flex flex-col gap-[12px]">
                        {helperCard && helperCard.recentItems.length > 0 ? (
                          helperCard.recentItems.map((item, i) => (
                            <div key={item.id || i} className="flex flex-row items-center gap-[4px] px-[12px] py-[12px] bg-[#f9f9f9] rounded-[12px] cursor-pointer hover:opacity-90" onClick={() => navigate('/dashboard')}>
                              <div className="flex flex-col gap-[4px] flex-1">
                                <div className="flex flex-row items-center gap-[8px]">
                                  <span className="text-[14px] font-medium leading-[21px] text-[#212121]" style={{ fontFamily: 'Noto Sans, sans-serif' }}>{item.title}</span>
                                  {item.status && <span className={`text-[12px] font-medium px-[6px] py-[2px] rounded-[4px] ${item.status === 'In Force' ? 'text-[#22c55e] bg-[#f0fdf4]' : item.status === 'Expired' ? 'text-[#dc3545] bg-[#fff5f5]' : 'text-[#6e6e6e] bg-[#f5f5f5]'}`} style={{ fontFamily: 'Noto Sans, sans-serif' }}>{item.status}</span>}
                                </div>
                                <span className="text-[14px] leading-[21px] text-[#6e6e6e]" style={{ fontFamily: 'Noto Sans, sans-serif' }}>Policy No: {item.id || 'PNF320104124A23'}</span>
                              </div>
                              <ChevronRightIcon className="w-[16px] h-[16px] text-[#212121]" />
                            </div>
                          ))
                        ) : (
                          <div className="flex flex-row items-center gap-[4px] px-[12px] py-[12px] bg-[#f9f9f9] rounded-[12px] cursor-pointer" onClick={() => navigate('/dashboard')}>
                            <div className="flex flex-col gap-[4px] flex-1">
                              <div className="flex flex-row items-center gap-[8px]">
                                <span className="text-[14px] font-medium leading-[21px] text-[#212121]" style={{ fontFamily: 'Noto Sans, sans-serif' }}>UniHelper</span>
                                <span className="text-[12px] font-medium px-[6px] py-[2px] rounded-[4px] text-[#22c55e] bg-[#f0fdf4]" style={{ fontFamily: 'Noto Sans, sans-serif' }}>In Force</span>
                              </div>
                              <span className="text-[14px] leading-[21px] text-[#6e6e6e]" style={{ fontFamily: 'Noto Sans, sans-serif' }}>Policy No: PNF320104124A23</span>
                            </div>
                            <ChevronRightIcon className="w-[16px] h-[16px] text-[#212121]" />
                          </div>
                        )}
                      </div>
                    </CoverageCard>
                  </div>

                  {/* Row 3: Hospitalisation + Personal Accident */}
                  <div className="grid grid-cols-2 gap-[20px]">
                    <div className="flex flex-col rounded-[8px] overflow-hidden shadow-[0px_1px_4px_0px_rgba(0,0,0,0.05)]">
                      <div className="flex flex-row items-center gap-[8px] px-[16px] py-[16px] bg-white rounded-tl-[8px] rounded-tr-[8px] border-b border-[#000000]">
                        <div className="flex flex-row items-center gap-[8px] flex-1">
                          <div className="w-[24px] h-[24px] flex items-center justify-center">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#212121" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                              <polyline points="9 22 9 12 15 12 15 22" />
                            </svg>
                          </div>
                          <span className="text-[16px] font-medium leading-[24px] text-[#212121]" style={{ fontFamily: 'Noto Sans, sans-serif' }}>Hospitalisation Protection</span>
                        </div>
                        <div className="flex flex-row items-center gap-[4px] px-[8px] py-[4px] bg-[#f5f5f5] rounded-[24px]">
                          <span className="text-[12px] font-medium leading-[16.8px] text-[#8d8d8d]" style={{ fontFamily: 'Noto Sans, sans-serif' }}>NOT COVERED</span>
                        </div>
                      </div>
                      <div className="flex flex-col gap-[12px] px-[16px] py-[16px] bg-white rounded-bl-[8px] rounded-br-[8px] flex-1">
                        <p className="text-[16px] leading-[24px] text-[#212121]" style={{ fontFamily: 'Noto Sans, sans-serif' }}>
                          Cover day-to-day expenses when hospitalised from $X/year. Get quote{' '}
                          <span className="text-[#005eb8] underline cursor-pointer" onClick={() => navigate('/dashboard')}>here</span>.
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-col rounded-[8px] overflow-hidden shadow-[0px_1px_4px_0px_rgba(0,0,0,0.05)]">
                      <div className="flex flex-row items-center gap-[8px] px-[16px] py-[16px] bg-white rounded-tl-[8px] rounded-tr-[8px] border-b border-[#000000]">
                        <div className="flex flex-row items-center gap-[8px] flex-1">
                          <UserIcon className="w-[24px] h-[24px] text-[#212121]" />
                          <span className="text-[16px] font-medium leading-[24px] text-[#212121]" style={{ fontFamily: 'Noto Sans, sans-serif' }}>Personal Accident</span>
                        </div>
                        <div className="flex flex-row items-center gap-[4px] px-[8px] py-[4px] bg-[#f5f5f5] rounded-[24px]">
                          <span className="text-[12px] font-medium leading-[16.8px] text-[#8d8d8d]" style={{ fontFamily: 'Noto Sans, sans-serif' }}>NOT COVERED</span>
                        </div>
                      </div>
                      <div className="flex flex-col gap-[12px] px-[16px] py-[16px] bg-white rounded-bl-[8px] rounded-br-[8px] flex-1">
                        <p className="text-[16px] leading-[24px] text-[#212121]" style={{ fontFamily: 'Noto Sans, sans-serif' }}>
                          Get medical coverage for accidents from $X/year with your pre-filled details. Get quote{' '}
                          <span className="text-[#005eb8] underline cursor-pointer" onClick={() => navigate('/dashboard')}>here</span>.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Rewards */}
                <div className="flex flex-col gap-[20px]">
                  <div className="flex flex-row items-center gap-[28px]">
                    <span className="text-[20px] font-bold leading-[24px] text-[#212121] flex-1" style={{ fontFamily: 'Noto Sans, sans-serif' }}>Rewards</span>
                    <button className="flex flex-row items-center gap-[4px] cursor-pointer bg-transparent border-none p-0" onClick={() => navigate('/dashboard')}>
                      <span className="text-[14px] text-[#0d6efd]" style={{ fontFamily: 'Noto Sans, sans-serif' }}>View All</span>
                      <ArrowRightIcon className="w-[16px] h-[16px] text-[#0d6efd]" />
                    </button>
                  </div>

                  <div className="flex flex-row gap-[20px] overflow-x-auto scrollbar-hide">
                    <div className="flex flex-col w-[313px] shrink-0 rounded-[8px] overflow-hidden shadow-[0px_1px_4px_0px_rgba(0,0,0,0.05)] relative">
                      <img src={REWARD1_IMG} alt="KITH by Casa Products" className="w-[313px] h-[176px] object-cover rounded-tl-[8px] rounded-tr-[8px]" />
                      <img src={REWARD1_LOGO} alt="KITH logo" className="absolute top-[152px] left-[16px] w-[52px] h-[52px] rounded-full object-cover border-2 border-white" />
                      <div className="flex flex-col justify-between gap-[24px] p-[16px] bg-white rounded-bl-[8px] rounded-br-[8px] flex-1 pt-[28px]">
                        <div className="flex flex-col gap-[12px]">
                          <span className="text-[16px] font-medium leading-[24px] text-[#212121]" style={{ fontFamily: 'Noto Sans, sans-serif' }}>10% off KITH by Casa Products</span>
                          <span className="text-[14px] leading-[21px] text-[#6e6e6e]" style={{ fontFamily: 'Noto Sans, sans-serif' }}>Enter promo code UOIKITH10 at checkout on www.kith.sg to enjoy the offer.</span>
                        </div>
                        <button className="flex flex-row items-center justify-center px-[16px] py-[12px] bg-[#005eb8] rounded-[8px] text-white text-[16px] font-medium cursor-pointer hover:opacity-90" style={{ fontFamily: 'Noto Sans, sans-serif' }} onClick={() => navigate('/dashboard')}>Shop Now</button>
                      </div>
                    </div>

                    <div className="flex flex-col w-[313px] shrink-0 rounded-[8px] overflow-hidden shadow-[0px_1px_4px_0px_rgba(0,0,0,0.05)] relative">
                      <img src={REWARD2_IMG} alt="Cat & the Fiddle Cakes" className="w-[313px] h-[176px] object-cover rounded-tl-[8px] rounded-tr-[8px]" />
                      <img src={REWARD2_LOGO} alt="Cat & the Fiddle logo" className="absolute top-[152px] left-[16px] w-[52px] h-[52px] rounded-full object-cover border-2 border-white" />
                      <div className="flex flex-col justify-between gap-[24px] p-[16px] bg-white rounded-bl-[8px] rounded-br-[8px] flex-1 pt-[28px]">
                        <div className="flex flex-col gap-[12px]">
                          <span className="text-[16px] font-medium leading-[24px] text-[#212121]" style={{ fontFamily: 'Noto Sans, sans-serif' }}>10% off Cat &amp; the Fiddle Cakes</span>
                          <span className="text-[14px] leading-[21px] text-[#6e6e6e]" style={{ fontFamily: 'Noto Sans, sans-serif' }}>Enter promo code UOICATFIDDLE10 at checkout on www.catandthefiddle to enjoy the offer.</span>
                        </div>
                        <button className="flex flex-row items-center justify-center px-[16px] py-[12px] bg-[#005eb8] rounded-[8px] text-white text-[16px] font-medium cursor-pointer hover:opacity-90" style={{ fontFamily: 'Noto Sans, sans-serif' }} onClick={() => navigate('/dashboard')}>Shop Now</button>
                      </div>
                    </div>

                    <div className="flex flex-col w-[313px] shrink-0 rounded-[8px] overflow-hidden shadow-[0px_1px_4px_0px_rgba(0,0,0,0.05)] relative">
                      <img src={REWARD3_IMG} alt="HEYMAX" className="w-[313px] h-[176px] object-cover rounded-tl-[8px] rounded-tr-[8px]" />
                      <img src={REWARD3_LOGO} alt="HEYMAX logo" className="absolute top-[152px] left-[16px] w-[52px] h-[52px] rounded-full object-cover border-2 border-white" />
                      <div className="flex flex-col gap-[24px] p-[16px] bg-white rounded-bl-[8px] rounded-br-[8px] flex-1 pt-[28px]">
                        <div className="flex flex-col gap-[12px]">
                          <span className="text-[16px] font-medium leading-[24px] text-[#212121]" style={{ fontFamily: 'Noto Sans, sans-serif' }}>$5 Credit Reward for HEYMAX New User Sign Up</span>
                          <span className="text-[14px] leading-[21px] text-[#6e6e6e]" style={{ fontFamily: 'Noto Sans, sans-serif' }}>Enter promo code UOIHEYMAX5 during registration to enjoy $5 credit.</span>
                        </div>
                        <button className="flex flex-row items-center justify-center px-[16px] py-[12px] bg-[#005eb8] rounded-[8px] text-white text-[16px] font-medium cursor-pointer hover:opacity-90" style={{ fontFamily: 'Noto Sans, sans-serif' }} onClick={() => navigate('/dashboard')}>Sign Up</button>
                      </div>
                    </div>

                    <button className="flex items-center justify-center w-[40px] h-[40px] shrink-0 self-center cursor-pointer bg-transparent border-none" onClick={() => navigate('/dashboard')}>
                      <ChevronRightIcon className="w-[40px] h-[40px] text-[#212121]" />
                    </button>
                  </div>
                </div>

              </div>
            </div>

            {/* Footer */}
            <div className="w-full flex flex-row items-center justify-between px-[24px] py-[16px] bg-[#005eb8]" style={{ minHeight: '53px' }}>
              <span className="text-[14px] leading-[21px] text-white" style={{ fontFamily: 'Noto Sans, sans-serif' }}>Copyright © 2026 United Overseas Insurance Limited Co. Reg. No. 197100152R.</span>
              <span className="text-[14px] leading-[21px] text-white text-right" style={{ fontFamily: 'Noto Sans, sans-serif' }}>All Rights Reserved.</span>
            </div>
          </main>
        </div>
      </div>
    </div>
  )
}
