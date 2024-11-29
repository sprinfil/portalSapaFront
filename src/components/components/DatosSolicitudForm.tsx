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

const formSchema = z.object({
  tipo_contrato: z.enum(["1", "2"], {
    required_error: "Selecciona un tipo de contrato",
  }),

  localidad: z.string().min(2, {
    message: "Selecciona una localidad",
  }),

  modalidad: z.enum(["nuevo", "regularizacion"], {
    required_error: "Selecciona una modalidad",
  }),

  giro_comercial: z.string().min(2, {
    message: "Selecciona un giro comerical",
  }),

})

export function DatosSolicitudForm({ api, setProgress }) {

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      localidad: "",
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {

    console.log(values)

    api.scrollNext();
    setProgress(16);
  }


  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2 flex flex-col">

        <FormField
          control={form.control}
          name="tipo_contrato"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel>Tipo de contrato</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex flex-col space-y-1"
                >
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="1" />
                    </FormControl>
                    <FormLabel className="font-normal">
                      Doméstico, Comercial Industrial con infraestructura existente
                    </FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="2" />
                    </FormControl>
                    <FormLabel className="font-normal">
                      Comercial, Industrial, y desarrollo habitacional para infraestructura nueva
                    </FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />


        <FormField
          control={form.control}
          name="localidad"
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
          name="modalidad"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel>Modalidad</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex flex-col space-y-1"
                >
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="nuevo" />
                    </FormControl>
                    <FormLabel className="font-normal">
                      Nuevo
                    </FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="regularizacion" />
                    </FormControl>
                    <FormLabel className="font-normal">
                      Regularizacion
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

        <FormField
          control={form.control}
          name="giro_comercial"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Giro comercial</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona un giro comercial" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="restaurante">Restaurante</SelectItem>
                  <SelectItem value="hoteles">Hoteles</SelectItem>
                  <SelectItem value="tecnologia">Tecnologia</SelectItem>
                </SelectContent>
              </Select>
              <FormDescription>

              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="grid md:grid-cols-2 grid-cols-1 gap-4">
          <div className="w-full md:w-[200px] cursor-pointer  border rounded-md py-2 text-center flex items-center justify-center opacity-55" onClick={() => api.scrollPrev()}><FaArrowLeft className="mr-5" /> <p>Volver</p></div>
          <Button type="submit" className="ml-auto w-full md:w-[200px]">Siguiente paso<FaArrowRight /></Button>
        </div>
      </form>
    </Form>
  )
}
