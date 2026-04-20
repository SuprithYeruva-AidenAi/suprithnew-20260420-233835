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

function MailIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
      <polyline points="22,6 12,13 2,6" />
    </svg>
  )
}

export default function ForgotPassword() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')

  const handleSendEmail = () => {
    navigate('/login?reset=sent')
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
                <span className="text-[14px] leading-[21px] text-[#6e6e6e]" style={{ fontFamily: 'Noto Sans, sans-serif' }}>Back</span>
              </button>
            </div>

            <div className="flex flex-col items-center gap-[12px] w-full">
              <img src={LOGO} alt="UOI Logo" className="w-[100px] h-[50px] object-contain" />
              <p className="text-[32px] font-bold leading-[38.4px] text-center text-[#212121]" style={{ fontFamily: 'Noto Sans, sans-serif' }}>
                Forgot Password
              </p>
              <p className="text-[16px] leading-[24px] text-center text-[#212121]" style={{ fontFamily: 'Noto Sans, sans-serif' }}>
                Enter your account&#39;s email address and we&#39;ll send you an email to reset password
              </p>
            </div>

            <div className="flex flex-col gap-[16px] w-full">
              <div className="flex flex-col gap-[12px] w-full">
                <div className="flex flex-row items-center gap-[4px]">
                  <MailIcon className="w-[16px] h-[21px] text-[#212121]" />
                </div>
                <input
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full h-[48px] px-[16px] py-[12px] bg-white rounded-[8px] border border-[#000000] text-[16px] leading-[24px] text-[#212121] outline-none focus:border-[#005eb8]"
                  style={{ fontFamily: 'Noto Sans, sans-serif' }}
                />
              </div>
            </div>

            <button
              onClick={handleSendEmail}
              className="flex flex-row items-center justify-center px-[40px] py-[14px] gap-[10px] bg-[#005eb8] rounded-[8px] cursor-pointer hover:opacity-90 transition-opacity"
            >
              <span className="text-[16px] font-medium leading-[24px] text-white" style={{ fontFamily: 'Noto Sans, sans-serif' }}>Send Email</span>
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
