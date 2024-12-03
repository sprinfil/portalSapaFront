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
import ZustandPrincipal from "@/Zustand/ZustandPrincipal"
import { useNavigate } from "react-router-dom";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

export function ModalSolicitudPendiente({ open, setOpen }) {
  const navigate = useNavigate();

  const { tramite, setTramite } = ZustandPrincipal();

  return (
    <AlertDialog open={open} >
      <AlertDialogTrigger asChild>

      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Tienes una solicitud pendiente</AlertDialogTitle>
          <AlertDialogDescription>
            ¿Te gustaría continuar o iniciar una nueva solicitud?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel
            onClick={() => { setTramite({}); setOpen(false); }}
          >Iniciar una nueva solicitud</AlertDialogCancel>
          <AlertDialogAction
            onClick={() => { navigate("/factibilidadFormulario") }}
          >Continuar con la solicitud<FaArrowRight /></AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
