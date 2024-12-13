import React from 'react'
import { Button } from '../ui/button';
import ZustandPrincipal from '@/Zustand/ZustandPrincipal';
import { patchTramite } from '@/lib/TramiteService';
import { useToast } from '@/hooks/use-toast';
import { ToastAction } from '@radix-ui/react-toast';
import { ArrowRight } from 'lucide-react';
import { ModalConfirmarPasarEtapa } from './ModalConfirmarPasarEtapa';
import { FaCheck } from 'react-icons/fa';

export const EtapasComponent = ({ tramite, setLoadingPatchTramite, setTramite }) => {
  const { user } = ZustandPrincipal();
  const { toast } = useToast();
  const buttonStyles = "my-3"

  const handleClick = async (etapa, estado) => {
    try {
      await patchTramite(setLoadingPatchTramite,
        {
          etapa: etapa,
          estado: estado
        }
        , tramite?.id, setTramite);
      toast({
        title: "",
        description: "Se cambio la etapa del trámite",
        action: <ToastAction altText="Aceptar">Aceptar</ToastAction>,
      })
    } catch (e) {
      toast({
        title: "Error",
        description: "Ocurrio un error",
        action: <ToastAction altText="Aceotar">Aceptar</ToastAction>,
        variant: "destructive"
      })
    }
  }

  return (
    <div>
      {
        user?.roles?.some(role => role.name === "atencion-usuario" || "master") &&
        tramite?.etapa == "solicitud_factibilidad" &&
        <ModalConfirmarPasarEtapa
          trigger={
            <Button
              className={buttonStyles}>Documentación lista (Pasar a factibilidades)<ArrowRight /></Button>
          }
          action={() => { handleClick("solicitud_factibilidad", "aprobada") }}
        />
      }

      {
        user?.roles?.some(role => role.name === "factibilidad" || "master") &&
        tramite?.etapa == "solicitud_inspeccion" &&
        tramite?.estado == "pendiente" &&
        <ModalConfirmarPasarEtapa
          trigger={
            <Button
              className={buttonStyles}>Iniciar solicitud de inspección<ArrowRight /></Button>
          }
          action={() => { handleClick("solicitud_inspeccion", "en_proceso") }}
        />
      }

      {
        user?.roles?.some(role => role.name === "factibilidad" || "master") &&
        tramite?.etapa == "solicitud_inspeccion" &&
        tramite?.estado == "en_proceso" &&
        <ModalConfirmarPasarEtapa
          trigger={
            <Button
              className={buttonStyles}>Concluir solicitud inspección<ArrowRight /></Button>
          }
          action={() => { handleClick("solicitud_inspeccion", "generada") }}
        />
      }

      {
        user?.roles?.some(role => role.name === "factibilidad" || "master") &&
        tramite?.etapa == "inspeccion" &&
        tramite?.estado == "pendiente" &&
        <ModalConfirmarPasarEtapa
          trigger={
            <Button
              className={buttonStyles}>Iniciar Inspección<ArrowRight /></Button>
          }
          action={() => { handleClick("solicitud_inspeccion", "en_proceso") }}
        />
      }

      {
        user?.roles?.some(role => role.name === "factibilidad" || "master") &&
        tramite?.etapa == "inspeccion" &&
        tramite?.estado == "en_proceso" &&
        <ModalConfirmarPasarEtapa
          trigger={
            <Button
              className={buttonStyles}>Concluir Inspección<ArrowRight /></Button>
          }
          action={() => { handleClick("solicitud_inspeccion", "completada") }}
        />
      }

      {
        user?.roles?.some(role => role.name === "factibilidad" || "master") &&
        tramite?.etapa == "analisis" &&
        tramite?.estado == "pendiente" &&
        <ModalConfirmarPasarEtapa
          trigger={
            <Button
              className={buttonStyles}>Iniciar Analisis<ArrowRight /></Button>
          }
          action={() => { handleClick("analisis", "en_proceso") }}
        />
      }

      {
        user?.roles?.some(role => role.name === "sector" || "master") &&
        tramite?.etapa == "analisis" &&
        tramite?.estado == "en_proceso" &&
        <>
          <div className={"gap-3 flex my-2"}>
            <ModalConfirmarPasarEtapa
              trigger={
                <Button
                  className=''>Pasar a proyectos<ArrowRight /></Button>
              }
              action={() => { handleClick("analisis", "proyectos") }}
            />

            <ModalConfirmarPasarEtapa
              trigger={
                <Button
                  className=''>Aprobar factibilidad<FaCheck /></Button>
              }
              action={() => { handleClick("analisis", "aprobada") }}
            />
          </div>
        </>
      }

      {
        user?.roles?.some(role => role.name === "proyectos" || "master") &&
        tramite?.etapa == "proyectos" &&
        tramite?.estado == "pendiente" &&
        <ModalConfirmarPasarEtapa
          trigger={
            <Button
              className={buttonStyles}>Iniciar inspeccion<ArrowRight /></Button>
          }
          action={() => { handleClick("proyectos", "en_proceso") }}
        />
      }

      {
        user?.roles?.some(role => role.name === "proyectos" || "master") &&
        tramite?.etapa == "proyectos" &&
        tramite?.estado == "en_proceso" &&
        <ModalConfirmarPasarEtapa
          trigger={
            <Button
              className={buttonStyles}>Aprobar inspeccion<ArrowRight /></Button>
          }
          action={() => { handleClick("proyectos", "aprobada") }}
        />
      }


    </div>
  )
}
