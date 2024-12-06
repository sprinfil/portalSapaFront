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
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { BsPencilSquare } from "react-icons/bs";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useRef, useState } from "react"
import { storeDocumento, updateDocumento } from "@/lib/DocumentoService"
import { useToast } from "@/hooks/use-toast"
import { ToastAction } from "@radix-ui/react-toast"
import { Loader } from "./Loader"



const formSchema = z.object({
  nombre: z.string().min(2, {
    message: "El nombre debe llevar al menos 2 caracteres",
  }),
  descripcion: z.string().optional(),
  tipo: z.string().optional(),

})

export function ModalEditarDocumento({ setRequisito, documento }) {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const buttonCancelarRef = useRef();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nombre: documento?.nombre ?? "", 
      descripcion: documento?.descripcion ?? "", 
      tipo: documento?.tipo ?? "",
    },
  })
  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {

      const { newDocumento } = await updateDocumento(setLoading, values, documento?.id);

      setRequisito(prev => {
        return {
          ...prev,
          documentos: prev?.documentos?.map(documentoTemp => {
            if (documentoTemp?.id === documento?.id) {
              return newDocumento;
            } else {
              return documentoTemp;
            }
          }),
        };
      });

      buttonCancelarRef?.current?.click();
    } catch (e) {
      toast({
        title: "Error",
        description: "Ocurrio un error al crear documento",
        action: <ToastAction altText="Aceptar">Aceptar</ToastAction>,
        variant: "destructive"
      })
    }
  }


  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant={"outline"}>Editar<BsPencilSquare /></Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Editar {documento?.nombre}</AlertDialogTitle>
        </AlertDialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="nombre"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nombre</FormLabel>
                  <FormControl>
                    <Input placeholder="Nombre" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="descripcion"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Descripción</FormLabel>
                  <FormControl>
                    <Input placeholder="Descripción" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="tipo"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tipo</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecciona un tipo" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="pdf">PDF</SelectItem>
                      <SelectItem value="imagen">Imagen</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <AlertDialogFooter>
              <AlertDialogCancel ref={buttonCancelarRef} >Cancel</AlertDialogCancel>
              <Button
                type="submit"
                disabled={loading}
              >
                {loading && <Loader />}
                Aceptar y guardar</Button>
            </AlertDialogFooter>
          </form>

        </Form>

      </AlertDialogContent>
    </AlertDialog>
  )
}
