import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { LoginSchema, loginSchema } from "../schemas/authSchema"
import { authClient } from "@/lib/auth"

export const useLogin = () => {

  const form = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  const handleSubmit = async (data: LoginSchema) => {
    return await authClient.signIn.email({
      email: data.email,
      password: data.password,
      callbackURL: "/panel",
    })
  }

  const signInWithGoogle = async () => {
    return await authClient.signIn.social({
      provider: "google",
      callbackURL: "/panel",
      errorCallbackURL: "/auth/login?error=true",
    })
  }

  return {
    form,
    handleSubmit,
    signInWithGoogle,
  }
}
