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
import { IoSend } from "react-icons/io5";
import { Input } from "../ui/input";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { ToastAction } from "@radix-ui/react-toast";
import { mandarCorreoRecuperacion } from "@/lib/AuthService";
import { Loader } from "./Loader";
export function ModalRecuperarContraseña() {

  const { toast } = useToast();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <p>
          <span className='text-blue-500 hover:underline cursor-pointer'>Manda un correo de recuperación</span>
        </p>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Recuperación de contraseña</AlertDialogTitle>
          <AlertDialogDescription>
            Se le mandará un correo para reestablecer su contraseña
          </AlertDialogDescription>
        </AlertDialogHeader>
        <Input onChange={e => setEmail(e.currentTarget.value)} type="email" placeholder="Correo"></Input>
        <AlertDialogFooter>
          <AlertDialogCancel
            onClick={() => setEmail("")}
          >Cancelar
          </AlertDialogCancel>

          {
            email != "" ?
              <>
                <Button
                  disabled={loading}
                  onClick={async () => {
                    try {
                      await mandarCorreoRecuperacion(setLoading, email);
                      toast({
                        title: "Correo enviado",
                        description: "Revisa tu bandeja de entrada",
                        action: <ToastAction altText="Aceptar">Aceptar</ToastAction>
                      })
                    } catch (e) {
                      toast({
                        title: "Error",
                        variant:"destructive",
                        description: "Este correo no esta en la base de datos",
                        action: <ToastAction altText="aceptar">Aceptar</ToastAction>
                      })
                    }
                  }}
                >
                  {
                    loading ? <Loader /> : <></>
                  }
                  Enviar<IoSend />
                </Button>
              </>
              :
              <></>
          }
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
