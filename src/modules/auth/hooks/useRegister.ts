import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { registerSchema, RegisterSchema } from "../schemas/authSchema"
import { authClient } from "@/lib/auth"

export const useRegister = () => {

  const form = useForm<RegisterSchema>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  })

  const signInWithGoogle = async () => {
    return await authClient.signIn.social({
      provider: "google",
      callbackURL: "/panel",
      errorCallbackURL: "/auth/login?error=true",
    })
  }

  const handleSubmit = async (data: RegisterSchema) => {
    return await authClient.signUp.email({
      email: data.email,
      password: data.password,
      name: data.name,
      callbackURL: "/panel",
    })
  }

  return {
    form,
    signInWithGoogle,
    handleSubmit,
  }
}
