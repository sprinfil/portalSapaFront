import React, { useEffect, useRef, useState } from 'react'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { useLocation, useNavigate } from 'react-router-dom';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { type CarouselApi } from "@/components/ui/carousel"
import { Progress } from "@/components/ui/progress"
import { DatosSolicitudForm } from '@/components/components/DatosSolicitudForm';
import { DatosPropietarioForm } from '@/components/components/DatosPropietarioForm';
import { DatosApoderadoForm } from '@/components/components/DatosApoderadoForm';
import { DatosAutorizadoForm } from '@/components/components/DatosAutorizadoForm';
import { DatosPredioForm } from '@/components/components/DatosPredioForm';
import { DatosAdicionalesForm } from '@/components/components/DatosAdicionalesForm';
import ZustandPrincipal from '@/Zustand/ZustandPrincipal';

export const FactibilidadFormulario = () => {
  const navigate = useNavigate();
  const [api, setApi] = React.useState<CarouselApi>()
  const [progress, setProgress] = useState(0);
  const { tramite, user, setTramite } = ZustandPrincipal();

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const idContrato = queryParams.get('idContrato');

  // React.useEffect(() => {
  //   if (!api) {
  //     return
  //   }

  //   // api.scrollNext();
  // }, [api])

  React.useEffect(() => {
    let tramiteTemp =
    {
      ...tramite,
      id_solicitante: user?.id
    }
    setTramite(tramiteTemp);
  }, [])


  return (
    <>
      <Card className=''>
        <CardHeader>
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink className='cursor-pointer' onClick={() => navigate("/factibilidadDashboard")}>Mis Factibilidades</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink className='cursor-pointer' onClick={() => navigate("/crearFactibilidad")}>Seleccionar Tipo de Contrato</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Llenar Formulario</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </CardHeader>
        <CardContent className='flex flex-col items-center justify-center'>

          <div className='w-[40%] flex flex-col items-center justify-center'>
            <p>Progreso</p>
            <Progress value={progress} className='w-full mb-4 ' />
          </div>

          <Carousel
            setApi={setApi}
            opts={{
              skipSnaps: false,
              watchDrag: false
            }}
            className='md:w-[85%] w-[90%]'>
            <CarouselContent>
              <CarouselItem>
                <Card className='min-h-[80vh]'>
                  <CardContent className="">
                    <CardHeader>
                      <CardTitle>Datos de la solicitud</CardTitle>
                      <CardDescription>Llene y verifique la información</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <DatosSolicitudForm api={api} setProgress={setProgress} idContrato={idContrato} defaultValues={tramite} tramite={tramite} setTramite={setTramite} />
                    </CardContent>
                  </CardContent>
                </Card>
              </CarouselItem>

              <CarouselItem>
                <Card className='min-h-[80vh]'>
                  <CardContent className="">
                    <CardHeader>
                      <CardTitle>Propietario</CardTitle>
                      <CardDescription>Llene y verifique la información</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <DatosPropietarioForm api={api} setProgress={setProgress} defaultValues={tramite} tramite={tramite} setTramite={setTramite} />
                    </CardContent>
                  </CardContent>
                </Card>
              </CarouselItem>

              <CarouselItem>
                <Card className='min-h-[80vh]'>
                  <CardContent className="">
                    <CardHeader>
                      <CardTitle>Apoderado legal o representante personal</CardTitle>
                      <CardDescription>Llene y verifique la información</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <DatosApoderadoForm api={api} setProgress={setProgress} defaultValues={tramite} tramite={tramite} setTramite={setTramite} />
                    </CardContent>
                  </CardContent>
                </Card>
              </CarouselItem>

              <CarouselItem>
                <Card className='min-h-[80vh]'>
                  <CardContent className="">
                    <CardHeader>
                      <CardTitle>Datos del autorizado para oir y recibir notificaciones</CardTitle>
                      <CardDescription>Llene y verifique la información</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <DatosAutorizadoForm api={api} setProgress={setProgress} defaultValues={tramite} tramite={tramite} setTramite={setTramite} />
                    </CardContent>
                  </CardContent>
                </Card>
              </CarouselItem>


              <CarouselItem>
                <Card className='min-h-[80vh]'>
                  <CardContent className="">
                    <CardHeader>
                      <CardTitle>Datos básicos del predio</CardTitle>
                      <CardDescription>Llene y verifique la información</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <DatosPredioForm api={api} setProgress={setProgress} defaultValues={tramite} tramite={tramite} setTramite={setTramite} />
                    </CardContent>
                  </CardContent>
                </Card>
              </CarouselItem>

              <CarouselItem>
                <Card className='min-h-[80vh]'>
                  <CardContent className="">
                    <CardHeader>
                      <CardTitle>Datos adicionales</CardTitle>
                      <CardDescription>Llene y verifique la información</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <DatosAdicionalesForm api={api} setProgress={setProgress} defaultValues={tramite} tramite={tramite} setTramite={setTramite} />
                    </CardContent>
                  </CardContent>
                </Card>
              </CarouselItem>

            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>

        </CardContent>
      </Card>

    </>

  )
}
