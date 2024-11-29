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
  calle: z.string().min(2, {
    message: "la calle es obligatoria",
  }),
  numero: z.string().min(2, {
    message: "el numero es obligatorio",
  }),
  entre_calles: z.string().min(2, {
    message: "este campo es obligatorio",
  }),
  colonia: z.string().min(2, {
    message: "la colonia es obligatoria",
  }),
  clave_catastral: z.string().min(2, {
    message: "la clave catastral es obligatoria",
  }),
  codigo_postal: z.string().min(2, {
    message: "El codigo postal es obligatorio",
  }),

  localidad: z.string().min(2, {
    message: "Selecciona una localidad",
  }),
})

export function DatosPredioForm({ api, setProgress }) {

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {

    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {

    console.log(values)

    api.scrollNext();
    setProgress(83);
  }


  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2 flex flex-col">

        <div className="grid md:grid-cols-2 grid-cols-1 gap-4">
          <FormField
            control={form.control}
            name="calle"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Calle</FormLabel>
                <FormControl>
                  <Input className="w-full" placeholder="Calle ..." {...field} />
                </FormControl>
                <FormDescription>

                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="numero"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Número</FormLabel>
                <FormControl>
                  <Input type="number" className="w-full" placeholder="número ..." {...field} />
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
          name="entre_calles"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Entre calles</FormLabel>
              <FormControl>
                <Input className="w-full" placeholder="Entre calles ..." {...field} />
              </FormControl>
              <FormDescription>

              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="colonia"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Colonia</FormLabel>
              <FormControl>
                <Input className="w-full" placeholder="colonia ..." {...field} />
              </FormControl>
              <FormDescription>

              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="clave_catastral"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Clave catastral</FormLabel>
              <FormControl>
                <Input className="w-full" placeholder="Clave catastral ..." {...field} />
              </FormControl>
              <FormDescription>

              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="grid md:grid-cols-2 grid-cols-1 gap-4">
          <FormField
            control={form.control}
            name="codigo_postal"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Código postal</FormLabel>
                <FormControl>
                  <Input type="number" className="w-full" placeholder="código postal ..." {...field} />
                </FormControl>
                <FormDescription>

                </FormDescription>
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
        </div>
        <div className="grid md:grid-cols-2 grid-cols-1 gap-4">
          <div className="w-full md:w-[200px] cursor-pointer  border rounded-md py-2 text-center flex items-center justify-center" onClick={() => api.scrollPrev()}><FaArrowLeft className="mr-5" /> <p>Volver</p></div>
          <Button type="submit" className="ml-auto w-full md:w-[200px]">Siguiente paso<FaArrowRight /></Button>
        </div>
      </form>
    </Form>
  )
}
