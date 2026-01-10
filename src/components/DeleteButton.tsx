import { Loader2Icon, TrashIcon, XIcon } from "lucide-react"
import { ResponsiveModal } from "./ResponsiveModal"
import { Button } from "./ui/button"

type Props = {
  title: string;
  description: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onDelete: () => void;
  isLoading: boolean;
}

export const DeleteButton = ({ 
  title, description, open, onOpenChange, onDelete, isLoading 
}: Props) => {

  const trigger = (
    <Button variant="destructive" className="bg-red-600 hover:bg-red-700 text-white shadow-lg shadow-red-100 h-11 px-6 rounded-xl font-bold transition-all active:scale-95">
      <TrashIcon className="w-5 h-5 mr-2" />
      {title}
    </Button>
  )

  return (
    <ResponsiveModal
      trigger={trigger}
      title={title}
      description={description}
      open={open}
      onOpenChange={onOpenChange}
    >
      <div className="flex items-center justify-center gap-2">
        <Button variant="outline" className="bg-slate-600 hover:bg-slate-700 text-white hover:text-white shadow-lg shadow-slate-100 h-11 px-6 rounded-xl font-bold transition-all active:scale-95"
        onClick={() => onOpenChange(false)}
        disabled={isLoading}
        >
          <XIcon className="w-5 h-5 mr-2" />
          Cancelar
        </Button>
        <Button 
          variant="destructive" 
          className="bg-red-600 hover:bg-red-700 text-white shadow-lg shadow-red-100 h-11 px-6 rounded-xl font-bold transition-all active:scale-95" 
          onClick={onDelete} 
          disabled={isLoading}>
          {
            isLoading ? (
              <div className="flex items-center gap-2">
                <Loader2Icon className="w-5 h-5 animate-spin" />
                <span>Eliminando...</span>
              </div>
            ) : (
              <>
                <TrashIcon className="w-5 h-5 mr-2" />
                {title}
              </>
            )
          }
        </Button>
      </div>
    </ResponsiveModal>
  )
}
