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
import { IoSend } from "react-icons/io5";
import { Input } from "@/components/ui/input"
import ZustandPrincipal from '@/Zustand/ZustandPrincipal'
import { Navigate } from 'react-router-dom'
import { ToastAction } from "@/components/ui/toast"
import { Loader } from '@/components/components/Loader'
import { FaUserCircle } from "react-icons/fa";
import { LoaderSecondary } from '@/components/components/LoaderSecondary'
import { login, resetPassword } from '@/lib/AuthService'
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast'
import logo from "../../assets/SAPALOGO.png"
import { navigateWhenKeyPress } from '@/lib/ToolsService'
import { ModalRecuperarContraseña } from '@/components/components/ModalRecuperarContraseña'
import { useLocation } from 'react-router-dom';

export const ResetPassword = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const [showLogin, setShowLogin] = useState(false);

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const reset_token = queryParams.get('token');

  const formSchema = z.object({
    password: z.string().min(2).max(50),
    password_confirmation: z.string().min(2).max(50)
  }).refine((data) => data.password === data.password_confirmation, {
    message: "Las contraseñas no coinciden",
    path: ["password_confirmation"],
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {

    },
  })

  navigateWhenKeyPress("F1", "/login/admin");

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      await resetPassword(setLoading, reset_token, values?.password, values?.password_confirmation);
      setShowLogin(true);
      toast({
        title: 'Contraseña reestablecida',
        description: "Ahora puedes iniciar sesión",
        action: <ToastAction altText="Aceptar">Aceptar</ToastAction>,
      })
      // navigate("/dashboard");
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
          <p className='text-primary'>Recuperación de contraseña</p>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3 w-full flex flex-col">
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nueva contraseña</FormLabel>
                  <FormControl>
                    <Input type='password' placeholder="Nueva contraseña" {...field} />
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
            <div className='flex justify-between items-center gap-4'>
              <Button type="submit" className='ml-auto' disabled={loading}>
                {
                  loading ?
                    <><Loader /></>
                    :
                    <></>
                }
                Reestablecer contraseña
              </Button>
              {
                showLogin ? <Button variant={"outline"} onClick={() => navigate("/login")}>Iniciar Sesión<IoSend /></Button> : <></>
              }

            </div>

          </form>
        </Form>
      </Card >
    </div >
  )
}
