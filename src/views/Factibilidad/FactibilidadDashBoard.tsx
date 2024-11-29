import React from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { DataTableFactibilidadesUsuarios } from '@/components/components/DataTableFactibilidadesUsuarios'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

export const FactibilidadDashBoard = () => {
  return (
    <div className='h-full w-full'>
      <Card className='h-full w-full'>
        <CardHeader>
          <CardTitle>Mis Factibilidades</CardTitle>
          <CardDescription>Lista de los tramites de factibilidades</CardDescription>
        </CardHeader>
        <CardContent>
          <DataTableFactibilidadesUsuarios />
        </CardContent>
      </Card>
    </div>
  )
}
