import { authClient } from "@/lib/auth";
import { Navigate, Outlet } from "react-router";

export function PublicRoute() {
  const { data: session, isPending } = authClient.useSession();

  // Mantenemos la pantalla de carga "Premium" para consistencia total
  if (isPending) {
    return (
      <div className="relative min-h-screen w-full flex items-center justify-center bg-slate-50 overflow-hidden">
        {/* Decoración de fondo (Blobs de color) */}
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-100/50 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-indigo-200/30 rounded-full blur-[120px]" />

        <div className="relative z-10 flex flex-col items-center px-6 text-center">
          {/* Logo Animado */}
          <div className="mb-8 relative">
            <div className="w-16 h-16 bg-white rounded-2xl shadow-xl flex items-center justify-center border border-slate-100">
              <div className="w-8 h-8 bg-indigo-600 rounded-lg animate-bounce" />
            </div>
            <div className="absolute inset-0 bg-indigo-500/20 blur-xl rounded-full -z-10 animate-pulse" />
          </div>

          {/* Texto de carga adaptado a contexto público */}
          <h2 className="text-xl font-bold text-slate-900 mb-2">Verificando acceso</h2>
          <p className="text-slate-500 text-sm mb-6 max-w-[250px]">
            Un momento por favor, estamos configurando tu entorno seguro.
          </p>

          {/* Barra de progreso cinética */}
          <div className="w-64 h-1.5 bg-slate-200 rounded-full overflow-hidden">
            <div className="h-full bg-indigo-600 rounded-full w-full origin-left animate-[loading-bar_1.5s_infinite_ease-in-out]"></div>
          </div>
          
          <span className="mt-4 text-[10px] uppercase tracking-[0.2em] text-slate-400 font-bold">
            Cargando interfaz
          </span>
        </div>

        {/* Animación personalizada para la barra */}
        <style dangerouslySetInnerHTML={{ __html: `
          @keyframes loading-bar {
            0% { transform: scaleX(0); transform-origin: left; }
            45% { transform: scaleX(1); transform-origin: left; }
            50% { transform: scaleX(1); transform-origin: right; }
            100% { transform: scaleX(0); transform-origin: right; }
          }
        `}} />
      </div>
    );
  }

  // Si ya hay sesión, lo enviamos al panel
  if (session) {
    return <Navigate to="/panel" replace />;
  }

  // Si no hay sesión, permitimos ver las rutas públicas (Login/Register)
  return <Outlet />;
}