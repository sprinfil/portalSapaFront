import React from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from '../ui/button'

export const ErrorComponent = () => {
  return (
    <div className='w-full h-full'>
      <Card>
        <CardHeader>
          <CardTitle>Error</CardTitle>
          <CardDescription>Algo salió mal</CardDescription>
        </CardHeader>
        <CardContent>
          <Button
            onClick={() => {
              window.location.reload();
            }}
          >Recargar Página</Button>
        </CardContent>
      </Card>
    </div>
  )
}
