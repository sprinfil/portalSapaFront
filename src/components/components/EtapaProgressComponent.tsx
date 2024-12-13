import React from 'react'
import { IoIosArrowDropright } from "react-icons/io";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

export const EtapaProgressComponent = ({ porcentaje = 0 }) => {

  const cardStyles = 'items-center flex max-w-[200px] min-h-[100px] text-center border flex-grow h-full items-center justify-center rounded-md shadow border-primary border flex-col'
  const iconStyles = "h-[25px] w-[25px] text-primary "



  const etapas =
    [
      {
        nombre: "Solicitud",
        porcentaje: 0,
        descripcion: "Revisión de documentos para inicio de trámite"
      },
      {
        nombre: "Solicitud de Inspección",
        porcentaje: 50,
        descripcion: "Preparativos para inspección"
      },
      {
        nombre: "Inspección",
        porcentaje: 100,
        descripcion: "Revisión del área para determinar los materiales"
      },
      {
        nombre: "Análisis / Proyectos",
        porcentaje: 150,
        descripcion: "descripción de esta etapa"
      },
      {
        nombre: "Factibilidad Aprobada",
        porcentaje: 200,
        descripcion: "Tu factibilidad está en proceso de liberación"
      },
      {
        nombre: "Factibilidad Liberada",
        porcentaje: 250,
        descripcion: "Tu factibilidad está lista para descargar"
      },
    ]

  return (
    <div className=''>
      <Accordion defaultValue='item-1' type="single" collapsible className='w-full'>
        <AccordionItem value="item-1">
          <AccordionTrigger>Progreso</AccordionTrigger>
          <AccordionContent className='md:flex w-full my-4 grid justify-between gap-1 items-center flex-wrap'>
            {
              etapas?.map((etapa, index) => {
                return (
                  <>

                    <div className={`${cardStyles} ${porcentaje > etapa?.porcentaje ? "bg-green-100" : ""} ${porcentaje == etapa?.porcentaje ? "bg-orange-100 border-orange-500" : ""}`} >
                      <p>{etapa?.nombre}</p>
                      <p className='text-muted-foreground text-[13px]'>{etapa?.descripcion}</p>
                    </div>
                    {index == (etapas?.length - 1) ? <> </> : <IoIosArrowDropright className={iconStyles} />}
                  </>
                )
              })
            }
          </AccordionContent>
        </AccordionItem>
      </Accordion>


    </div >
  )
}
