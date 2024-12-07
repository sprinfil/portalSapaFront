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



export const FormInspeccionAgua = () => {
  const rowStyles = "h-[70px] "

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
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3 w-full ">

          <Table>
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
                <TableCell>Toma o preparación</TableCell>
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
                <TableCell>Medidor</TableCell>
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
                <TableCell>Presión menometrica (del punto más cercano)</TableCell>
                <TableCell className='gap-4 grid grid-cols-1 md:grid-cols-2'>
                  <Textarea></Textarea>
                  <Textarea placeholder='Observaciones'></Textarea>
                </TableCell>
              </TableRow>

            </TableBody>
          </Table>

          <Button type="submit">Aceptar y guardar</Button>

        </form>
      </Form>
    </>

  )
}
