import React from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { DataTableFactibilidadMonitor } from '@/components/components/DataTableFactibilidadMonitor'

export const FactibilidadMonitor = () => {
  return (
    <Card className='h-full w-full'>
      <CardHeader>
        <CardTitle>Monitor de Factibilidades</CardTitle>
        <CardDescription>Tramites de factibilidad</CardDescription>
      </CardHeader>
      <CardContent>
        <DataTableFactibilidadMonitor />
      </CardContent>
      <CardFooter>

      </CardFooter>
    </Card>
  )
}
