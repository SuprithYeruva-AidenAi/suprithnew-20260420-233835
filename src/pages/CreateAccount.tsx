import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const LOGO_URL = 'https://s3-alpha-sig.figma.com/img/26ec/3ab4/0588c7482da725dcdeb68b2897f9bde2?Expires=1777852800&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=ShoM0pDLFtIglvPWeRLcrNHkP-8DajZ~UfTydATZnIyvxRx0Q8vNaKu-xBitsol0veqqwq1r4p1azXwhatXwj7sKArxvuNthVWmFirx22koohe8997mFNM6GF2P9FJZQ6hnguVRCcCTWizRFgiWWnqabTviIJl1EuaMxA65dwinn4u47OVQuKOW4HPfBJ49i-x-lqHrsAbGLy9XfBAQqpYzMCSsmnWFH-jgrpSRysU3HqoilRLqyQb6LtiIX7mix4qKeTiJI50ywXWQYf5zHXGyqc7Ry5JQaJUdS88v~1e1Kd-i6t7RipipnfhyJG71UbhW-m-9vh~8Pv9t2nKWPxg__'
const HERO_URL = 'https://s3-alpha-sig.figma.com/img/aab6/0921/4d0afc4bf990cf584c0c3c3e94ab342d?Expires=1777852800&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=evV6xk8x8mXwhl5DIkzHg2YvXWJLdjUEE4QzPiw6skwI8IIpjBvimdVwPWI3lvrYlZLeVrGLuFRhJSyQ4GLkoIysQRqfpOJ8dmtuYTF0s9CS2fmpshgKg~eT~~cvuqARWBTTgJbpm4EKFFQe~kRYW2YGiRqEXepHLEst6q0xBDgHIiQabxEZE9VchjDafhutP34bXOqxyem451w8M82FG1pcJ~uI8MojTj-DkPpVSG9U6c-dXDkuPq2ZLzeGBzySFlIhRmWkDUzHDYlXHEUa6ro4WFSx71OMT6F2uglnWSRUKZQXRbtGsylqIereApngRcCLus72riI1Hx4ANuxYcA__'

// Calendar icon inline SVG replacement
function CalendarIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
    </svg>
  )
}

type FormState = 'empty' | 'filled' | 'otp_sent' | 'otp_filled' | 'email_err' | 'otp_err'

