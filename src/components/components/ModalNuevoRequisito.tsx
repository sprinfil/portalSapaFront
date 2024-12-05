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
import { PlusCircle } from "lucide-react"
import { useRef, useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { storeRequisitoCatalogo } from "@/lib/RequisitoService"
import { useToast } from "@/hooks/use-toast"
import { ToastAction } from "@radix-ui/react-toast"
import { Loader } from "./Loader"
import { useNavigate } from "react-router-dom"



export function ModalNuevoRequisito() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const formSchema = z.object({
    nombre: z.string().min(2, {
      message: "El requisito debe tener al menos 2 caracteres",
    }),
  })

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nombre: "",
    },
  })
  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {

      const { id } = await storeRequisitoCatalogo(setLoading, values);
      navigate(`/verRequisito?requisitoId=${id}`)

    } catch (e) {
      toast({
        title: "Error",
        description: "Ocurrio un error al crear el requisito",
        variant: "destructive",
        action: <ToastAction altText="Aceptar">Aceptar</ToastAction>
      })
    }
  }

  const buttonCancelarRef = useRef();
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button className="md:ml-auto md:w-[200px] w-full">
          Agregar Requisito
          <PlusCircle />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Nuevo requisito</AlertDialogTitle>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="nombre"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nombre</FormLabel>
                    <FormControl>
                      <Input placeholder="nombre" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="w-full flex gap-3 justify-end">
                <AlertDialogCancel ref={buttonCancelarRef}>Cancel</AlertDialogCancel>
                <Button type="submit"
                  disabled={loading}
                >
                  {loading && <Loader />}
                  Aceptar
                </Button>
              </div>
            </form>
          </Form>
        </AlertDialogHeader>
        <AlertDialogFooter>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
