
import { DataTableOperadores } from '@/components/components/DataTableOperadores';
import { Loader } from '@/components/components/Loader';
import { getOperadores } from '@/lib/OperadorService'
import ZustandPrincipal from '@/Zustand/ZustandPrincipal';
import React, { useState } from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export const Operadores = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = ZustandPrincipal();

  getOperadores(setLoading, setData);

  return (
    <>
      {user?.roles?.some(role => role.name === "master") ?
        <>
          <div className='w-full h-full'>
            {
              loading ?
                <>
                  <div className='w-full flex items-center justify-center'>
                    <Loader />
                  </div>
                </>
                :
                <>
                  <Card className='h-full w-full'>
                    <CardHeader>
                      <CardTitle>Operadores</CardTitle>
                      <CardDescription></CardDescription>
                    </CardHeader>
                    <CardContent>
                      <DataTableOperadores data={data} setData={setData} />
                    </CardContent>
                    <CardFooter>
                    </CardFooter>
                  </Card>

                </>
            }
          </div>
        </>
        :
        <>
          <p>Buen Intento</p>
        </>
      }

    </>

  )
}
