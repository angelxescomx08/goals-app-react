import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field"
import { useRegister } from "../hooks/useRegister"
import { Controller } from "react-hook-form"
import { Link } from "react-router"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export const RegisterPage = () => {
  const { form, signInWithGoogle, handleSubmit } = useRegister()

  return (
    // Contenedor principal idéntico al Login para consistencia
    <main className="min-h-screen flex items-center justify-center bg-slate-50 p-6">
      
      {/* Tarjeta de Registro */}
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl border border-slate-100 p-8 md:p-10">
        
        {/* Encabezado */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Crear cuenta</h1>
          <p className="text-slate-500 mt-2">Únete a nuestra comunidad hoy mismo</p>
        </div>

        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
          <FieldGroup className="space-y-4">
            
            {/* Campo Nombre */}
            <Controller
              name="name"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid} className="grid gap-1.5">
                  <FieldLabel htmlFor="name" className="text-sm font-medium text-slate-700">
                    Nombre
                  </FieldLabel>
                  <Input
                    {...field}
                    id="name"
                    aria-invalid={fieldState.invalid}
                    placeholder="Juan"
                    autoComplete="off"
                    className="h-11 focus-visible:ring-indigo-600 transition-all"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} className="text-xs text-red-500" />
                  )}
                </Field>
              )}
            />

            {/* Campo Email */}
            <Controller
              name="email"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid} className="grid gap-1.5">
                  <FieldLabel htmlFor="email" className="text-sm font-medium text-slate-700">
                    Correo electrónico
                  </FieldLabel>
                  <Input
                    {...field}
                    id="email"
                    aria-invalid={fieldState.invalid}
                    placeholder="ejemplo@gmail.com"
                    autoComplete="off"
                    className="h-11 focus-visible:ring-indigo-600 transition-all"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} className="text-xs text-red-500" />
                  )}
                </Field>
              )}
            />

            {/* Campo Contraseña */}
            <Controller
              name="password"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid} className="grid gap-1.5">
                  <FieldLabel htmlFor="password" dir="ltr" className="text-sm font-medium text-slate-700">
                    Contraseña
                  </FieldLabel>
                  <Input
                    {...field}
                    id="password"
                    aria-invalid={fieldState.invalid}
                    placeholder="********"
                    autoComplete="off"
                    type="password"
                    className="h-11 focus-visible:ring-indigo-600 transition-all"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} className="text-xs text-red-500" />
                  )}
                </Field>
              )}
            />
          </FieldGroup>

          {/* Acciones de Formulario */}
          <div className="space-y-4 pt-2">
            <Button 
              type="submit" 
              className="w-full h-11 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold transition-colors"
            >
              Registrarse
            </Button>

            {/* Divisor Visual */}
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-slate-200"></span>
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white px-2 text-slate-500">O regístrate con</span>
              </div>
            </div>

            <Button 
              type="button" 
              variant="outline"
              onClick={signInWithGoogle}
              className="w-full h-11 border-slate-200 hover:bg-slate-50 flex items-center justify-center gap-3 transition-all font-medium text-slate-700"
            >
              <img className="w-5 h-5" src="/google.webp" alt="Google" />
              <span>Google</span>
            </Button>
          </div>

          {/* Link para volver al Login */}
          <p className="text-center text-sm text-slate-600 mt-6">
            ¿Ya tienes una cuenta?{" "}
            <Link 
              to="/auth/login" 
              className="font-semibold text-indigo-600 hover:text-indigo-500 underline-offset-4 hover:underline transition-all"
            >
              Inicia sesión
            </Link>
          </p>
        </form>
      </div>
    </main>
  )
}