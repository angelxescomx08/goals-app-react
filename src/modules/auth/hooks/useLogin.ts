import { zodResolver } from "@hookform/resolvers/zod"
import { useState } from "react"
import { flushSync } from "react-dom"
import { useForm } from "react-hook-form"
import { type LoginSchema, loginSchema } from "@/modules/auth/schemas/authSchema"
import { authClient } from "@/lib/auth"

export const useLogin = () => {
  const [isGoogleLoading, setIsGoogleLoading] = useState(false)

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
    flushSync(() => setIsGoogleLoading(true))
    return await authClient.signIn.social({
      provider: "google",
      callbackURL: import.meta.env.VITE_URL_FRONTEND,
      errorCallbackURL: import.meta.env.VITE_URL_FRONTEND + "/auth/login?error=true",
    })
  }

  return {
    form,
    handleSubmit,
    signInWithGoogle,
    isGoogleLoading,
  }
}
