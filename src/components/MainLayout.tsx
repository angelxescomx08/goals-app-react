import { MainHeader } from "./MainHeader"
import { Toaster } from "./ui/sonner"

type Props = {
  children: React.ReactNode
}

export const MainLayout = ({ children }: Props) => {
  return (
    <div>
      <MainHeader />
      <main className="container p-4">
        {children}
      </main>
      <Toaster />
    </div>
  )
}
