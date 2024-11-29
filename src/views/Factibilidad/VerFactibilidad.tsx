import React from 'react'
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
import { useNavigate } from 'react-router-dom';
import { DatosSolicitudForm } from '@/components/components/DatosSolicitudForm';
import { DatosPropietarioForm } from '@/components/components/DatosPropietarioForm';
import { DatosPredioForm } from '@/components/components/DatosPredioForm';
import { DatosAutorizadoForm } from '@/components/components/DatosAutorizadoForm';
import { DatosApoderadoForm } from '@/components/components/DatosApoderadoForm';
import { DatosAdicionalesForm } from '@/components/components/DatosAdicionalesForm';
import { RequisitosFactibilidadTable } from '@/components/components/RequisitosFactibilidadTable';

export const VerFactibilidad = () => {
  const navigate = useNavigate();
  const formTitleStyles = ""
  return (
    <div className='h-full w-full'>
      <Card className='h-full'>
        <CardHeader>
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink className='cursor-pointer' onClick={() => navigate("/factibilidadDashboard")}>Mis Factibilidades</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Factibilidad: SF001</BreadcrumbPage>
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
            </TabsList>
            <TabsContent value="informacionPrincipal">
              <p className='font-bold'>Datos de la solicitud</p>
              <DatosSolicitudForm disabled={true} />

              <p className='font-bold mt-10'>Datos del propietario</p>
              <DatosPropietarioForm disabled={true} />

              <p className='font-bold mt-10'>Apoderado legal o representante personal</p>
              <DatosApoderadoForm disabled={true} />

              <p className='font-bold mt-10'>Datos del autorizado para oir y recibir notificaciones</p>
              <DatosAutorizadoForm disabled={true} />

              <p className='font-bold mt-10'>Datos básicos del predio</p>
              <DatosPredioForm disabled={true} />

              <p className='font-bold mt-10'>Datos adicionales</p>
              <DatosAdicionalesForm disabled={true} />
            </TabsContent>
            <TabsContent value="requisitos">
              <div className='h-full'>
                <RequisitosFactibilidadTable/>
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
