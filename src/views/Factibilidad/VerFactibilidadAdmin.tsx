import React, { useEffect, useState } from 'react'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { useLocation, useNavigate } from 'react-router-dom';
import { DatosSolicitudForm } from '@/components/components/DatosSolicitudForm';
import { DatosPropietarioForm } from '@/components/components/DatosPropietarioForm';
import { DatosPredioForm } from '@/components/components/DatosPredioForm';
import { DatosAutorizadoForm } from '@/components/components/DatosAutorizadoForm';
import { DatosApoderadoForm } from '@/components/components/DatosApoderadoForm';
import { DatosAdicionalesForm } from '@/components/components/DatosAdicionalesForm';
import { RequisitosFactibilidadTable } from '@/components/components/RequisitosFactibilidadTable';
import { getTramiteById } from '@/lib/TramiteService';
import { useToast } from '@/hooks/use-toast';
import { ToastAction } from '@radix-ui/react-toast';
import { Loader } from '@/components/components/Loader';
import { RequisitosExtra } from './RequisitosExtra';
import OrdenesTrabajoInspeccion from './OrdenesTrabajoInspeccion';

export const VerFactibilidadAdmin = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const formTitleStyles = ""
  const [tramite, setTramite] = useState({});
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const tramiteId = queryParams.get('tramiteId');


  const fetch = async () => {
    try {
      await getTramiteById(setLoading, tramiteId ?? 0, setTramite);
    }
    catch (e) {
      toast({
        title: "Error",
        description: "Algo salio mal",
        variant: "destructive",
        action: <ToastAction altText='Aceptar'>Aceptar</ToastAction>
      })
    }
  }

  useEffect(() => {
    fetch();
  }, [])

  return (
    <div className='h-full w-full'>
      <Card className='h-full'>
        <CardHeader>
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink className='cursor-pointer' onClick={() => navigate("/MonitorFactibilidades")}>Monitor de Factibilidades</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Factibilidad: {tramite?.folio}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </CardHeader>
        <CardContent>
          <p className='mb-5'>Factibilidad: SF001</p>
          <Tabs defaultValue="informacionPrincipal" className="">
            <TabsList className='w-full'>
              <TabsTrigger value="informacionPrincipal">Principal</TabsTrigger>
              <TabsTrigger value="requisitos">Documentación</TabsTrigger>
              <TabsTrigger value="extras">Requisitos extras</TabsTrigger>
              <TabsTrigger value="ordenes">Ordenes de trabajo</TabsTrigger>
            </TabsList>
            <TabsContent value="informacionPrincipal">
              {
                loading ? <div className='w-full flex items-center justify-center'><Loader /> </div>
                  :
                  <>
                    <p className='font-bold'>Datos de la solicitud</p>
                    <DatosSolicitudForm disabled={true} defaultValues={tramite} />

                    <p className='font-bold mt-10'>Datos del propietario</p>
                    <DatosPropietarioForm disabled={true} defaultValues={tramite} />

                    <p className='font-bold mt-10'>Apoderado legal o representante personal</p>
                    <DatosApoderadoForm disabled={true} defaultValues={tramite} />

                    <p className='font-bold mt-10'>Datos del autorizado para oir y recibir notificaciones</p>
                    <DatosAutorizadoForm disabled={true} defaultValues={tramite} />

                    <p className='font-bold mt-10'>Datos básicos del predio</p>
                    <DatosPredioForm disabled={true} defaultValues={tramite} />

                    <p className='font-bold mt-10'>Datos adicionales</p>
                    <DatosAdicionalesForm disabled={true} defaultValues={tramite} />
                  </>
              }

            </TabsContent>
            <TabsContent value="requisitos">
              <div className='h-full'>
                <RequisitosFactibilidadTable tramite={tramite} />
              </div>
            </TabsContent>
            <TabsContent value="extras">
              <div className='h-full'>
                <RequisitosExtra tramiteId={tramiteId} tramite={tramite} />
              </div>
            </TabsContent>
            <TabsContent value="ordenes">
              <div className='h-full'>
                <OrdenesTrabajoInspeccion tramite={tramite} />
              </div>
            </TabsContent>
          </Tabs>
          <div>

          </div>
        </CardContent>
      </Card>
    </div>
  )
}
