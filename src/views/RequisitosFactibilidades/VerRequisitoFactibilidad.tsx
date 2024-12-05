import React, { useEffect, useState } from 'react'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { PlusCircle } from "lucide-react"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
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
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"


import { useLocation, useNavigate, useNavigation } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast'
import { ToastAction } from '@radix-ui/react-toast'
import { Input } from '@/components/ui/input'
import { getRequisitoCatalogoById } from '@/lib/RequisitoService'
import { Loader } from '@/components/components/Loader'
import { Button } from '@/components/ui/button'

export const VerRequisitoFactibilidad = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const requisitoId = queryParams.get('requisitoId');
  const navigate = useNavigate();
  const { toast } = useToast();
  const [requisito, setRequisito] = useState({}
  );
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    try {
      getRequisitoCatalogoById(setLoading, requisitoId, setRequisito)

    } catch (e) {
      toast({
        title: "Error",
        description: "Ocurrio un error al consultar el requisito",
        variant: "destructive",
        action: <ToastAction altText="Aceptar">Aceptar</ToastAction>
      })
    }
  }, [])
  useEffect(() => { form.reset(requisito); }, [requisito])

  const formSchema = z.object({
    nombre: z.string().min(2, {
      message: "El requisito debe tener al menos 2 caracteres",
    }),
  })

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      ...requisito
    },
  })
  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {


    } catch (e) {
      toast({
        title: "Error",
        description: "Ocurrio un error al crear el requisito",
        variant: "destructive",
        action: <ToastAction altText="Aceptar">Aceptar</ToastAction>
      })
    }
  }

  return (
    <Card className='w-full h-full'>
      <CardHeader>
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink className='cursor-pointer' onClick={() => navigate("/requisitos")}>Requisitos</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Requisito: {requisito?.nombre}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </CardHeader>
      <CardContent>
        {loading && <Loader />}
        {!loading &&
          <>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                  control={form.control}
                  name="nombre"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nombre</FormLabel>
                      <FormControl>
                        <Input placeholder="nombre" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </form>
            </Form>
            <div className='mt-10'>
              <div className='flex gap-4 flex-wrap mb-4 items-center'>
                <p className='text-sm'>Documentos</p>
                <Button className='ml-auto'>Agregar Documento<PlusCircle /></Button>
              </div>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nombre</TableHead>

                    <TableHead>Tipo de factibilidad</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {
                    requisito?.documentos?.map(documento => {
                      return (
                        <TableRow>
                          <TableCell>{documento?.nombre}</TableCell>

                          <TableCell>
                            <div className='flex flex-col gap-3'>
                              <div className='flex gap-2'>
                                <input type="checkbox" className='w-[20px] h-[20px]' />
                                <p>DOMESTICO COMERCIAL INDUSTRIAL CON INFRAESTRUCTURA EXISTENTE</p>
                              </div>
                              <div className='flex gap-2'>
                                <input type="checkbox" className='w-[20px] h-[20px]' />
                                <p>COMERCIAL INDUSTRIAL Y DESARROLLO HABITACIONAL PARA INFRAESTRUCTURA NUEVA</p>
                              </div>
                            </div>

                          </TableCell>
                        </TableRow>
                      )
                    })
                  }

                </TableBody>
              </Table>
            </div>

          </>
        }

      </CardContent>
    </Card>
  )
}
