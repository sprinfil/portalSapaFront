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
import { FiPlusCircle } from "react-icons/fi";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "../ui/textarea";
import { useRef, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { storeEntregable } from "@/lib/EntregableService";
import { ToastAction } from "@radix-ui/react-toast";
import { Loader } from "./Loader";


const formSchema = z.object({
  nombre: z.string().min(2, {
    message: "El nombre es requerido",
  }),
  descripcion: z.string().optional().nullable(),

  tipo: z.string().min(2, {
    message: "El tipo es requerido",
  }),
})


export function ModalCrearRequisitoExtra({ tramiteId }) {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const buttonCancelarRef = useRef();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    let valuesTemp =
    {
      ...values,
      id_tramite: tramiteId
    };
    console.log(valuesTemp)
    try {
      await storeEntregable(setLoading, valuesTemp);
      buttonCancelarRef.current.click();
    } catch (e) {
      toast({
        title: "Error",
        description: "Ocurrió un error creando la inspección",
        action: <ToastAction altText="Aceptar">Aceptar</ToastAction>,
        variant: "destructive",
      })
    }

  }


  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button className='ml-auto'>Agregar Requisito<FiPlusCircle /></Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Agregar requisito</AlertDialogTitle>
          <AlertDialogDescription>

          </AlertDialogDescription>
        </AlertDialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="nombre"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Requisito extra</FormLabel>
                  <FormControl>
                    <Input placeholder="Nombre" {...field} />
                  </FormControl>
                  <FormDescription>

                  </FormDescription>
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
                      <SelectItem value="texto">Texto</SelectItem>
                      <SelectItem value="archivo">Archivo</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormDescription>

                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="descripcion"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Desciprcion</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder='Descripcion'
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>

                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <AlertDialogFooter>
              <AlertDialogCancel ref={buttonCancelarRef}>Cancel</AlertDialogCancel>
              <Button type="submit"
                disabled={loading}
              >
                {loading && <Loader />}
                Aceptar</Button>
            </AlertDialogFooter>
          </form>
        </Form>

      </AlertDialogContent>
    </AlertDialog>
  )
}
