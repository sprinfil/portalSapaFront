import { Card } from '@/components/ui/card'
import React, { useEffect, useState } from 'react'
import { login, register, verifyEmail } from '@/lib/AuthService'
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast'
import logo from "../../assets/SAPALOGO.png"
import { useLocation } from 'react-router-dom';
import { ToastAction } from '@radix-ui/react-toast';
import { Loader } from '@/components/components/Loader';
export const VerifyEmail = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const { toast } = useToast();
  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);
  const code = queryParams.get('code');

  useEffect(() => {
    verify();
  }, [])

  const verify = async () => {
    try {
      await verifyEmail(setLoading, code);
    }
    catch (e) {
      // setError(true);
      // toast({
      //   title: "Error",
      //   description: "Ocurrio un error al verificar tu email",
      //   action: <ToastAction altText='Aceptar'>Aceptar</ToastAction>
      // })
    }
  }

  return (
    <div className='h-[100vh] w-full flex items-center justify-center'>
      <Card className='w-[600px]  p-5 shadow-md shadow-green-800'>
        <div className='w-full flex flex-col items-center  justify-center'>
          {/* {
            error ? <>
              <img src={logo} alt="" className='w-[100px] mb-[50px]' />
              <p>Ocurrio un error</p>
            </> : */}
              <>
                {
                  !loading ?
                    <>
                      <img src={logo} alt="" className='w-[100px] mb-[50px]' />
                      <p>Tu correo ha sido verificado, ahora puedes <span className='text-blue-500 hover:underline cursor-pointer' onClick={() => navigate("/login")}>iniciar sesión</span></p>
                    </>
                    :
                    <>
                      <Loader />
                    </>
                }
              </>
          {/* } */}
        </div>
      </Card>
    </div>
  )
}
