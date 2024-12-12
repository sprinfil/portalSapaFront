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
import { getEntregablesNull, patchEntregable } from '@/lib/EntregableService'
import { Loader } from '@/components/components/Loader'
import { IoSend } from "react-icons/io5";
import { ModalVerArchivo } from '@/components/components/ModalVerArchivo'
export const RequisitosExtra = ({ tramiteId, tramite }) => {
  const { user } = ZustandPrincipal();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [entregables, setEntregables] = useState([]);
  const [values, setValues] = useState({});
  const [loadingRespuesta, setLoadingRespuesta] = useState(false);

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

  const handleChange = (id, value) => {
    setValues(prev => ({ ...prev, [id]: value }));
  };

  return (
    <div className='h-full w-full'>
      {loading ? <div className='h-full w-full flex items-center justify-center'><Loader />  </div> :
        <>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className='min-w-[200px]'>
                  <div className='items-center gap-3 flex'>
                    Requisito
                  </div>

                </TableHead>
                <TableHead className='flex items-center min-w-[400px]'>Respuesta
                  {
                    user?.roles[0]?.name != "public" ?
                      <>
                        <ModalCrearRequisitoExtra tramiteId={tramiteId} setEntregables={setEntregables} />
                      </>
                      :
                      <></>
                  }

                  {loadingRespuesta && <Loader />
                  }
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <>
                {
                  entregables?.map(entregable => {
                    if (entregable?.tipo == "Text") {


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


                              <Textarea
                                defaultValue={entregable?.value}
                                onChange={(e) => handleChange(entregable?.id, e.target.value)}
                                className={`${user?.roles[0]?.name == "public" ? "" : "pointer-events-none"}`}
                                placeholder="Respuesta">
                              </Textarea>

                              {
                                user?.roles[0]?.name == "public" ?
                                  <>
                                    <Button
                                      onClick={async () => {
                                        try {
                                          await patchEntregable(setLoadingRespuesta, { value: values[entregable?.id] }, entregable?.id);
                                          toast({
                                            title: "Exito",
                                            description: "Gracias por su respuesta",
                                            action: <ToastAction altText="Aceotar">Aceptar</ToastAction>,
                                          })
                                        }
                                        catch (e) {

                                        }
                                      }}
                                    // disabled={loadingRespuesta}
                                    >

                                      Enviar<IoSend /></Button>
                                  </>
                                  :
                                  <></>
                              }


                            </TableCell>
                          </TableRow>
                        </>
                      )
                    }

                    if (entregable?.tipo == "Archivo") {
                      return (
                        <>
                          <TableRow>
                            <TableCell>
                              <div className='flex flex-col gap-3'>
                                <p>{entregable?.nombre}</p>
                                <p className='text-muted-foreground text-sm'>{entregable?.descripcion}</p>
                              </div>
                            </TableCell>
                            <TableCell>
                              {user?.roles[0]?.name == "public" && <MyDropzone entregableId={entregable?.id} setEntregables={setEntregables} />}

                              <ModalVerArchivo nombre={entregable?.archivos[0]?.nombre} url={entregable?.archivos[0]?.url} />

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
