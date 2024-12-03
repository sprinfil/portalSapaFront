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
import { storeTramite } from "@/lib/TramiteService"
import { useState } from "react"
import { useToast } from "@/hooks/use-toast"
import { ToastAction } from "@radix-ui/react-toast"
import { Loader } from "./Loader"
import { useNavigate } from "react-router-dom"
const formSchema = z.object({
  uso_de_suelo_actual: z.enum(["habitacional", "comercial", "industrial", "turistico"], {
    required_error: "Selecciona un tipo de contrato",
  }),
  tipo_de_calle: z.enum(["tierra", "empedrado", "concreto", "asfalto"], {
    required_error: "Selecciona un tipo de contrato",
  }),
  instalaciones_existentes: z.enum(["ninguna", "cuadro", "cajaNegra", "otro"], {
    required_error: "Selecciona un tipo de instalacion existente",
  }),
  regimen_de_condominios: z.boolean({
    required_error: "Escoge una opcion",
  }),
})

export function DatosAdicionalesForm({ api, setProgress, disabled, defaultValues, tramite,
  setTramite }) {
  const [loading, setLoading] = useState(false);

  const { toast } = useToast();
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      ...defaultValues,
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {

    let tramiteTemp =
    {
      ...tramite,
      ...values
    }

    setTramite(tramiteTemp);

    try {
      const { tramiteId } = await storeTramite(setLoading, tramiteTemp, setTramite);
      navigate(`/factibilidadDashboard/verFactibilidad?tramiteId=${tramiteId}`);
    }
    catch (e) {
      toast({ title: "Error", description: "Algo salió mal", variant: "destructive", action: <ToastAction altText="Aceptar">Aceptar</ToastAction> })
    }
    api.scrollNext();
    setProgress(100);
  }


  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className={`space-y-2 flex flex-col ${disabled ? "pointer-events-none select-none" : ""}`}>
        <div className="flex gap-10 flex-wrap mb-[100px]">
          <FormField
            control={form.control}
            name="uso_de_suelo_actual"
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
                        <RadioGroupItem value="habitacional" />
                      </FormControl>
                      <FormLabel className="font-normal">
                        Habitacional
                      </FormLabel>
                    </FormItem>

                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="comercial" />
                      </FormControl>
                      <FormLabel className="font-normal">
                        Comercial
                      </FormLabel>
                    </FormItem>

                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="industrial" />
                      </FormControl>
                      <FormLabel className="font-normal">
                        Industrial
                      </FormLabel>
                    </FormItem>


                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="turistico" />
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
            name="tipo_de_calle"
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
                        <RadioGroupItem value="tierra" />
                      </FormControl>
                      <FormLabel className="font-normal">
                        Tierra
                      </FormLabel>
                    </FormItem>

                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="empedrado" />
                      </FormControl>
                      <FormLabel className="font-normal">
                        Empedrado
                      </FormLabel>
                    </FormItem>

                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="concreto" />
                      </FormControl>
                      <FormLabel className="font-normal">
                        Concreto
                      </FormLabel>
                    </FormItem>


                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="asfalto" />
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
                        <RadioGroupItem value="ninguna" />
                      </FormControl>
                      <FormLabel className="font-normal">
                        Ninguna
                      </FormLabel>
                    </FormItem>

                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="cuadro" />
                      </FormControl>
                      <FormLabel className="font-normal">
                        Cuadro
                      </FormLabel>
                    </FormItem>

                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="cajaNegra" />
                      </FormControl>
                      <FormLabel className="font-normal">
                        Caja negra
                      </FormLabel>
                    </FormItem>


                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="otro" />
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
            name="regimen_de_condominios"
            render={({ field }) => (
              <FormItem className="">
                <FormLabel>Regimen en condominio</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={(value) => field.onChange(value === "true")}
                    value={field.value ? "true" : "false"}
                    className="flex flex-col space-y-1"
                  >
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="true" />
                      </FormControl>
                      <FormLabel className="font-normal">
                        Si
                      </FormLabel>
                    </FormItem>

                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="false" />
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


        {
          disabled != true ?
            <>
              <div className="grid md:grid-cols-2 grid-cols-1 gap-4">
                <div className="w-full md:w-[200px] cursor-pointer  border rounded-md py-2 text-center flex items-center justify-center" onClick={() => api.scrollPrev()}><FaArrowLeft className="mr-5" /> <p>Volver</p></div>

                <Button disabled={loading} type="submit" className="ml-auto w-full md:w-[200px]">
                  Finalizar y guardar<FaArrowRight />
                </Button>
                {
                  loading ?
                    <><Loader /></>
                    :
                    <></>
                }
              </div>
            </> : <></>
        }
      </form>
    </Form>
  )
}
