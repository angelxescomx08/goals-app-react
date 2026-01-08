import { Navigate, Outlet } from "react-router";
import { authClient } from "@/lib/auth";
import { MainLayout } from "@/components/MainLayout";

export function PrivateRoute() {
  const { data: session, isPending } = authClient.useSession();

  if (isPending) {
    return (
      <div className="relative min-h-screen w-full flex items-center justify-center bg-slate-50 overflow-hidden">
        {/* Decoración de fondo: Círculos con desenfoque para dar profundidad */}
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-100/50 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-indigo-200/30 rounded-full blur-[120px]" />

        <div className="relative z-10 flex flex-col items-center px-6 text-center">
          {/* Logo o Icono de Marca Placeholder */}
          <div className="mb-8 relative">
            <div className="w-16 h-16 bg-white rounded-2xl shadow-xl flex items-center justify-center border border-slate-100">
               {/* Un pequeño detalle visual simulando un logo */}
              <div className="w-8 h-8 bg-indigo-600 rounded-lg animate-bounce" />
            </div>
            {/* Anillo de brillo alrededor del logo */}
            <div className="absolute inset-0 bg-indigo-500/20 blur-xl rounded-full -z-10 animate-pulse" />
          </div>

          {/* Texto de carga */}
          <h2 className="text-xl font-bold text-slate-900 mb-2">Preparando tu espacio</h2>
          <p className="text-slate-500 text-sm mb-6 max-w-[250px]">
            Estamos verificando tu cuenta para brindarte la mejor experiencia.
          </p>

          {/* Barra de progreso elegante */}
          <div className="w-64 h-1.5 bg-slate-200 rounded-full overflow-hidden">
            <div className="h-full bg-indigo-600 rounded-full w-full origin-left animate-[loading-bar_1.5s_infinite_ease-in-out]"></div>
          </div>
          
          <span className="mt-4 text-[10px] uppercase tracking-[0.2em] text-slate-400 font-bold">
            Autenticando
          </span>
        </div>

        {/* Estilo personalizado para la animación de la barra directamente con Tailwind (vía arbitraria) */}
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

  if (!session) {
    return <Navigate to="/auth/login" replace />;
  }

  return (
    <MainLayout>
      <Outlet />
    </MainLayout>
  );
}