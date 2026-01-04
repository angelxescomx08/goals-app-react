import { authClient } from "@/lib/auth";
import { Navigate, Outlet } from "react-router";

export function PublicRoute() {
  const { data: session, isPending } = authClient.useSession();

  if (isPending) return <p>Cargando...</p>;

  if (session) {
    return <Navigate to="/panel" replace />;
  }

  return <Outlet />;
}
