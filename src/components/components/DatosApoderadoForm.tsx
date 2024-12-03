"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Input } from "@/components/ui/input"
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import ZustandPrincipal from "@/Zustand/ZustandPrincipal"

const formSchema = z.object({
  apoderado_nombre: z.string().min(2, {
    message: "El nombre es obligatorio",
  }),
  apoderado_domicilio: z.string().min(2, {
    message: "el domicilio es obligatorio",
  }),
  apoderado_localidad: z.string().min(2, {
    message: "la localidad es obligatoria",
  }),
  apoderado_correo_electronico: z.string().min(2, {
    message: "el correo es obligatorio"
  }),
  apoderado_codigo_postal: z.string().min(2, {
    message: "el codigo postal es obligatorio"
  }),
  apoderado_telefono_fijo: z.preprocess(
    (value) => (value === "" ? undefined : value),
    z.string().min(10, { message: "El teléfono fijo debe tener al menos 10 dígitos" })
  ),
  apoderado_telefono_movil: z.preprocess(
    (value) => (value === "" ? undefined : value),
    z.string().min(10, { message: "El teléfono móvil debe tener al menos 10 dígitos" })
  ),
  apoderado_tipo_representante: z.enum(["representante", "apoderado"], {
    required_error: "Selecciona una opción",
  }),
})

export function DatosApoderadoForm({ api, setProgress, disabled, defaultValues, tramite,
  setTramite }) {

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      ...defaultValues
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    let tramiteTemp =
    {
      ...tramite,
      ...values
    }

    setTramite(tramiteTemp);

    api.scrollNext();
    setProgress(52);
  }


  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className={`space-y-2 flex flex-col ${disabled ? "pointer-events-none select-none" : ""}`}>

        <FormField
          control={form.control}
          name="apoderado_nombre"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nombre completo</FormLabel>
              <FormControl>
                <Input className="w-full" placeholder="nombre completo ..." {...field} />
              </FormControl>
              <FormDescription>

              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="apoderado_domicilio"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Domicilio</FormLabel>
              <FormControl>
                <Input placeholder="domicilio ..." {...field} />
              </FormControl>
              <FormDescription>

              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="apoderado_localidad"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Localidad</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona una localidad" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="lapaz">La Paz</SelectItem>
                  <SelectItem value="barriles">Los Barriles</SelectItem>
                  <SelectItem value="bvuenavista">Buena Vista</SelectItem>
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
          name="apoderado_correo_electronico"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Correo</FormLabel>
              <FormControl>
                <Input type="email" placeholder="correo ..." {...field} />
              </FormControl>
              <FormDescription>

              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid md:grid-cols-3 grid-cols-1 gap-4">
          <FormField
            control={form.control}
            name="apoderado_codigo_postal"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Código postal</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="Código postal..." {...field} />
                </FormControl>
                <FormDescription>

                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="apoderado_telefono_fijo"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tel. fijo</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="Tel. fijo..." {...field} />
                </FormControl>
                <FormDescription>

                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="apoderado_telefono_movil"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tel. móvil</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="Tel. móvil..." {...field} />
                </FormControl>
                <FormDescription>

                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="apoderado_tipo_representante"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel>En calidad de ...</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex flex-col space-y-1"
                >
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="representante" />
                    </FormControl>
                    <FormLabel className="font-normal">
                      Representante
                    </FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="apoderado" />
                    </FormControl>
                    <FormLabel className="font-normal">
                      Apoderado
                    </FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormControl>
              <FormDescription>

              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />


        {
          disabled != true ?
            <>
              <div className="grid md:grid-cols-2 grid-cols-1 gap-4">
                <div className="w-full md:w-[200px] cursor-pointer  border rounded-md py-2 text-center flex items-center justify-center" onClick={() => api.scrollPrev()}><FaArrowLeft className="mr-5" /> <p>Volver</p></div>
                <Button type="submit" className="ml-auto w-full md:w-[200px]">Siguiente paso<FaArrowRight /></Button>
              </div>
            </> : <></>
        }

      </form>
    </Form>
  )
}
