import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"

export function ModalVerArchivo({ nombre, url }) {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant={"link"}>{nombre}</Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="min-w-[90%] h-[90%] overflow-auto">
        <AlertDialogHeader>
          <AlertDialogTitle></AlertDialogTitle>
          <AlertDialogDescription>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <div className="h-[80vh]">
          <iframe
            src={url}
            title="Vista de archivo"
            style={{
              width: "100%",
              height: "100%",
              border: "none",
              borderRadius: "8px",
            }}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
        <AlertDialogFooter>
          <AlertDialogCancel>Salir</AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
