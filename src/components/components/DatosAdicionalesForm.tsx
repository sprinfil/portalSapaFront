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
  uso_suelo: z.enum(["1", "2", "3", "4"], {
    required_error: "Selecciona un tipo de contrato",
  }),
  tipo_calle: z.enum(["1", "2", "3", "4"], {
    required_error: "Selecciona un tipo de contrato",
  }),
  instalaciones_existentes: z.enum(["1", "2", "3", "4"], {
    required_error: "Selecciona un tipo de instalacion existente",
  }),
  regimen_condominio: z.enum(["1", "2", "3", "4"], {
    required_error: "Escoge una opcion",
  })
})

export function DatosAdicionalesForm({ api, setProgress }) {

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {

    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {

    console.log(values)

    api.scrollNext();
    setProgress(100);
  }


  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2 flex flex-col">
        <div className="flex gap-10 flex-nowrap mb-[100px]">
          <FormField
            control={form.control}
            name="uso_suelo"
            render={({ field }) => (
              <FormItem className="">
                <FormLabel>Uso de suelo actual</FormLabel>
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
                        Habitacional
                      </FormLabel>
                    </FormItem>

                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="2" />
                      </FormControl>
                      <FormLabel className="font-normal">
                        Comercial
                      </FormLabel>
                    </FormItem>

                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="3" />
                      </FormControl>
                      <FormLabel className="font-normal">
                        Industrial
                      </FormLabel>
                    </FormItem>


                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="4" />
                      </FormControl>
                      <FormLabel className="font-normal">
                        Turístico
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
            name="tipo_calle"
            render={({ field }) => (
              <FormItem className="">
                <FormLabel>Tipo de calle</FormLabel>
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
                        Tierra
                      </FormLabel>
                    </FormItem>

                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="2" />
                      </FormControl>
                      <FormLabel className="font-normal">
                        Empedrado
                      </FormLabel>
                    </FormItem>

                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="3" />
                      </FormControl>
                      <FormLabel className="font-normal">
                        Concreto
                      </FormLabel>
                    </FormItem>


                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="4" />
                      </FormControl>
                      <FormLabel className="font-normal">
                        Asfalto
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
            name="instalaciones_existentes"
            render={({ field }) => (
              <FormItem className="">
                <FormLabel>Instalaciones existentes</FormLabel>
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
                        Ninguna
                      </FormLabel>
                    </FormItem>

                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="2" />
                      </FormControl>
                      <FormLabel className="font-normal">
                        Cuadro
                      </FormLabel>
                    </FormItem>

                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="3" />
                      </FormControl>
                      <FormLabel className="font-normal">
                        Caja negra
                      </FormLabel>
                    </FormItem>


                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="4" />
                      </FormControl>
                      <FormLabel className="font-normal">
                        Otro
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
            name="regimen_condominio"
            render={({ field }) => (
              <FormItem className="">
                <FormLabel>Regimen en condominio</FormLabel>
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
                        Si
                      </FormLabel>
                    </FormItem>

                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="2" />
                      </FormControl>
                      <FormLabel className="font-normal">
                        No
                      </FormLabel>
                    </FormItem>

                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>


        <div className="grid md:grid-cols-2 grid-cols-1 gap-4">
          <div className="w-full md:w-[200px] cursor-pointer  border rounded-md py-2 text-center flex items-center justify-center" onClick={() => api.scrollPrev()}><FaArrowLeft className="mr-5" /> <p>Volver</p></div>
          <Button type="submit" className="ml-auto w-full md:w-[200px]">Finalizar y guardar</Button>
        </div>

      </form>
    </Form>
  )
}
