import LoginForm from '../components/LoginForm';

const Login = () => {
  return (
    <div className=" flex flex-col md:flex-row h-screen w-full items-center gap-20 bg-[#D2C1A1]">
      {/* Left Section */}
      <div className="relative flex flex-col h-screen w-full md:w-1/2 justify-between align-middle overflow-hidden">
        <div className="text-[#fafafa] w-full absolute mix-blend-difference flex flex-col h-full justify-center items-center z-10 leading-none -mt-10 px-4">
          <p className="text-center font-[ky] text-3xl">Welcome to</p>
          <span className="font-[ky] text-[4.5rem]">KASHIYATRA</span>
        </div>
        <img
          src= "https://kashiyatra.s3.eu-north-1.amazonaws.com/login.webp"
          alt="Welcome"
          className="object-cover w-full h-full md:h-screen"
        />
        {/* Login form for small screens */}
        <div className="absolute min-w-[320px] top-1/2 -translate-y-1/2 
        left-1/2 -translate-x-1/2 flex items-center justify-center md:hidden bg-[rgba(210,193,161,0.6)] z-10 p-4 rounded-2xl">
          <LoginForm isMobile={true} />
        </div>
      </div>

      {/* Login form for larger screens */}
      <div className="hidden md:flex h-full md:h-5/6 align-middle w-2/5 items-center justify-center bg-[#D2C1A1]">
        <LoginForm isMobile={false} />
      </div>
    </div>
  )
}

export default Login
