import RegisterForm from "@/components/forms/registerForm"
import { AnimatedThemeToggler } from "@/components/ui/animated-theme-toggler"
import Image from "next/image"

const Register = () => {
  return (
    <main className="w-[80%] m-[0_auto] min-h-[87vh] flex justify-center items-center">
      <RegisterForm />
    </main>
  )
}

export default Register