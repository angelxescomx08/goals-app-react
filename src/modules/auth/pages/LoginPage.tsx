import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Controller } from "react-hook-form"
import { useLogin } from "../hooks/useLogin"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Link } from "react-router"

export const LoginPage = () => {

  const { form, handleSubmit, signInWithGoogle } = useLogin()

  return (
    <main className="container p-4">
      <form onSubmit={form.handleSubmit(handleSubmit)}>
        <FieldGroup>
          <Controller
            name="email"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="email">
                  Correo electrónico
                </FieldLabel>
                <Input
                  {...field}
                  id="email"
                  aria-invalid={fieldState.invalid}
                  placeholder="ejemplo@gmail.com"
                  autoComplete="off"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
          <Controller
            name="password"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="password">
                  Contraseña
                </FieldLabel>
                <Input
                  {...field}
                  id="password"
                  aria-invalid={fieldState.invalid}
                  placeholder="********"
                  autoComplete="off"
                  type="password"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
          <Button type="submit" className="w-full">Iniciar sesión</Button>
          <Button type="button" onClick={signInWithGoogle}>
            Iniciar sesión con Google <img className="w-5 h-5" src="/google.webp" alt="Google" />
          </Button>
          <Link to="/auth/register">¿No tienes una cuenta? Regístrate</Link>
        </FieldGroup>
      </form>
    </main>
  )
}
