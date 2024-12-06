import React, { useEffect, useState } from 'react'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { PlusCircle } from "lucide-react"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { BsPencilSquare } from "react-icons/bs";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"


import { useLocation, useNavigate, useNavigation } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast'
import { ToastAction } from '@radix-ui/react-toast'
import { Input } from '@/components/ui/input'
import { getRequisitoCatalogoById, updateRequisitoCatalogo } from '@/lib/RequisitoService'
import { Loader } from '@/components/components/Loader'
import { Button } from '@/components/ui/button'
import { ModalCrearDocumento } from '@/components/components/ModalCrearDocumento'
import { ModalEditarDocumento } from '@/components/components/ModalEditarDocumento'
import { getContratos, requisitosContratosBulkCreate, requisitosContratosBulkDelete } from '@/lib/ContratoService'

export const VerRequisitoFactibilidad = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const requisitoId = queryParams.get('requisitoId');
  const navigate = useNavigate();
  const { toast } = useToast();
  const [requisito, setRequisito] = useState({}
  );
  const [loading, setLoading] = useState(false);
  const [contratos, setContratos] = useState([]);
  const [loadingContratos, setLoadingContratos] = useState(false);
  const [editandoContratos, setEditandoContratos] = useState(false);
  const [arrayEliminarRequisitoContrato, setArrayEliminarRequisitoContrato] = useState([]);
  const [arrayCrearRequisitoContrato, setArrayCrearRequisitoContrato] = useState([]);

  useEffect(() => {
    try {
      getRequisitoCatalogoById(setLoading, requisitoId, setRequisito);
      getContratos(setLoadingContratos, setContratos);

    } catch (e) {
      toast({
        title: "Error",
        description: "Ocurrio un error al consultar el requisito",
        variant: "destructive",
        action: <ToastAction altText="Aceptar">Aceptar</ToastAction>
      })
    }
  }, [])
  useEffect(() => { form.reset(requisito); }, [requisito])

  const formSchema = z.object({
    nombre: z.string().min(2, {
      message: "El requisito debe tener al menos 2 caracteres",
    }),
  })

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      ...requisito
    },
  })
  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const { newRequisito } = await updateRequisitoCatalogo(setLoading, requisitoId, values);
      setRequisito(prev => {
        return { ...prev, nombre: newRequisito?.nombre };
      })
    } catch (e) {
      toast({
        title: "Error",
        description: "Ocurrio un error al crear el requisito",
        variant: "destructive",
        action: <ToastAction altText="Aceptar">Aceptar</ToastAction>
      })
    }
  }

  const checkIfChecked = (requisito_contratos, id_contrato): boolean => {
    if (Array.isArray(requisito_contratos)) {
      return requisito_contratos.some(item => item.id_contrato === id_contrato);
    } else {
      return false;
    }
  }

  const getIdsByContrato = (requisito_contratos: Array<{ id_contrato: any; id: any }>, id_contrato: any): any[] => {
    if (Array.isArray(requisito_contratos)) {
      return requisito_contratos
        .filter(item => item.id_contrato === id_contrato)
        .map(item => item.id);
    } else {
      return [];
    }
  };

  useEffect(() => {
    console.log(arrayCrearRequisitoContrato)
  }, [arrayCrearRequisitoContrato])


  return (
    <Card className='w-full h-full'>
      <CardHeader>
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink className='cursor-pointer' onClick={() => navigate("/requisitos")}>Requisitos</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Requisito: {requisito?.nombre}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </CardHeader>
      <CardContent>
        {loading && <Loader />}
        {!loading &&
          <>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                  control={form.control}
                  name="nombre"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nombre</FormLabel>
                      <FormControl>
                        <Input placeholder="nombre" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button type='submit'>Guardar</Button>
              </form>
            </Form>
            <div className='mt-10'>
              <div className='flex gap-4 flex-wrap mb-4 items-center'>
                <p className='text-sm'>Documentos</p>
                <ModalCrearDocumento requisitoId={requisitoId} setRequisito={setRequisito} />
              </div>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nombre</TableHead>
                    <TableHead>Descripcion</TableHead>
                    <TableHead>Tipo</TableHead>
                    <TableHead>
                      Tipo de factibilidad
                      {editandoContratos ?
                        <>
                          <div className='flex gap-4 items-center my-4'>
                            <Button
                              onClick={async () => {
                                try {
                                  if (arrayCrearRequisitoContrato.length > 0) {
                                    await requisitosContratosBulkCreate(setLoading, arrayCrearRequisitoContrato);
                                  }
                                  if (arrayEliminarRequisitoContrato.length > 0) {
                                    await requisitosContratosBulkDelete(setLoading, arrayEliminarRequisitoContrato);
                                  }
                                  await getRequisitoCatalogoById(setLoading, requisitoId, setRequisito);
                                  setEditandoContratos(false);
                                  setArrayEliminarRequisitoContrato([]);
                                  setArrayCrearRequisitoContrato([]);
                                } catch (e) {
                                  toast({
                                    title: "Error",
                                    description: "Ocurrio un error al actualizar los datos",
                                    action: <ToastAction altText='Aceptar'>Aceptar</ToastAction>,
                                    variant: "destructive"
                                  })
                                }
                              }}
                            >Aceptar y guardar</Button>
                            <Button variant={"outline"}
                              onClick={() => {
                                getRequisitoCatalogoById(setLoading, requisitoId, setRequisito);
                                setEditandoContratos(false);
                                setArrayEliminarRequisitoContrato([]);
                                setArrayCrearRequisitoContrato([]);
                              }}
                              className='text-red-500'
                            >Cancelar</Button>
                          </div>
                        </> : <></>}

                    </TableHead>
                    <TableHead></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {
                    requisito?.documentos?.map(documento => {
                      return (
                        <TableRow>
                          <TableCell>{documento?.nombre}</TableCell>
                          <TableCell>{documento?.descripcion}</TableCell>
                          <TableCell>{documento?.tipo}</TableCell>

                          <TableCell>
                            <div className='flex flex-col gap-3'>
                              {
                                contratos?.map(contrato => {
                                  return (
                                    <div className='flex gap-2'>
                                      <input data-id={getIdsByContrato(documento?.requisito_contratos, contrato?.id)[0]} type="checkbox" className='w-[20px] h-[20px]'
                                        defaultChecked={
                                          checkIfChecked(documento?.requisito_contratos, contrato?.id)
                                        }
                                        onClick={(event) => {
                                          setEditandoContratos(true);
                                          const dataId = event.target.dataset.id;
                                          if (dataId) {
                                            if (arrayEliminarRequisitoContrato.some(item => item === dataId)) {
                                              setArrayEliminarRequisitoContrato(prev => {
                                                return prev.filter(item => item != dataId);
                                              })
                                            } else {
                                              setArrayEliminarRequisitoContrato(prev => {
                                                return [...prev, dataId];
                                              })
                                            }
                                          } else {

                                            const newRequisito = {
                                              id_requisito: parseFloat(requisitoId),
                                              id_documento: documento?.id,
                                              id_contrato: contrato?.id,
                                            };

                                            setArrayCrearRequisitoContrato(prev => {

                                              const exists = prev.some(
                                                item =>
                                                  item.id_requisito === newRequisito.id_requisito &&
                                                  item.id_documento === newRequisito.id_documento &&
                                                  item.id_contrato === newRequisito.id_contrato
                                              );

                                              if (exists) {

                                                return prev.filter(
                                                  item =>
                                                    !(
                                                      item.id_requisito === newRequisito.id_requisito &&
                                                      item.id_documento === newRequisito.id_documento &&
                                                      item.id_contrato === newRequisito.id_contrato
                                                    )
                                                );
                                              } else {

                                                return [...prev, newRequisito];
                                              }
                                            });


                                          }

                                        }}
                                      />
                                      <p>{contrato?.nombre}</p>
                                    </div>
                                  )
                                })
                              }
                            </div>
                          </TableCell>

                          <TableCell>
                            <ModalEditarDocumento documento={documento} setRequisito={setRequisito} />
                          </TableCell>

                        </TableRow>
                      )
                    })
                  }

                </TableBody>
              </Table>
            </div>

          </>
        }

      </CardContent>
    </Card>
  )
}
