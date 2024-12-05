import React from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { DataTableRequisitosCatalogo } from '@/components/components/DataTableRequisitosCatalogo'

export const RequisitosFactibilidades = () => {
  return (
    <div className='w-full h-full'>
      <Card className='w-full h-full'>
        <CardHeader>
          <CardTitle>Requisitos</CardTitle>
          <CardDescription>Configura los requisitos segun el tipo de factibilidad</CardDescription>
        </CardHeader>
        <CardContent>
          <DataTableRequisitosCatalogo />
        </CardContent>
      </Card>
    </div>
  )
}
