import React, { useEffect, useState } from 'react'
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
import ZustandPrincipal from '@/Zustand/ZustandPrincipal'
import { ModalCrearRequisitoExtra } from '@/components/components/ModalCrearRequisitoExtra'
import { useToast } from '@/hooks/use-toast'
import { ToastAction } from '@radix-ui/react-toast'
import { getEntregablesNull } from '@/lib/EntregableService'
import { Loader } from '@/components/components/Loader'

export const RequisitosExtra = ({ tramiteId }) => {
  const { user } = ZustandPrincipal();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [entregables, setEntregables] = useState([]);

  useEffect(() => {
    try {
      getEntregablesNull(setLoading, setEntregables, tramiteId);
    } catch (e) {
      toast({
        title: "Error",
        description: "Ocurrió un error buscando los entregables",
        action: <ToastAction altText="Aceptar">Aceptar</ToastAction>,
        variant: "destructive",
      })
    }
  }, [])

  return (
    <div className='h-full w-full'>
      {loading ? <div className='h-full w-full flex items-center justify-center'><Loader />  </div> :
        <>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Requisito</TableHead>
                <TableHead className='flex items-center'>Respuesta
                  {
                    user?.roles[0]?.name != "public" ?
                      <>
                        <ModalCrearRequisitoExtra tramiteId={tramiteId} />
                      </>
                      :
                      <></>
                  }

                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <>
                {
                  entregables?.map(entregable => {
                    if (entregable?.tipo == "texto") {
                      return (
                        <>
                          <TableRow>
                            <TableCell>
                              <div className='flex flex-col gap-3'>
                                <p>{entregable?.nombre}</p>
                                <p className='text-muted-foreground text-sm'>{entregable?.descripcion}</p>
                              </div>

                            </TableCell>
                            <TableCell className='flex gap-3 items-center'>
                              <Textarea placeholder="Respuesta"></Textarea>
                              {
                                user?.roles[0]?.name == "public" ?
                                  <>
                                    <Button>Guardar</Button>
                                  </>
                                  :
                                  <></>
                              }
                            </TableCell>
                          </TableRow>
                        </>
                      )
                    }

                    if (entregable?.tipo == "archivo") {
                      return (
                        <>
                          <TableRow>
                            <TableCell>
                              <div className='flex flex-col gap-3'>
                                <p>{entregable?.nombre}</p>
                                <p className='text-muted-foreground text-sm'>{entregable?.descripcion}</p>
                              </div></TableCell>
                            <TableCell>
                              <MyDropzone />
                            </TableCell>
                          </TableRow>
                        </>
                      )
                    }

                  })
                }
              </>
            </TableBody>
          </Table>
        </>}

    </div>
  )
}
