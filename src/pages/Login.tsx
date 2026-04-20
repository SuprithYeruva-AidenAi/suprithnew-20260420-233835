import { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'

const LOGO = 'https://s3-alpha-sig.figma.com/img/26ec/3ab4/0588c7482da725dcdeb68b2897f9bde2?Expires=1777852800&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=ShoM0pDLFtIglvPWeRLcrNHkP-8DajZ~UfTydATZnIyvxRx0Q8vNaKu-xBitsol0veqqwq1r4p1azXwhatXwj7sKArxvuNthVWmFirx22koohe8997mFNM6GF2P9FJZQ6hnguVRCcCTWizRFgiWWnqabTviIJl1EuaMxA65dwinn4u47OVQuKOW4HPfBJ49i-x-lqHrsAbGLy9XfBAQqpYzMCSsmnWFH-jgrpSRysU3HqoilRLqyQb6LtiIX7mix4qKeTiJI50ywXWQYf5zHXGyqc7Ry5JQaJUdS88v~1e1Kd-i6t7RipipnfhyJG71UbhW-m-9vh~8Pv9t2nKWPxg__'
const HERO = 'https://s3-alpha-sig.figma.com/img/aab6/0921/4d0afc4bf990cf584c0c3c3e94ab342d?Expires=1777852800&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=evV6xk8x8mXwhl5DIkzHg2YvXWJLdjUEE4QzPiw6skwI8IIpjBvimdVwPWI3lvrYlZLeVrGLuFRhJSyQ4GLkoIysQRqfpOJ8dmtuYTF0s9CS2fmpshgKg~eT~~cvuqARWBTTgJbpm4EKFFQe~kRYW2YGiRqEXepHLEst6q0xBDgHIiQabxEZE9VchjDafhutP34bXOqxyem451w8M82FG1pcJ~uI8MojTj-DkPpVSG9U6c-dXDkuPq2ZLzeGBzySFlIhRmWkDUzHDYlXHEUa6ro4WFSx71OMT6F2uglnWSRUKZQXRbtGsylqIereApngRcCLus72riI1Hx4ANuxYcA__'

function EyeIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  )
}

function EyeOffIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
      <line x1="1" y1="1" x2="23" y2="23" />
    </svg>
  )
}

function LockIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  )
}

type LoginView = 'login' | 'otp'

