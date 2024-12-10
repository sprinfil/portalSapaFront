import React from 'react'
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
import InspeccionAlcantarilladoPDF from './InspeccionAlcantarilladoPDF'



export const FormInspeccionAlcantarillado = () => {
  const rowStyles = "h-[70px] "
  const lat = 24.141633277226045
  const lng = -110.31325855927948
  const zoom = 18;
  const mapUrl = `https://maps.google.com/maps?q=${lat},${lng}&z=${zoom}&output=embed`;

  const formSchema = z.object({
    username: z.string().min(2, {
      message: "Username must be at least 2 characters.",
    }),
  })

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
    },
  })


  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values)
  }


  return (
    <>
      <div className='flex gap-2 my-2'>
        <p>NO SOLICITUD #SI011</p>
        <p>06/12/2024</p>
      </div>
      <InspeccionAlcantarilladoPDF />
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
                    name="tipo_de_calle"
                    render={({ field }) => (
                      <FormItem className="">
                        <FormLabel></FormLabel>
                        <FormControl>
                          <RadioGroup
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                            className="flex flex-col space-y-1"
                          >
                            <FormItem className="flex items-center space-x-3 space-y-0">
                              <FormControl>
                                <RadioGroupItem value="si" />
                              </FormControl>
                              <FormLabel className="font-normal">
                                Si
                              </FormLabel>
                            </FormItem>

                            <FormItem className="flex items-center space-x-3 space-y-0">
                              <FormControl>
                                <RadioGroupItem value="no" />
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
                  <Textarea placeholder='Observaciones' className='md:w-[600px] w-full'></Textarea>
                </TableCell>
              </TableRow>

              <TableRow className={rowStyles}>
                <TableCell>Descarga o preparación</TableCell>
                <TableCell className='flex gap-4 flex-wrap'>
                  <FormField
                    control={form.control}
                    name="tipo_de_calle"
                    render={({ field }) => (
                      <FormItem className="">
                        <FormLabel></FormLabel>
                        <FormControl>
                          <RadioGroup
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                            className="flex flex-col space-y-1"
                          >
                            <FormItem className="flex items-center space-x-3 space-y-0">
                              <FormControl>
                                <RadioGroupItem value="si" />
                              </FormControl>
                              <FormLabel className="font-normal">
                                Si
                              </FormLabel>
                            </FormItem>

                            <FormItem className="flex items-center space-x-3 space-y-0">
                              <FormControl>
                                <RadioGroupItem value="no" />
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
                  <Textarea placeholder='Observaciones' className='md:w-[600px] w-full'></Textarea>
                </TableCell>

              </TableRow>

              <TableRow className={rowStyles}>
                <TableCell>Profundidad de pozo de visita: (del punto más cercano)</TableCell>
                <TableCell className='gap-4 grid grid-cols-1 md:grid-cols-2'>
                  <Textarea></Textarea>
                  <Textarea placeholder='Observaciones'></Textarea>
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
                <TableHead className='min-w-[100px] w-[150px]'>Demolición</TableHead>
                <TableHead className=' min-w-[120px] w-[150px]'>Asfalto</TableHead>
                <TableHead className=' min-w-[120px] w-[150px]'>Concreto</TableHead>
                <TableHead className=' min-w-[120px] w-[150px]'>Empedrado</TableHead>
                <TableHead className=' min-w-[120px] w-[150px]'>Terreno natural</TableHead>
              </TableRow>
            </TableHeader>


            <TableBody>
              <TableRow>
                <TableCell>Distancias:</TableCell>
                <TableCell><Input placeholder='MTRS.'></Input></TableCell>
                <TableCell><Input placeholder='MTRS.'></Input></TableCell>
                <TableCell><Input placeholder='MTRS.'></Input></TableCell>
                <TableCell><Input placeholder='MTRS.'></Input></TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Observaciones / Materiales:</TableCell>
                <TableCell colSpan={4}>
                  <Textarea placeholder='Observaciones'></Textarea>
                </TableCell>
              </TableRow>
            </TableBody>

            <TableHeader>
              <TableRow>
                <TableHead className=' min-w-[120px] w-[150px]'>Evaluación tipo de suelo</TableHead>
                <TableHead className=' min-w-[120px] w-[150px]'>A</TableHead>
                <TableHead className=' min-w-[120px] w-[150px]'>B</TableHead>
                <TableHead className=' min-w-[120px] w-[150px]'>C</TableHead>
                <TableHead className=' min-w-[120px] w-[150px]'>D</TableHead>
              </TableRow>
            </TableHeader>

            <TableRow>
              <TableCell>Profundidad</TableCell>
              <TableCell><Input placeholder='MTRS.'></Input></TableCell>
              <TableCell><Input placeholder='MTRS.'></Input></TableCell>
              <TableCell><Input placeholder='MTRS.'></Input></TableCell>
              <TableCell><Input placeholder='MTRS.'></Input></TableCell>
            </TableRow>

            <TableRow>
              <TableCell>Observaciones / Materiales:</TableCell>
              <TableCell colSpan={4}>
                <Textarea placeholder='Observaciones'></Textarea>
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

          <Button type="submit">Aceptar y guardar</Button>

        </form>
      </Form>
    </>

  )
}
