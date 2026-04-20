import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'

const LOGO = 'https://s3-alpha-sig.figma.com/img/26ec/3ab4/0588c7482da725dcdeb68b2897f9bde2?Expires=1777852800&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=ShoM0pDLFtIglvPWeRLcrNHkP-8DajZ~UfTydATZnIyvxRx0Q8vNaKu-xBitsol0veqqwq1r4p1azXwhatXwj7sKArxvuNthVWmFirx22koohe8997mFNM6GF2P9FJZQ6hnguVRCcCTWizRFgiWWnqabTviIJl1EuaMxA65dwinn4u47OVQuKOW4HPfBJ49i-x-lqHrsAbGLy9XfBAQqpYzMCSsmnWFH-jgrpSRysU3HqoilRLqyQb6LtiIX7mix4qKeTiJI50ywXWQYf5zHXGyqc7Ry5JQaJUdS88v~1e1Kd-i6t7RipipnfhyJG71UbhW-m-9vh~8Pv9t2nKWPxg__'
const HERO = 'https://s3-alpha-sig.figma.com/img/aab6/0921/4d0afc4bf990cf584c0c3c3e94ab342d?Expires=1777852800&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=evV6xk8x8mXwhl5DIkzHg2YvXWJLdjUEE4QzPiw6skwI8IIpjBvimdVwPWI3lvrYlZLeVrGLuFRhJSyQ4GLkoIysQRqfpOJ8dmtuYTF0s9CS2fmpshgKg~eT~~cvuqARWBTTgJbpm4EKFFQe~kRYW2YGiRqEXepHLEst6q0xBDgHIiQabxEZE9VchjDafhutP34bXOqxyem451w8M82FG1pcJ~uI8MojTj-DkPpVSG9U6c-dXDkuPq2ZLzeGBzySFlIhRmWkDUzHDYlXHEUa6ro4WFSx71OMT6F2uglnWSRUKZQXRbtGsylqIereApngRcCLus72riI1Hx4ANuxYcA__'

function ChevronLeftIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <polyline points="15 18 9 12 15 6" />
    </svg>
  )
}

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

