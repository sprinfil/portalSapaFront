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
import ZustandPrincipal from '@/Zustand/ZustandPrincipal';
import { ModalSolicitudPendiente } from '@/components/components/ModalSolicitudPendiente';
import { Button } from '@/components/ui/button';

export const CrearFactibilidad = () => {
  const navigate = useNavigate();
  const { tramite, setTramite, user } = ZustandPrincipal();
  const ButtonTriggerModal = useRef();
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    if (tramite?.id_contrato != null && tramite?.id_solicitante == user?.id) {
      setOpenModal(true);
    }
  }, [])

  return (
    <Card className='h-full'>

      <CardHeader>
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink className='cursor-pointer' onClick={() => navigate("/factibilidadDashboard")}>Mis Factibilidades</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Seleccionar Tipo de Contrato</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </CardHeader>
      <CardContent>
        <ModalSolicitudPendiente open={openModal} setOpen={setOpenModal} />
        
        <p>Seleccione el tipo de contrato</p>
        <div className='grid md:grid-cols-2 grid-cols-1 mt-4 gap-4'>
          <Card onClick={() => navigate("/factibilidadFormulario?idContrato=1")} className='h-[600px] overflow-auto cursor-pointer hover:bg-muted transition-all duration-200'>
            <CardHeader>

              <CardTitle>Doméstico, Comercial Industrial con infraestructura existente</CardTitle>
              <CardDescription>
                <p className='font-bold'>Lista de requisitos</p>
                <p>• Identificación oficial vigente con fotografía</p>
                <p>• CURP reciente</p>
                <p>• Constancia de Situación Fiscal</p>
                <p>• Acta constitutiva</p>
                <p>• Carta poder</p>
                <p>• Poder notarial</p>
                <p>• Escritura o título debidamente inscrito en el Registro Público y Catastro</p>
                <p>• Certificado de no adeudo predial</p>
                <p>• Comprobante de domicilio</p>
                <p>• Croquis de ubicación</p>
                <p>• Fotografías</p>
                <p>• Pago del trámite</p>
                <p>• Copia del plano arquitectónico</p>
                <p>• Planta de conjunto del local a construir o croquis de distribución del local</p>
                <p>• Memoria de cálculo hidráulico del proyecto</p>
                <p>• Autorización de uso de suelo</p>
                <p>• Contrato de arrendamiento (si aplica)</p>
                <p>• Copia del plano arquitectónico de la vivienda y/o departamentos a construir</p>
                <p>• Plano de la subdivisión autorizada</p>
                <p>• Oficio de la subdivisión autorizada</p>
                <p>• Escritura pública protocolizada ante notario público que lo establezca y debidamente registrada ante el Registro Público de la Propiedad y el Comercio</p>
                <p>• Reglamento autorizado por el H. Ayuntamiento de La Paz</p>
              </CardDescription>
            </CardHeader>
          </Card>
          <Card onClick={() => navigate("/factibilidadFormulario?idContrato=2")} className='h-[600px] overflow-auto cursor-pointer hover:bg-muted transition-all duration-200'>
            <CardHeader>
              <CardTitle>Comercial, Industrial, y desarrollo habitacional para infraestructura nueva</CardTitle>
              <CardDescription>
                <p className='font-bold'>Lista de requisitos</p>
                <p>• Identificación oficial vigente con fotografía</p>
                <p>• CURP reciente</p>
                <p>• Constancia de Situación Fiscal</p>
                <p>• Acta constitutiva</p>
                <p>• Carta poder</p>
                <p>• Poder notarial</p>
                <p>• Escritura o título debidamente inscrito en el Registro Público y Catastro</p>
                <p>• Certificado de no adeudo predial</p>
                <p>• Comprobante de domicilio</p>
                <p>• Croquis de ubicación</p>
                <p>• Fotografías</p>
                <p>• Pago del trámite</p>
                <p>• Copia del plano arquitectónico</p>
                <p>• Planta de conjunto del local a construir o croquis de distribución del local</p>
                <p>• Memoria de cálculo hidráulico del proyecto</p>
                <p>• Autorización de uso de suelo</p>
                <p>• Contrato de arrendamiento (si aplica)</p>
                <p>• Copia del plano arquitectónico de la vivienda y/o departamentos a construir</p>
                <p>• Plano de la subdivisión autorizada</p>
                <p>• Oficio de la subdivisión autorizada</p>
                <p>• Escritura pública protocolizada ante notario público que lo establezca y debidamente registrada ante el Registro Público de la Propiedad y el Comercio</p>
                <p>• Reglamento autorizado por el H. Ayuntamiento de La Paz</p>
              </CardDescription>
            </CardHeader>

          </Card>
        </div>
      </CardContent>
    </Card>
  )
}
