import LoginForm from "@/components/forms/loginForm"
import { AnimatedThemeToggler } from "@/components/ui/animated-theme-toggler"
import Image from "next/image"

const Login = () => {
  return (
    <main className="w-[80%] m-[0_auto] min-h-[87vh] flex justify-center items-center">
      <LoginForm />
    </main>
  )
}

export default Login