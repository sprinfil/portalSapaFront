import { Card } from '@/components/ui/card'
import React, { useState } from 'react'
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
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
import { Input } from "@/components/ui/input"
import ZustandPrincipal from '@/Zustand/ZustandPrincipal'
import { Navigate } from 'react-router-dom'
import { ToastAction } from "@/components/ui/toast"
import { Loader } from '@/components/components/Loader'
import { FaUserCircle } from "react-icons/fa";
import { LoaderSecondary } from '@/components/components/LoaderSecondary'
import { login, register } from '@/lib/AuthService'
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast'
import logo from "../../assets/SAPALOGO.png"

export const Register = () => {
  const navigate = useNavigate();
  const { token, setToken, setUser } = ZustandPrincipal();
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const formSchema = z.object({
    name: z.string().min(2).max(50),
    email: z.string().min(2).max(50),
    password: z.string().min(8).max(50),
    password_confirmation: z.string().min(8, {
      message: "Se debe confirmar la contraseña",
    }),
  })
    .refine((data) => data.password === data.password_confirmation, {
      message: "Las contraseñas no coinciden",
      path: ["password_confirmation"],
    })

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {

    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      await register(setLoading, values);
      toast({
        title: 'Exito!',
        description: "Revisa tu bandeja de entrada para verificar ru correo",
        action: <ToastAction altText="Aceptar">Aceptar</ToastAction>,
      });
    } catch (e) {

      if (e?.response?.data?.data) {

        const errorMessages = Object.values(e.response.data.data)
          .flat()
          .join(', ');

        toast({
          title: 'Ocurrió un error',
          description: errorMessages,
          action: <ToastAction altText="Intentar de nuevo">Intentar de nuevo</ToastAction>,
        });

      } else {

        toast({
          title: 'Ocurrió un error',
          description: 'Hubo un problema al procesar la solicitud.',
          action: <ToastAction altText="Intentar de nuevo">Intentar de nuevo</ToastAction>,
        });
      }
    }
  }


  return (
    <div className='h-[100vh] w-full flex items-center justify-center'>
      <Card className='w-[600px]  p-5 shadow-md shadow-green-800'>
        <div className='w-full items-center  flex justify-center'>
          <FaUserCircle className='w-[100px] h-[100px] text-green-500' />
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-full flex flex-col">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nombre completo</FormLabel>
                  <FormControl>
                    <Input type='text' placeholder="Nombre Completo" {...field} />
                  </FormControl>
                  <FormDescription>

                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Correo</FormLabel>
                  <FormControl>
                    <Input type='email' placeholder="Correo" {...field} />
                  </FormControl>
                  <FormDescription>
                    Correo
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className='grid md:grid-cols-2 grid-cols-1 gap-4'>
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Contraseña</FormLabel>
                    <FormControl>
                      <Input placeholder="Contraseña" type="password" {...field} />
                    </FormControl>
                    <FormDescription>

                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password_confirmation"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Repetir contraseña</FormLabel>
                    <FormControl>
                      <Input placeholder="Repetir contraseña" type="password" {...field} />
                    </FormControl>
                    <FormDescription>

                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className='flex justify-between items-center'>

              <Button variant={"outline"} onClick={() => navigate("/login")}>Volver</Button>
              <Button type="submit" className='ml-auto' disabled={loading}>
                {
                  loading ?
                    <><Loader /></>
                    :
                    <></>
                }
                Aceptar y guardar
              </Button>
            </div>

          </form>
        </Form>
      </Card>
    </div>
  )
}
