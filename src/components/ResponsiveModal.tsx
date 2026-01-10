// components/ui/responsive-modal.tsx
import * as React from "react"
import { useMediaQuery } from "@/hooks/useMediaQuery"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import { Button } from "@/components/ui/button"

interface ResponsiveModalProps {
  children: React.ReactNode
  trigger: React.ReactNode
  title: string
  description?: string
  open?: boolean
  onOpenChange?: (open: boolean) => void
}

export function ResponsiveModal({
  children,
  trigger,
  title,
  description,
  open,
  onOpenChange,
}: ResponsiveModalProps) {
  const isDesktop = useMediaQuery("(min-width: 768px)")

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogTrigger asChild>{trigger}</DialogTrigger>
        <DialogContent className="sm:max-w-[425px] rounded-2xl border-slate-100 shadow-2xl p-8">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-slate-900 tracking-tight">
              {title}
            </DialogTitle>
            {description && (
              <DialogDescription className="text-slate-500">
                {description}
              </DialogDescription>
            )}
          </DialogHeader>
          {children}
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerTrigger asChild>{trigger}</DrawerTrigger>
      <DrawerContent className="rounded-t-[2.5rem] border-none shadow-2xl">
        <div className="mx-auto mt-4 h-1.5 w-12 rounded-full bg-slate-200" />
        <DrawerHeader className="text-left px-6 pt-6">
          <DrawerTitle className="text-2xl font-bold text-slate-900">
            {title}
          </DrawerTitle>
          {description && (
            <DrawerDescription className="text-slate-500 text-base">
              {description}
            </DrawerDescription>
          )}
        </DrawerHeader>
        <div className="px-2">{children}</div>
        <DrawerFooter className="px-6 pt-2 pb-10">
          <DrawerClose asChild>
            <Button variant="ghost" className="text-slate-500 font-semibold hover:bg-slate-50">
              Cancelar
            </Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}