export default function ResetPassword() {
  const navigate = useNavigate()

  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [mismatch, setMismatch] = useState(false)

  const handleConfirm = () => {
    if (!password || !confirmPassword) return
    if (password !== confirmPassword) {
      setMismatch(true)
      return
    }
    setMismatch(false)
    navigate('/login?reset=updated')
  }

  return (
    <div className="min-h-screen w-full flex flex-col font-[Noto_Sans]">
      <div className="flex flex-col md:flex-row flex-1">
        <div
          className="flex-1 flex flex-col items-center justify-center py-[24px] px-[16px] md:py-[40px] md:px-[40px] min-h-screen md:min-h-0"
          style={{ background: 'linear-gradient(to bottom, rgba(0,94,184,0.07) 0%, rgba(92,85,235,0.07) 73%), #ffffff' }}
        >
          <div
            className="w-full max-w-[420px] flex flex-col items-center gap-[32px] py-[32px] px-[24px] rounded-[24px]"
            style={{
              background: 'radial-gradient(circle, rgba(255,255,255,0.56) 0%, rgba(255,255,255,0.08) 100%), rgba(255,255,255,0.70)',
              boxShadow: '0px 1px 4px 0px rgba(0,0,0,0.05)',
            }}
          >
            <div className="flex flex-row items-center gap-[4px] w-full">
              <button
                onClick={() => navigate('/login')}
                className="flex flex-row items-center gap-[4px] cursor-pointer hover:opacity-70 transition-opacity bg-transparent border-none p-0"
              >
                <ChevronLeftIcon className="w-[20px] h-[20px] text-[#6e6e6e]" />
                <span className="text-[14px] leading-[21px] text-[#6e6e6e]" style={{ fontFamily: 'Noto Sans, sans-serif' }}>Back to Login</span>
              </button>
            </div>

            <div className="flex flex-col items-center gap-[12px] w-full">
              <img src={LOGO} alt="UOI Logo" className="w-[100px] h-[50px] object-contain" />
              <p className="text-[32px] font-bold leading-[38.4px] text-center text-[#212121]" style={{ fontFamily: 'Noto Sans, sans-serif' }}>
                Reset Password
              </p>
              <p className="text-[16px] leading-[24px] text-center text-[#212121]" style={{ fontFamily: 'Noto Sans, sans-serif' }}>
                Check that information you provide is accurate before proceeding.
              </p>
            </div>

            <div className="flex flex-col gap-[16px] w-full">
              <div className="flex flex-col gap-[12px] w-full">
                <div className="flex flex-row items-center gap-[4px]">
                  <LockIcon className="w-[16px] h-[21px] text-[#212121]" />
                </div>
                <div
                  className={`flex flex-row items-center justify-between px-[16px] py-[12px] w-full h-[48px] bg-white rounded-[8px] border ${
                    mismatch ? 'border-[#dc3545]' : 'border-[#000000]'
                  }`}
                >
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => { setPassword(e.target.value); setMismatch(false) }}
                    className="flex-1 bg-transparent text-[16px] leading-[24px] text-[#212121] outline-none"
                    style={{ fontFamily: 'Noto Sans, sans-serif' }}
                  />
                  <button
                    onClick={() => setShowPassword(!showPassword)}
                    className="ml-[8px] cursor-pointer bg-transparent border-none p-0"
                  >
                    {showPassword
                      ? <EyeOffIcon className="w-[24px] h-[24px] text-[#212121]" />
                      : <EyeIcon className="w-[24px] h-[24px] text-[#212121]" />}
                  </button>
                </div>
              </div>

              <div className="flex flex-col gap-[12px] w-full">
                <div className="flex flex-row items-center gap-[4px]">
                  <span className="text-[14px] leading-[21px] text-[#212121]" style={{ fontFamily: 'Noto Sans, sans-serif' }}>Confirm Password</span>
                </div>
                <div
                  className={`flex flex-row items-center justify-between px-[16px] py-[12px] w-full h-[48px] bg-white rounded-[8px] border ${
                    mismatch ? 'border-[#dc3545]' : 'border-[#000000]'
                  }`}
                >
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    value={confirmPassword}
                    onChange={(e) => { setConfirmPassword(e.target.value); setMismatch(false) }}
                    className="flex-1 bg-transparent text-[16px] leading-[24px] text-[#212121] outline-none"
                    style={{ fontFamily: 'Noto Sans, sans-serif' }}
                  />
                  <button
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="ml-[8px] cursor-pointer bg-transparent border-none p-0"
                  >
                    {showConfirmPassword
                      ? <EyeOffIcon className="w-[24px] h-[24px] text-[#212121]" />
                      : <EyeIcon className="w-[24px] h-[24px] text-[#212121]" />}
                  </button>
                </div>
                {mismatch && (
                  <div className="flex flex-row items-center gap-[8px]">
                    <div className="w-[16px] h-[16px] rounded-full bg-[#dc3545] flex items-center justify-center shrink-0">
                      <span className="text-white text-[10px] font-bold leading-none">!</span>
                    </div>
                    <span className="text-[12px] leading-[16.8px] text-[#dc3545]" style={{ fontFamily: 'Noto Sans, sans-serif' }}>
                      Passwords do not match, try again.
                    </span>
                  </div>
                )}
              </div>
            </div>

            <button
              onClick={handleConfirm}
              className="flex flex-row items-center justify-center px-[40px] py-[14px] gap-[10px] bg-[#005eb8] rounded-[8px] cursor-pointer hover:opacity-90 transition-opacity"
            >
              <span className="text-[16px] font-medium leading-[24px] text-white" style={{ fontFamily: 'Noto Sans, sans-serif' }}>Confirm</span>
            </button>
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
}
