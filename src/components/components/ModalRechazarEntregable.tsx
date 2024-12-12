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
import { useRef, useState } from "react"
import { Loader } from "./Loader";
import { useToast } from "@/hooks/use-toast";
import { rechazarArchivo, subirArchivo } from "@/lib/ArhcivoService";
import { ToastAction } from "@radix-ui/react-toast";

export function ModalRechazarEntregable({ setRequisitos, entregableId }) {

  const cancelarButtonRef = useRef();
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant={"outline"} className="text-red-500">Rechazar</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>¿Rechazar?</AlertDialogTitle>
          <AlertDialogDescription>

          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel ref={cancelarButtonRef}>Cancel</AlertDialogCancel>
          <Button
            disabled={loading}
            onClick={async () => {
              try {
                const { data } = await rechazarArchivo(setLoading, entregableId);

                setRequisitos(prev => {
                  return prev?.map(requisito => ({
                    ...requisito,
                    documentos: requisito.documentos?.map(documento => ({
                      ...documento,
                      entregables: documento.entregables?.map(entregable => {
                        if (entregable.id === entregableId) {
                          return data;
                        }
                        return entregable;
                      })
                    }))
                  }));
                });

                cancelarButtonRef.current.click();

              }
              catch (e) {
                toast({
                  title: "Error",
                  description: "Ocurrió un error al rechazar",
                  action: <ToastAction altText="Aceptar">Aceptar</ToastAction>,
                  variant: "destructive",
                })
              }
            }}
          >
            {loading && <Loader />}
            Aceptar</Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
