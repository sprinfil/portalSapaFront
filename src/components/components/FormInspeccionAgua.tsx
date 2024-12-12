import React, { useState } from 'react'
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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Textarea } from '../ui/textarea'
import { BsFilePdfFill } from "react-icons/bs";
import InspeccionAguaPDF from './InspeccionAguaPDF'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useToast } from '@/hooks/use-toast'
import { ToastAction } from '@radix-ui/react-toast'
import { updateInspeccionAgua } from '@/lib/InspeccionService'
import { Loader } from './Loader'

export const FormInspeccionAgua = ({ inspeccion, setInspeccion, tramite }) => {
  const { toast } = useToast();
  const rowStyles = "h-[70px] "
  const [loading, setLoading] = useState(false);
  const lat = 24.141633277226045
  const lng = -110.31325855927948
  const zoom = 18;
  const mapUrl = `https://maps.google.com/maps?q=${tramite?.posicion?.coordinates[1]},${tramite?.posicion?.coordinates[0]}&z=${15}&output=embed`;

  const formSchema = z.object({
    red_instalada: z.number().nullable().optional(),
    red_instalada_observaciones: z.string().optional(),
    toma_preparacion: z.number().nullable().optional(),
    toma_preparacion_observaciones: z.string().optional(),
    medidor: z.number().nullable().optional(),
    medidor_observaciones: z.string().optional(),
    presion: z.string().optional(),
    presion_observaciones: z.string().optional(),
    descarga_preparacion: z.string().optional(),
    descarga_preparacion_observaciones: z.string().optional(),
    profundidad_preparacion: z.string().optional(),
    profundidad_preparacion_observaciones: z.string().optional(),
    tipo_demolicion: z.string().optional(),
    tipo_demolicion_metros: z.number().nullable().optional(),
    observaciones_demolicion_metros: z.string().optional(),
    tipo_suelo: z.string().optional(),
    tipo_suelo_metros: z.number().nullable().optional(),
    observaciones_suelo_metros: z.string().optional(),
  })

  const sanitizeValues = (obj: Record<string, any>) => {
    return Object.fromEntries(
      Object.entries(obj).map(([key, value]) => [key, value ?? ""])
    );
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      red_instalada: inspeccion?.red_instalada ?? null,
      red_instalada_observaciones: inspeccion?.red_instalada_observaciones ?? "",
      toma_preparacion: inspeccion?.toma_preparacion ?? null,
      toma_preparacion_observaciones: inspeccion?.toma_preparacion_observaciones ?? "",
      medidor: inspeccion?.medidor ?? null,
      medidor_observaciones: inspeccion?.medidor_observaciones ?? "",
      presion: inspeccion?.presion ?? "",
      presion_observaciones: inspeccion?.presion_observaciones ?? "",
      descarga_preparacion: inspeccion?.descarga_preparacion ?? "",
      descarga_preparacion_observaciones: inspeccion?.descarga_preparacion_observaciones ?? "",
      profundidad_preparacion: inspeccion?.profundidad_preparacion ?? "",
      profundidad_preparacion_observaciones: inspeccion?.profundidad_preparacion_observaciones ?? "",
      tipo_demolicion: inspeccion?.tipo_demolicion ?? "",
      tipo_demolicion_metros: inspeccion?.tipo_demolicion_metros ?? null,
      observaciones_demolicion_metros: inspeccion?.observaciones_demolicion_metros ?? "",
      tipo_suelo: inspeccion?.tipo_suelo ?? "",
      tipo_suelo_metros: inspeccion?.tipo_suelo_metros ?? null,
      observaciones_suelo_metros: inspeccion?.observaciones_suelo_metros ?? "",
    },
  })


  async function onSubmit(values: z.infer<typeof formSchema>) {
    // console.log(values)
    // let valuesTemp = values;
    // valuesTemp.presion = true;
    try {
      await updateInspeccionAgua(setLoading, values, inspeccion?.id, setInspeccion);
      toast({
        title: "Exito",
        description: "Los cambios se han guardado con éxito",
        action: <ToastAction altText="Aceptar">Aceptar</ToastAction>,
      })
    }
    catch (e) {
      toast({
        title: "Error",
        description: "Ocurrio un error al modificar la inspeccion",
        action: <ToastAction altText="Aceotar">Aceptar</ToastAction>,
        variant: "destructive"
      })
    }
  }


  return (
    <>
      <div className='mt-10'>
        <InspeccionAguaPDF inspeccion={inspeccion} tramite={tramite} />
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3 w-full ">

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-center" colSpan={4}>Observaciones de inspección</TableHead>
              </TableRow>
            </TableHeader>
            <TableHeader>
              <TableRow>
                <TableHead className='w-[300px]'>Existe</TableHead>
                <TableHead className='min-w-[300px]'></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>

              <TableRow className={rowStyles}>
                <TableCell>Red Hidráulica instalada y autorizada frente al predio</TableCell>
                <TableCell className='flex gap-4 flex-wrap'>
                  <FormField
                    control={form.control}
                    name="red_instalada"
                    render={({ field }) => (
                      <FormItem className="">
                        <FormLabel></FormLabel>
                        <FormControl>
                          <RadioGroup
                            onValueChange={(value) => field.onChange(Number(value))}
                            defaultValue={field.value?.toString()}
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
                                <RadioGroupItem value="0" />
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
                  <FormField
                    control={form.control}
                    name="red_instalada_observaciones"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel></FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder='Observaciones'
                            className='md:w-[600px] w-full'
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>

                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </TableCell>
              </TableRow>

              <TableRow className={rowStyles}>
                <TableCell>Toma o preparación</TableCell>
                <TableCell className='flex gap-4 flex-wrap'>
                  <FormField
                    control={form.control}
                    name="toma_preparacion"
                    render={({ field }) => (
                      <FormItem className="">
                        <FormLabel></FormLabel>
                        <FormControl>
                          <RadioGroup
                            onValueChange={(value) => field.onChange(Number(value))}
                            defaultValue={field.value?.toString()}
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
                                <RadioGroupItem value="0" />
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
                  <FormField
                    control={form.control}
                    name="toma_preparacion_observaciones"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel></FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder='Observaciones'
                            className='md:w-[600px] w-full'
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>

                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </TableCell>

              </TableRow>

              <TableRow className={rowStyles}>
                <TableCell>Medidor</TableCell>
                <TableCell className='flex gap-4 flex-wrap'>
                  <FormField
                    control={form.control}
                    name="medidor"
                    render={({ field }) => (
                      <FormItem className="">
                        <FormLabel></FormLabel>
                        <FormControl>
                          <RadioGroup
                            onValueChange={(value) => field.onChange(Number(value))}
                            defaultValue={field.value?.toString()}
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
                                <RadioGroupItem value="0" />
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
                  <FormField
                    control={form.control}
                    name="medidor_observaciones"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel></FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder='Observaciones'
                            className='md:w-[600px] w-full'
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>

                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </TableCell>

              </TableRow>

              <TableRow className={rowStyles}>
                <TableCell>Presión menometrica (del punto más cercano)</TableCell>
                <TableCell className='gap-4 grid grid-cols-1 md:grid-cols-2'>
                  <FormField
                    control={form.control}
                    name="presion"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel></FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder='Presión menometrica'
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>

                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="presion_observaciones"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel></FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder='Observaciones'
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>

                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </TableCell>
              </TableRow>

            </TableBody>
          </Table>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-center" colSpan={5}>Ampliación de red</TableHead>
              </TableRow>
            </TableHeader>

            <TableHeader>
              <TableRow>
                <TableCell className='min-w-[100px] w-[150px]'>Demolición</TableCell>
                <TableCell className=' min-w-[120px] w-[150px]' colSpan={4} >
                  <FormField
                    control={form.control}
                    name="tipo_demolicion"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel></FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Selecciona un tipo" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {/* <SelectItem value="demolicion">Demolición</SelectItem> */}
                            <SelectItem value="asfalto">Asfalto</SelectItem>
                            <SelectItem value="concreto">Concreto</SelectItem>
                            <SelectItem value="empedrado">Empedrado</SelectItem>
                            <SelectItem value="terrenoNatural">Terreno natural</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormDescription>

                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </TableCell>
              </TableRow>
            </TableHeader>


            <TableBody>
              <TableRow>
                <TableCell>Distancias:</TableCell>
                <TableCell colSpan={4}>
                  <FormField
                    control={form.control}
                    name="tipo_demolicion_metros"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel></FormLabel>
                        <FormControl>
                          <Input
                            placeholder="MTRS."
                            {...field}
                            onChange={(e) => {
                              const value = e.target.value;
                              field.onChange(value === "" ? "" : Number(value));
                            }}
                            value={field.value || ""}
                          />
                        </FormControl>
                        <FormDescription>

                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </TableCell>
                {/* <TableCell><Input placeholder='MTRS.'></Input></TableCell>
                <TableCell><Input placeholder='MTRS.'></Input></TableCell>
                <TableCell><Input placeholder='MTRS.'></Input></TableCell> */}
              </TableRow>
              <TableRow>
                <TableCell>Observaciones / Materiales:</TableCell>
                <TableCell colSpan={4}>
                  <FormField
                    control={form.control}
                    name="observaciones_demolicion_metros"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel></FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder='Observaciones'
                            className=' w-full'
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>

                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </TableCell>
              </TableRow>
            </TableBody>

            <TableHeader>
              <TableRow>
                <TableCell className=' min-w-[120px] w-[150px]'>Evaluación tipo de suelo</TableCell>
                <TableCell className=' min-w-[120px] w-[150px]' colSpan={4}>
                  <FormField
                    control={form.control}
                    name="tipo_suelo"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel></FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Selecciona un tipo" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="A">A</SelectItem>
                            <SelectItem value="B">B</SelectItem>
                            <SelectItem value="C">C</SelectItem>
                            <SelectItem value="D">D</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormDescription>

                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </TableCell>
              </TableRow>
            </TableHeader>

            <TableRow>
              <TableCell>Profundidad</TableCell>
              <TableCell>
                <FormField
                  control={form.control}
                  name="tipo_suelo_metros"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel></FormLabel>
                      <FormControl>
                        <Input
                          placeholder="MTRS."
                          {...field}
                          onChange={(e) => {
                            const value = e.target.value;
                            field.onChange(value === "" ? "" : Number(value)); // Si está vacío, establece una cadena vacía
                          }}
                          value={field.value || ""} // Asegura que el valor sea una cadena vacía si está undefined
                        />
                      </FormControl>
                      <FormDescription>

                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                /></TableCell>
            </TableRow>

            <TableRow>
              <TableCell>Observaciones / Materiales:</TableCell>
              <TableCell colSpan={4}>
                <FormField
                  control={form.control}
                  name="observaciones_suelo_metros"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel></FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder='Observaciones'
                          className=' w-full'
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>

                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </TableCell>
            </TableRow>
          </Table>

          <p>Croquis localización</p>

          <iframe
            width="100%"
            height="450"
            style={{ border: 0 }}
            loading="lazy"
            allowFullScreen
            src={mapUrl}
          />

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ANEXOS</TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell><Button variant={"link"}> FOTO 1.jpg</Button></TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableBody>
          </Table>

          <Button type="submit"
            disabled={loading}
          >
            {loading && <Loader />}
            Aceptar y guardar
          </Button>

        </form>
      </Form>
    </>

  )
}
