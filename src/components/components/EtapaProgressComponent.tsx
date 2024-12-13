import React from 'react'
import { IoIosArrowDropright } from "react-icons/io";

export const EtapaProgressComponent = ({porcentaje = 0}) => {

  const cardStyles = 'w-[10%] text-center border flex-grow h-full flex items-center justify-center rounded-md shadow border-primary border flex-col'
  const iconStyles = "h-[25px] w-[25px] text-primary"



  const etapas =
    [
      {
        nombre: "Solicitud",
        porcentaje: 0,
        descripcion:"Revisión de documentos para inicio de trámite"
      },
      {
        nombre: "Solicitud de Inspección",
        porcentaje: 50,
        descripcion:"Preparativos para inspección"
      },
      {
        nombre: "Inspección",
        porcentaje: 100,
        descripcion:"Revisión del área para determinar los materiales"
      },
      {
        nombre: "Análisis / Proyectos",
        porcentaje: 150,
        descripcion:"descripción de esta etapa"
      },
      {
        nombre: "Factibilidad Aprobada",
        porcentaje: 200,
        descripcion:"Tu factibilidad está en proceso de liberación"
      },
      {
        nombre: "Factibilidad Liberada",
        porcentaje: 250,
        descripcion:"Tu factibilidad está lista para descargar"
      },
    ]

  return (
    <div className='hidden md:flex w-full my-4 h-[100px] justify-between gap-1 items-center flex-wrap'>
      {
        etapas?.map((etapa, index) => {
          return (
            <>
              <div className={`${cardStyles} ${porcentaje >= etapa?.porcentaje ? "bg-green-100":""}`} >
                <p>{etapa?.nombre}</p>
                <p className='text-muted-foreground text-[13px]'>{etapa?.descripcion}</p>
              </div>
              {index == (etapas?.length - 1) ? <> </> : <IoIosArrowDropright className={iconStyles} />}
            </>
          )
        })
      }

    </div >
  )
}
