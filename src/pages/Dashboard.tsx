import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

export default function Dashboard() {
  const navigate = useNavigate()

  const handleSingpass = () => {
    navigate('/login')
  }

  const handleNRIC = () => {
    navigate('/login')
  }

  return (
    <div
      className="min-h-screen w-full flex flex-col md:flex-row font-[Noto_Sans]"
      style={{
        background: 'linear-gradient(to bottom, rgba(0,94,184,0.07) 0%, rgba(92,85,235,0.07) 73%), #ffffff',
      }}
    >
      {/* Left panel — login card area */}
      <div
        className="flex-1 flex flex-col items-center justify-center py-[24px] px-[16px] md:py-[40px] md:px-[40px] min-h-screen md:min-h-0"
        style={{
          background: 'linear-gradient(to bottom, rgba(0,94,184,0.07) 0%, rgba(92,85,235,0.07) 73%), #ffffff',
        }}
      >
        {/* Login Card */}
        <div
          className="w-full max-w-[420px] flex flex-col items-center gap-[32px] p-[32px] rounded-[24px]"
          style={{
            background: 'radial-gradient(circle, rgba(255,255,255,0.56) 0%, rgba(255,255,255,0.08) 100%), rgba(255,255,255,0.70)',
            boxShadow: '0px 1px 4px 0px rgba(0,0,0,0.05)',
          }}
        >
          {/* Logo + heading + subtext */}
          <div className="flex flex-col items-center gap-[12px] w-full">
            <img
              src="https://s3-alpha-sig.figma.com/img/26ec/3ab4/0588c7482da725dcdeb68b2897f9bde2?Expires=1777852800&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=ShoM0pDLFtIglvPWeRLcrNHkP-8DajZ~UfTydATZnIyvxRx0Q8vNaKu-xBitsol0veqqwq1r4p1azXwhatXwj7sKArxvuNthVWmFirx22koohe8997mFNM6GF2P9FJZQ6hnguVRCcCTWizRFgiWWnqabTviIJl1EuaMxA65dwinn4u47OVQuKOW4HPfBJ49i-x-lqHrsAbGLy9XfBAQqpYzMCSsmnWFH-jgrpSRysU3HqoilRLqyQb6LtiIX7mix4qKeTiJI50ywXWQYf5zHXGyqc7Ry5JQaJUdS88v~1e1Kd-i6t7RipipnfhyJG71UbhW-m-9vh~8Pv9t2nKWPxg__"
              alt="UOI Logo"
              className="w-[100px] h-[50px] object-contain"
            />
            <p
              className="text-[28px] md:text-[32px] font-bold leading-[1.2] text-center text-[#212121]"
              style={{ fontFamily: 'Noto Sans, sans-serif' }}
            >
              Welcome to UOI Customer Portal
            </p>
            <p
              className="text-[14px] md:text-[16px] leading-[21px] md:leading-[24px] text-center text-[#212121]"
              style={{ fontFamily: 'Noto Sans, sans-serif' }}
            >
              Manage all your policies in one portal.
            </p>
          </div>

          {/* Buttons section */}
          <div className="flex flex-col items-center gap-[24px] w-full">
            {/* Singpass button image */}
            <img
              src="https://s3-alpha-sig.figma.com/img/5066/4d16/b727ff45ca18ad961c6d3df8c1fcd1b3?Expires=1777852800&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=FjqHumJtGyZGxD-rXOUogsw~Ee7zhArPCvFgWkRj7iPylXJtIpjUblIJEcXpIrx3-yZ~InFFfJXFj0J1AEfu8FUHqPgv3QHUJhGRbc~MoPLAH7I515FGP5c6H8orlkc2IDeON6kPGJqe3TJVYUcROI7GtBfB8J~5Z~8tkHnUdAvEkGlzd7-~MJDpCW7zcbZRCGHmDVLJudLB3woye9m0NF-qCKMKLH9VIdBRLKM5vR0GqLNMkdX1fXHty5PnjsXFHGW9SgcrSZ1J~Dg2AJgwYQDlSgLAk6sqoBcqGmqBI0YnL9W4YxIT5quGUQdrmvhDg0sBJxAL7CMrx4OXyh9e0g__"
              alt="Log in with Singpass"
              className="w-[200px] h-[42px] object-contain cursor-pointer"
              onClick={handleSingpass}
            />

            {/* Or divider */}
            <div className="flex flex-row items-center justify-center gap-[16px] w-full">
              <div className="flex-1 h-px bg-[#212121] opacity-20" />
              <span
                className="text-[14px] md:text-[16px] leading-[21px] md:leading-[24px] text-center text-[#212121]"
                style={{ fontFamily: 'Noto Sans, sans-serif' }}
              >
                or
              </span>
              <div className="flex-1 h-px bg-[#212121] opacity-20" />
            </div>

            {/* NRIC/FIN button */}
            <button
              onClick={handleNRIC}
              className="flex flex-row items-center justify-center gap-[10px] w-[200px] h-[48px] md:h-[42px] bg-[#ffffff] rounded-[8px] border border-[#005eb8] cursor-pointer hover:opacity-90 transition-opacity"
              style={{ boxShadow: '0px 1px 4px 0px rgba(0,0,0,0.05)' }}
            >
              <span
                className="text-[16px] font-medium leading-[24px] text-[#005eb8]"
                style={{ fontFamily: 'Noto Sans, sans-serif' }}
              >
                Log in with NRIC/FIN
              </span>
            </button>
          </div>
        </div>

        {/* Helper text below card */}
        <div className="flex flex-col gap-[12px] w-full max-w-[420px] mt-[24px]">
          <p
            className="text-[14px] leading-[21px] text-center text-[#6e6e6e]"
            style={{ fontFamily: 'Noto Sans, sans-serif' }}
          >
            Don&#39;t have an account?{' '}
            <Link
              to="/create-account"
              className="text-[#005eb8] underline cursor-pointer"
            >
              Create an account
            </Link>
          </p>
          <p
            className="text-[14px] leading-[21px] text-center text-[#6e6e6e]"
            style={{ fontFamily: 'Noto Sans, sans-serif' }}
          >
            If you&#39;re experiencing login issues, please contact us at{' '}
            <a
              href="mailto:help@uoi.com.sg"
              className="text-[#005eb8] underline"
            >
              help@uoi.com.sg
            </a>
            .
          </p>
        </div>
      </div>

      {/* Right panel — hero image (desktop only) */}
      <div className="hidden md:block md:flex-1 relative">
        <img
          src="https://s3-alpha-sig.figma.com/img/aab6/0921/4d0afc4bf990cf584c0c3c3e94ab342d?Expires=1777852800&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=evV6xk8x8mXwhl5DIkzHg2YvXWJLdjUEE4QzPiw6skwI8IIpjBvimdVwPWI3lvrYlZLeVrGLuFRhJSyQ4GLkoIysQRqfpOJ8dmtuYTF0s9CS2fmpshgKg~eT~~cvuqARWBTTgJbpm4EKFFQe~kRYW2YGiRqEXepHLEst6q0xBDgHIiQabxEZE9VchjDafhutP34bXOqxyem451w8M82FG1pcJ~uI8MojTj-DkPpVSG9U6c-dXDkuPq2ZLzeGBzySFlIhRmWkDUzHDYlXHEUa6ro4WFSx71OMT6F2uglnWSRUKZQXRbtGsylqIereApngRcCLus72riI1Hx4ANuxYcA__"
          alt="Travel lifestyle"
          className="absolute inset-0 w-full h-full object-cover"
        />
      </div>
    </div>
  )
}
