import React from 'react'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Input } from '../ui/input'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export const FiltrosFactibilidadMonitor = ({ params, setParams }) => {


  return (
    <Accordion defaultValue={"item-1"} type="single" collapsible className="w-full">
      <AccordionItem value="item-1">
        <AccordionTrigger>Filtros</AccordionTrigger>
        <AccordionContent className='flex flex-wrap gap-4 p-4'>
          <div>
            <p>Folio</p>
            <Input
              onChange={(e) => {
                setParams(prev => {
                  return {
                    ...prev,
                    folio: e.currentTarget.value
                  }
                })
              }}
              className='md:w-[300px] w-full'
              placeholder='Folio'
              value={params?.folio}
            ></Input>
          </div>
          {/* <div>
            <p>Solicitante</p>
            <Input placeholder='Solicitante' className='md:w-[300px] w-full'></Input>
          </div> */}
          <div>
            <p>Tipo de factibilidad</p>
            <Select
              onValueChange={(value) => {
                setParams(prev => {
                  return {
                    ...prev,
                    id_contrato: value
                  }
                })
              }}
              value={params?.id_contrato}
            >
              <SelectTrigger className="md:w-[300px] w-full">
                <SelectValue placeholder="Selecciona una opcion" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Tipo de factibilidad</SelectLabel>
                  <SelectItem value="1">DOMESTICO COMERCIAL INDUSTRIAL CON INFRAESTRUCTURA EXISTENTE</SelectItem>
                  <SelectItem value="2">COMERCIAL INDUSTRIAL Y DESARROLLO HABITACIONAL PARA INFRAESTRUCTURA NUEVA</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>


          <div>
            <p>Estado</p>
            <Select
              onValueChange={(value) => {
                setParams(prev => {
                  return {
                    ...prev,
                    estado: value
                  }
                })
              }}
              value={params?.estado}
            >
              <SelectTrigger className="md:w-[300px] w-full">
                <SelectValue placeholder="Selecciona una opcion" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Selecciona una opcion</SelectLabel>
                  <SelectItem value="pendiente">PENDIENTE</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          <div>
            <p>Etapa</p>
            <Select
              onValueChange={(value) => {
                setParams(prev => {
                  return {
                    ...prev,
                    etapa: value
                  }
                })
              }}
              value={params?.etapa}
            >
              <SelectTrigger className="md:w-[300px] w-full">
                <SelectValue placeholder="Selecciona una opcion" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Selecciona una opcion</SelectLabel>
                  <SelectItem value="solicitud">SOLICITUD</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          <div className='flex flex-wrap gap-10 border border-border p-2'>
            <div>
              <p>Fecha de solicitud (INICIO)</p>
              <input onChange={(e) => {
                setParams(prev => {
                  return {
                    ...prev,
                    fecha_solicitud_inicio: e.currentTarget.value
                  }
                })
              }}
                type="date"
                className='border-border border p-2 rounded-sm'
                value={params?.fecha_solicitud_inicio}
              />
            </div>
            <div>
              <p>Fecha de solicitud (FIN)</p>
              <input
                value={params?.fecha_solicitud_fin}
                onChange={(e) => {
                  setParams(prev => {
                    return {
                      ...prev,
                      fecha_solicitud_fin: e.currentTarget.value
                    }
                  })
                }}
                type="date"
                className='border-border border p-2 rounded-sm'
              />
            </div>
          </div>


        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}
