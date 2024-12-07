import React from 'react'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Input } from '@/components/ui/input'
import MyDropzone from '@/components/components/dropzone'
import { Button } from '@/components/ui/button'
import { FiPlusCircle } from "react-icons/fi";
import { Textarea } from '@/components/ui/textarea'

export const RequisitosExtra = () => {
  return (
    <div className='h-full w-full'>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Requisito</TableHead>
            <TableHead className='flex items-center'>Respuesta
              <Button className='ml-auto'>Agregar Requisito<FiPlusCircle /></Button>
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>

          <TableRow>
            <TableCell>¿Me podria proporcionar la direccion de la persona que recibira las notificaciones de facturación?</TableCell>
            <TableCell className='flex gap-3 items-center'>
              <Textarea placeholder="Respuesta"></Textarea>
              <Button>Guardar</Button>
            </TableCell>
          </TableRow>

          <TableRow>
            <TableCell>
              Archivo del plano del proyecto
            </TableCell>
            <TableCell>
              <MyDropzone />
            </TableCell>
          </TableRow>


        </TableBody>
      </Table>
    </div>
  )
}
