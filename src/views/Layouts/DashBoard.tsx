import ZustandPrincipal from '@/Zustand/ZustandPrincipal'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import React from 'react'


export const DashBoard = () => {
  const { user } = ZustandPrincipal();

  return (
    <div className='h-full w-full'>
      <Card className='h-full w-full'>
        <CardHeader>
          <CardTitle>Portal SAPA</CardTitle>
          <CardDescription></CardDescription>
        </CardHeader>
        <CardContent>
        <p>Bienvenido {user?.name} ({user?.username})</p>
        </CardContent>
        <CardFooter>
          
        </CardFooter>
      </Card>

    </div>
  )
}