export default function Login() {
  const navigate = useNavigate()

  const [fields, setFields] = useState({ nric: '', password: '' })
  const [error, setError] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  const [view, setView] = useState<LoginView>('login')
  const [otpFields, setOtpFields] = useState({ code: '' })
  const [otpError, setOtpError] = useState('')

  const [toast, setToast] = useState<{ msg: string } | null>(null)

  useEffect(() => {
    if (toast) {
      const t = setTimeout(() => setToast(null), 3000)
      return () => clearTimeout(t)
    }
  }, [toast])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (Object.values(fields).some(v => !v.trim())) {
      setError('Please fill all required fields')
      return
    }
    setError('')
    setView('otp')
  }

  const handleVerifySubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!otpFields.code.trim()) {
      setOtpError('Please enter the OTP code')
      return
    }
    setOtpError('')
    navigate('/home')
  }

  const handleResend = () => {
    setOtpFields({ code: '' })
    setToast({ msg: 'OTP sent to email address.' })
  }

  const PageShell = ({ children }: { children: React.ReactNode }) => (
    <div className="min-h-screen w-full flex flex-col font-[Noto_Sans]">
      {toast && (
        <div
          className="fixed top-[24px] left-1/2 -translate-x-1/2 z-50 flex flex-row items-center gap-[8px] px-[16px] py-[8px] rounded-[8px]"
          style={{ background: '#d8ffe2', boxShadow: '0px 1px 4px 0px rgba(0,0,0,0.05)' }}
        >
          <div className="w-[16px] h-[16px] rounded-full bg-[#22c55e] flex items-center justify-center shrink-0">
            <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
              <path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <span className="text-[14px] leading-[21px] text-[#212121]" style={{ fontFamily: 'Noto Sans, sans-serif' }}>
            {toast.msg}
          </span>
        </div>
      )}

      <div className="flex flex-col md:flex-row flex-1">
        <div
          className="flex-1 flex flex-col items-center justify-center py-[24px] px-[16px] md:py-[40px] md:px-[40px] min-h-screen md:min-h-0"
          style={{ background: 'linear-gradient(to bottom, rgba(0,94,184,0.07) 0%, rgba(92,85,235,0.07) 73%), #ffffff' }}
        >
          {children}
        </div>
        <div className="hidden md:block md:flex-1 relative">
          <img src={HERO} alt="Travel lifestyle" className="absolute inset-0 w-full h-full object-cover" />
        </div>
      </div>

      <div
        className="w-full flex flex-row items-center justify-between px-[24px] py-[16px] bg-[#005eb8]"
        style={{ minHeight: '53px' }}
      >
        <span className="text-[14px] leading-[21px] text-white" style={{ fontFamily: 'Noto Sans, sans-serif' }}>
          Copyright © 2026 United Overseas Insurance Limited Co. Reg. No. 197100152R.
        </span>
        <span className="text-[14px] leading-[21px] text-white text-right" style={{ fontFamily: 'Noto Sans, sans-serif' }}>
          All Rights Reserved.
        </span>
      </div>
    </div>
  )

  if (view === 'otp') {
    return (
      <PageShell>
        <div
          className="w-full max-w-[420px] flex flex-col items-center gap-[32px] py-[32px] px-[24px] rounded-[24px]"
          style={{
            background: 'radial-gradient(circle, rgba(255,255,255,0.56) 0%, rgba(255,255,255,0.08) 100%), rgba(255,255,255,0.70)',
            boxShadow: '0px 1px 4px 0px rgba(0,0,0,0.05)',
          }}
        >
          <div className="flex flex-col items-center gap-[12px] w-full">
            <img src={LOGO} alt="UOI Logo" className="w-[100px] h-[50px] object-contain" />
            <p className="text-[32px] font-bold leading-[38.4px] text-center text-[#212121]" style={{ fontFamily: 'Noto Sans, sans-serif' }}>
              Logging in on a new device?
            </p>
            <p className="text-[16px] leading-[24px] text-center text-[#212121]" style={{ fontFamily: 'Noto Sans, sans-serif' }}>
              We&#39;ve sent a one-time password (OTP) to{' '}<br />ch****@gmail.com
            </p>
          </div>

          <form onSubmit={handleVerifySubmit} className="flex flex-col gap-[16px] w-full">
            <div className="flex flex-col gap-[12px] w-full">
              <div className="flex flex-row items-center gap-[4px]">
                <span className="text-[14px] leading-[21px] text-[#212121]" style={{ fontFamily: 'Noto Sans, sans-serif' }}>Enter Code</span>
              </div>
              <input
                type="text"
                value={otpFields.code}
                onChange={(e) => setOtpFields({ ...otpFields, code: e.target.value })}
                className="w-full h-[48px] px-[16px] py-[12px] bg-white rounded-[8px] border border-[#000000] text-[16px] leading-[24px] text-[#212121] outline-none focus:border-[#005eb8]"
                style={{ fontFamily: 'Noto Sans, sans-serif' }}
              />
            </div>
            <div className="flex flex-col gap-[8px] w-full">
              <p className="text-[14px] leading-[21px] text-[#6e6e6e]" style={{ fontFamily: 'Noto Sans, sans-serif' }}>
                Didn&#39;t receive a code?{' '}
                <span className="text-[#005eb8] underline cursor-pointer" onClick={handleResend}>Resend</span>
              </p>
            </div>

            {otpError && (
              <div className="text-red-500 text-sm" style={{ fontFamily: 'Noto Sans, sans-serif' }}>{otpError}</div>
            )}

            <button
              type="submit"
              className="flex flex-row items-center justify-center px-[40px] py-[14px] gap-[10px] bg-[#005eb8] rounded-[8px] cursor-pointer hover:opacity-90 transition-opacity"
            >
              <span className="text-[16px] font-medium leading-[24px] text-white" style={{ fontFamily: 'Noto Sans, sans-serif' }}>Verify</span>
            </button>
          </form>
        </div>

        <div className="flex flex-col gap-[12px] w-full max-w-[420px] mt-[24px]">
          <p className="text-[14px] leading-[21px] text-center text-[#6e6e6e]" style={{ fontFamily: 'Noto Sans, sans-serif' }}>
            Don&#39;t have an account?{' '}
            <Link to="/create-account" className="text-[#005eb8] underline cursor-pointer">Create an account</Link>
          </p>
          <p className="text-[14px] leading-[21px] text-center text-[#6e6e6e]" style={{ fontFamily: 'Noto Sans, sans-serif' }}>
            If you&#39;re experiencing login issues, please contact us at{' '}
            <a href="mailto:help@uoi.com.sg" className="text-[#005eb8] underline">help@uoi.com.sg</a>.
          </p>
        </div>
      </PageShell>
    )
  }

  return (
    <PageShell>
      <div
        className="w-full max-w-[420px] flex flex-col items-center gap-[32px] py-[32px] px-[24px] rounded-[24px]"
        style={{
          background: 'radial-gradient(circle, rgba(255,255,255,0.56) 0%, rgba(255,255,255,0.08) 100%), rgba(255,255,255,0.70)',
          boxShadow: '0px 1px 4px 0px rgba(0,0,0,0.05)',
        }}
      >
        <div className="flex flex-col items-center gap-[12px] w-full">
          <img src={LOGO} alt="UOI Logo" className="w-[100px] h-[50px] object-contain" />
          <p className="text-[32px] font-bold leading-[38.4px] text-center text-[#212121]" style={{ fontFamily: 'Noto Sans, sans-serif' }}>
            Welcome to UOI Customer Portal
          </p>
          <p className="text-[16px] leading-[24px] text-center text-[#212121]" style={{ fontFamily: 'Noto Sans, sans-serif' }}>
            Manage all your policies in one portal.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-[16px] w-full">
          <div className="flex flex-col gap-[12px] w-full">
            <div className="flex flex-row items-center gap-[4px]">
              <span className="text-[14px] leading-[21px] text-[#212121]" style={{ fontFamily: 'Noto Sans, sans-serif' }}>NRIC/FIN</span>
            </div>
            <input
              type="text"
              value={fields.nric}
              onChange={(e) => { setFields({ ...fields, nric: e.target.value }); setError('') }}
              className="w-full h-[48px] px-[16px] py-[12px] bg-white rounded-[8px] border border-[#000000] text-[16px] leading-[24px] text-[#212121] outline-none focus:border-[#005eb8]"
              style={{ fontFamily: 'Noto Sans, sans-serif' }}
            />
          </div>

          <div className="flex flex-col gap-[8px] w-full">
            <div className="flex flex-col gap-[12px] w-full">
              <div className="flex flex-row items-center gap-[8px]">
                <LockIcon className="w-[16px] h-[21px] text-[#212121]" />
              </div>
              <div
                className={`flex flex-row items-center justify-between px-[16px] py-[12px] w-full h-[48px] bg-white rounded-[8px] border ${
                  error ? 'border-[#dc3545]' : 'border-[#000000]'
                }`}
              >
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={fields.password}
                  onChange={(e) => { setFields({ ...fields, password: e.target.value }); setError('') }}
                  className="flex-1 bg-transparent text-[16px] leading-[24px] text-[#212121] outline-none"
                  style={{ fontFamily: 'Noto Sans, sans-serif' }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="ml-[8px] cursor-pointer bg-transparent border-none p-0"
                >
                  {showPassword
                    ? <EyeOffIcon className="w-[24px] h-[24px] text-[#212121]" />
                    : <EyeIcon className="w-[24px] h-[24px] text-[#212121]" />}
                </button>
              </div>
            </div>

            <span
              className="text-[14px] leading-[21px] text-[#6e6e6e] cursor-pointer hover:underline"
              style={{ fontFamily: 'Noto Sans, sans-serif' }}
              onClick={() => navigate('/forgot-password')}
            >
              Forgot password?
            </span>
          </div>

          {error && (
            <div className="text-red-500 text-sm" style={{ fontFamily: 'Noto Sans, sans-serif' }}>{error}</div>
          )}

          <button
            type="submit"
            className="flex flex-row items-center justify-center px-[40px] py-[14px] gap-[10px] bg-[#005eb8] rounded-[8px] cursor-pointer hover:opacity-90 transition-opacity"
          >
            <span className="text-[16px] font-medium leading-[24px] text-white" style={{ fontFamily: 'Noto Sans, sans-serif' }}>Login</span>
          </button>
        </form>
      </div>

      <div className="flex flex-col gap-[12px] w-full max-w-[420px] mt-[24px]">
        <p className="text-[14px] leading-[21px] text-center text-[#6e6e6e]" style={{ fontFamily: 'Noto Sans, sans-serif' }}>
          Don&#39;t have an account?{' '}
          <Link to="/create-account" className="text-[#005eb8] underline cursor-pointer">Create an account</Link>
        </p>
        <p className="text-[14px] leading-[21px] text-center text-[#6e6e6e]" style={{ fontFamily: 'Noto Sans, sans-serif' }}>
          If you&#39;re experiencing login issues, please contact us at{' '}
          <a href="mailto:help@uoi.com.sg" className="text-[#005eb8] underline">help@uoi.com.sg</a>.
        </p>
      </div>
    </PageShell>
  )
}
