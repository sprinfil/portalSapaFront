import { Card } from '@/components/ui/card'
import React, { useEffect, useState } from 'react'
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
import { login } from '@/lib/AuthService'
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast'
import logo from "../../assets/SAPALOGO.png"
import { navigateWhenKeyPress } from '@/lib/ToolsService'
import { ModalRecuperarContraseña } from '@/components/components/ModalRecuperarContraseña'

export const Login = () => {
  const navigate = useNavigate();
  const { token, setToken, setUser } = ZustandPrincipal();
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const formSchema = z.object({
    email: z.string().min(2).max(50),
    password: z.string().min(2).max(50)
  })

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  navigateWhenKeyPress("F1", "/login/admin");

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      // localStorage.setItem("TOKEN", 'SDFSDFSDF');
      // navigate("/dashboard");

      await login(setLoading, values?.email, values?.password, setToken, setUser);
    } catch (e) {
      toast({
        title: 'Ocurrio un error',
        description: e?.response?.data?.data?.message,
        action: <ToastAction altText="Intenar de nuevo">Intenar de nuevo</ToastAction>,
      })
    }
  }



  return (
    <div className='h-[100vh] w-full flex items-center justify-center'>
      <Card className='w-[600px]  p-5 shadow-md shadow-green-800'>
        <div className='w-full items-center  flex justify-center'>
          {/* <FaUserCircle className='w-[100px] h-[100px] text-green-500' /> */}
          <img src={logo} className='w-[150px]' />
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-full flex flex-col">
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

                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
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
                    <>
                      <div className='flex gap-1'>
                        <p>¿Olvidaste tu contraseña?</p> <ModalRecuperarContraseña />
                      </div>

                    </>
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className='flex justify-between items-center'>
              <p className='text-muted-foreground'>¿No tienes cuenta? <span onClick={() => navigate("/register")} className='text-blue-500 hover:underline cursor-pointer'>Registrate</span> </p>
              <Button type="submit" className='ml-auto' disabled={loading}>
                {
                  loading ?
                    <><Loader /></>
                    :
                    <></>
                }
                Iniciar Sesión
              </Button>
            </div>

          </form>
        </Form>
      </Card >
    </div >
  )
}