export default function CreateAccount() {
  const navigate = useNavigate()

  const [nric, setNric] = useState('')
  const [dob, setDob] = useState('')
  const [email, setEmail] = useState('')
  const [otp, setOtp] = useState('')
  const [formState, setFormState] = useState<FormState>('empty')
  const [showOtpToast, setShowOtpToast] = useState(false)

  const showOtpField = formState === 'otp_sent' || formState === 'otp_filled' || formState === 'otp_err'
  const showGetOtp = formState === 'filled'
  const showResend = formState === 'otp_sent' || formState === 'otp_filled' || formState === 'otp_err'
  const emailError = formState === 'email_err'
  const otpError = formState === 'otp_err'

  useEffect(() => {
    if (showOtpToast) {
      const t = setTimeout(() => setShowOtpToast(false), 3000)
      return () => clearTimeout(t)
    }
  }, [showOtpToast])

  const handleNricChange = (v: string) => {
    setNric(v)
    updateFilledState(v, dob, email)
  }
  const handleDobChange = (v: string) => {
    setDob(v)
    updateFilledState(nric, v, email)
  }
  const handleEmailChange = (v: string) => {
    setEmail(v)
    if (formState === 'email_err') setFormState('filled')
    else updateFilledState(nric, dob, v)
  }
  const handleOtpChange = (v: string) => {
    setOtp(v)
    if (v.length > 0 && (formState === 'otp_sent' || formState === 'otp_err')) {
      setFormState('otp_filled')
    } else if (v.length === 0) {
      setFormState('otp_sent')
    }
  }

  function updateFilledState(n: string, d: string, e: string) {
    if (n && d && e && !showOtpField) {
      setFormState('filled')
    } else if (!n && !d && !e) {
      setFormState('empty')
    }
  }

  const handleGetOtp = () => {
    if (!email.includes('@') || !email.includes('.')) {
      setFormState('email_err')
      return
    }
    setFormState('otp_sent')
    setShowOtpToast(true)
  }

  const handleResend = () => {
    setOtp('')
    setFormState('otp_sent')
    setShowOtpToast(true)
  }

  const handleNext = () => {
    if (!nric) return
    if (!dob) return
    if (!email) {
      setFormState('email_err')
      return
    }
    if (!email.includes('@')) {
      setFormState('email_err')
      return
    }
    if (showOtpField) {
      setTimeout(() => navigate('/create-account-password'), 300)
      return
    }
    if (formState === 'filled') {
      handleGetOtp()
      return
    }
    setTimeout(() => navigate('/create-account-password'), 300)
  }

  return (
    <div className="min-h-screen w-full flex flex-col font-[Noto_Sans]">
      <div className="flex flex-col md:flex-row flex-1">
        <div
          className="flex-1 flex flex-col items-center justify-center py-[24px] px-[16px] md:py-[40px] md:px-[40px] min-h-screen md:min-h-0 relative"
          style={{
            background: 'linear-gradient(to bottom, rgba(0,94,184,0.07) 0%, rgba(92,85,235,0.07) 73%), #ffffff',
          }}
        >
          {showOtpToast && (
            <div
              className="absolute top-[24px] left-1/2 -translate-x-1/2 flex flex-row items-center gap-[8px] px-[16px] py-[8px] rounded-[8px] z-50"
              style={{ background: '#d8ffe2', boxShadow: '0px 1px 4px 0px rgba(0,0,0,0.05)' }}
            >
              <div className="w-[16px] h-[16px] rounded-full bg-[#22c55e] flex items-center justify-center shrink-0">
                <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                  <path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <span className="text-[14px] leading-[21px] text-[#212121]" style={{ fontFamily: 'Noto Sans, sans-serif' }}>
                OTP sent to email address.
              </span>
            </div>
          )}

          <div
            className="w-full max-w-[420px] flex flex-col items-center gap-[32px] py-[32px] px-[24px] rounded-[24px]"
            style={{
              background: 'radial-gradient(circle, rgba(255,255,255,0.56) 0%, rgba(255,255,255,0.08) 100%), rgba(255,255,255,0.70)',
              boxShadow: '0px 1px 4px 0px rgba(0,0,0,0.05)',
            }}
          >
            <div className="flex flex-col items-center gap-[12px] w-full">
              <img src={LOGO_URL} alt="UOI Logo" className="w-[100px] h-[50px] object-contain" />
              <p className="text-[32px] font-bold leading-[38px] text-center text-[#212121]" style={{ fontFamily: 'Noto Sans, sans-serif' }}>
                Create Account
              </p>
              <p className="text-[16px] leading-[24px] text-center text-[#212121]" style={{ fontFamily: 'Noto Sans, sans-serif' }}>
                Check that information you provide is accurate before proceeding.
              </p>
            </div>

            <div className="flex flex-col gap-[16px] w-full">
              <div className="flex flex-col gap-[12px] w-full">
                <div className="flex flex-row items-center gap-[4px]">
                  <span className="text-[14px] leading-[21px] text-[#212121]" style={{ fontFamily: 'Noto Sans, sans-serif' }}>NRIC/FIN</span>
                </div>
                <input
                  type="text"
                  value={nric}
                  onChange={(e) => handleNricChange(e.target.value)}
                  className="w-full h-[48px] px-[16px] py-[12px] bg-white rounded-[8px] border border-[#000000] text-[16px] leading-[24px] text-[#212121] outline-none focus:border-[#005eb8]"
                  style={{ fontFamily: 'Noto Sans, sans-serif' }}
                />
              </div>

              <div className="flex flex-col gap-[12px] w-full">
                <div className="flex flex-row items-center gap-[4px]">
                  <span className="text-[14px] leading-[21px] text-[#212121]" style={{ fontFamily: 'Noto Sans, sans-serif' }}>Date of Birth</span>
                </div>
                <div className="relative w-full">
                  <input
                    type="text"
                    value={dob}
                    onChange={(e) => handleDobChange(e.target.value)}
                    placeholder="DD/MM/YYYY"
                    className="w-full h-[48px] px-[16px] py-[12px] pr-[48px] bg-white rounded-[8px] border border-[#000000] text-[16px] leading-[24px] text-[#212121] outline-none focus:border-[#005eb8]"
                    style={{ fontFamily: 'Noto Sans, sans-serif' }}
                  />
                  <CalendarIcon className="absolute right-[16px] top-1/2 -translate-y-1/2 w-[24px] h-[24px] text-[#212121] pointer-events-none" />
                </div>
              </div>

              <div className="flex flex-col gap-[12px] w-full">
                <div className="flex flex-row items-center gap-[4px]">
                  <span className="text-[14px] leading-[21px] text-[#212121]" style={{ fontFamily: 'Noto Sans, sans-serif' }}>Email Address</span>
                </div>

                <div
                  className={`flex flex-row items-center gap-[8px] w-full h-auto min-h-[48px] px-[16px] py-[12px] bg-white rounded-[8px] border ${
                    emailError ? 'border-[#dc3545]' : 'border-[#000000]'
                  }`}
                >
                  <input
                    type="text"
                    value={email}
                    onChange={(e) => handleEmailChange(e.target.value)}
                    className="flex-1 bg-transparent text-[16px] leading-[24px] text-[#212121] outline-none"
                    style={{ fontFamily: 'Noto Sans, sans-serif' }}
                  />
                  {showGetOtp && (
                    <button
                      onClick={handleGetOtp}
                      className="shrink-0 flex items-center justify-center px-[16px] py-[8px] h-[32px] bg-white rounded-[8px] border border-[#005eb8] cursor-pointer hover:opacity-90 transition-opacity"
                      style={{ boxShadow: '0px 1px 4px 0px rgba(0,0,0,0.05)', fontFamily: 'Noto Sans, sans-serif' }}
                    >
                      <span className="text-[14px] font-medium leading-[21px] text-[#005eb8]">Get OTP</span>
                    </button>
                  )}
                  {showResend && (
                    <button
                      onClick={handleResend}
                      className="shrink-0 flex items-center justify-center px-[16px] py-[8px] h-[32px] bg-white rounded-[8px] border border-[#005eb8] cursor-pointer hover:opacity-90 transition-opacity"
                      style={{ boxShadow: '0px 1px 4px 0px rgba(0,0,0,0.05)', fontFamily: 'Noto Sans, sans-serif' }}
                    >
                      <span className="text-[14px] font-medium leading-[21px] text-[#005eb8]">Resend</span>
                    </button>
                  )}
                </div>

                {emailError && (
                  <div className="flex flex-row items-center gap-[8px]">
                    <div className="w-[16px] h-[16px] rounded-full bg-[#dc3545] flex items-center justify-center shrink-0">
                      <span className="text-white text-[10px] font-bold leading-none">!</span>
                    </div>
                    <span className="text-[12px] leading-[16.8px] text-[#dc3545]" style={{ fontFamily: 'Noto Sans, sans-serif' }}>
                      Invalid email address
                    </span>
                  </div>
                )}

                {showOtpField && (
                  <div className="flex flex-col gap-[12px] w-full">
                    <input
                      type="text"
                      value={otp}
                      onChange={(e) => handleOtpChange(e.target.value)}
                      placeholder="Enter code"
                      className={`w-full h-[48px] px-[16px] py-[12px] bg-white rounded-[8px] border ${
                        otpError ? 'border-[#dc3545]' : 'border-[#000000]'
                      } text-[16px] leading-[24px] text-[#212121] outline-none focus:border-[#005eb8]`}
                      style={{ fontFamily: 'Noto Sans, sans-serif' }}
                    />
                    {otpError && (
                      <div className="flex flex-row items-center gap-[8px]">
                        <div className="w-[16px] h-[16px] rounded-full bg-[#dc3545] flex items-center justify-center shrink-0">
                          <span className="text-white text-[10px] font-bold leading-none">!</span>
                        </div>
                        <span className="text-[12px] leading-[16.8px] text-[#dc3545]" style={{ fontFamily: 'Noto Sans, sans-serif' }}>
                          Invalid OTP
                        </span>
                      </div>
                    )}
                    <span
                      className="text-[14px] leading-[21px] text-[#0d6efd] cursor-pointer"
                      style={{ fontFamily: 'Noto Sans, sans-serif' }}
                      onClick={handleResend}
                    >
                      Didn&#39;t receive a code? Resend
                    </span>
                  </div>
                )}
              </div>
            </div>

            <button
              onClick={handleNext}
              className="flex flex-row items-center justify-center px-[40px] py-[14px] gap-[10px] bg-[#005eb8] rounded-[8px] cursor-pointer hover:opacity-90 transition-opacity"
              style={{ fontFamily: 'Noto Sans, sans-serif' }}
            >
              <span className="text-[16px] font-medium leading-[24px] text-white">Next</span>
            </button>
          </div>

          <div className="flex flex-col gap-[12px] w-full max-w-[420px] mt-[24px]">
            {formState !== 'email_err' && (
              <p className="text-[14px] leading-[21px] text-center text-[#6e6e6e]" style={{ fontFamily: 'Noto Sans, sans-serif' }}>
                Already have an account?{' '}
                <span
                  className="text-[#005eb8] underline cursor-pointer"
                  onClick={() => navigate('/')}
                >
                  Log in
                </span>
              </p>
            )}
            <p className="text-[14px] leading-[21px] text-center text-[#6e6e6e]" style={{ fontFamily: 'Noto Sans, sans-serif' }}>
              If you&#39;re experiencing login issues, please contact us at{' '}
              <a href="mailto:help@uoi.com.sg" className="text-[#005eb8] underline">help@uoi.com.sg</a>.
            </p>
          </div>
        </div>

        <div className="hidden md:block md:flex-1 relative">
          <img
            src={HERO_URL}
            alt="Travel lifestyle"
            className="absolute inset-0 w-full h-full object-cover"
          />
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
