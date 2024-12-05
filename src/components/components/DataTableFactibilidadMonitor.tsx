"use client"

import * as React from "react"
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"
import { ArrowUpDown, ChevronDown, MoreHorizontal } from "lucide-react"

import { Button } from "@/components/ui/button"
import { IoEyeOutline } from "react-icons/io5";
import { Checkbox } from "@/components/ui/checkbox"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { useNavigate } from 'react-router-dom';
import { FaMagnifyingGlass } from "react-icons/fa6";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { indexTramites } from "@/lib/TramiteService"
import { useToast } from "@/hooks/use-toast"
import { ToastAction } from "@radix-ui/react-toast"
import 'dayjs/locale/es'; //
import dayjs from 'dayjs';
import { Loader } from "./Loader"
import { FiltrosFactibilidadMonitor } from "./FiltrosFactibilidadMonitor"
import { LuEraser } from "react-icons/lu";


/*
        'search',
        'folio',
        'id_solicitante',
        'id_contrato',
        'estado',
        'etapa',
        'modalidad',
        'giro_comercial',
        'fecha_solicitud_inicio',
        'fecha_solicitud_fin',
        'fecha_finalizacion_inicio',
        'fecha_finalizacion_fin',
*/


export function DataTableFactibilidadMonitor() {
  dayjs.locale('es');
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  )
  const [data, setData] = React.useState([]);
  const [loading, setLoading] = React.useState([]);
  const [params, setParams] = React.useState({});
  const { toast } = useToast();

  React.useEffect(() => {
    try {
      indexTramites(setLoading, params, setData);
    } catch (e) {
      toast({
        title: "Error",
        description: "Ocurrio un error al buscar los tramites",
        action: <ToastAction altText="Aceotar">Aceptar</ToastAction>,
        variant: "destructive"
      })
    }
  }, [])

  // const [pagination, setPagination] = React.useState({
  //   pageIndex: 0, //initial page index
  //   pageSize: 2, //default page size
  // });
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({})
  const navigate = useNavigate();
  const [rowSelection, setRowSelection] = React.useState({})

  const columns = [
    {
      accessorKey: "folio",
      header: "Folio",
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue("folio")}</div>
      ),
    },
    {
      accessorKey: "solicitante_nombre",
      header: "Solicitante",
      cell: ({ row }) => {
        const data = row.original
        return (
          <div className="capitalize">{data?.solicitante_nombre}</div>
        )
      }
    },
    {
      accessorKey: "contrato_nombre",
      header: "Tipo de factibilidad",
      cell: ({ row }) => {
        const data = row.original
        return (
          <div className="capitalize">{data?.contrato_nombre}</div>
        )
      }
    },
    {
      accessorKey: "localidad",
      header: "Localidad",
      cell: ({ row }) => {
        const data = row.original
        return (
          <div className="capitalize">{data?.localidad}</div>
        )
      }
    },
    {
      accessorKey: "fecha_solicitud",
      header: "Fecha de solicitud",
      cell: ({ row }) => {
        const data = row.original
        return (
          <div className="capitalize">
            {dayjs(row.getValue("fecha_solicitud")).format("D [de] MMMM [del] YYYY")}
          </div>
        )
      }
    },
    {
      accessorKey: "etapa",
      header: "Etapa",
      cell: ({ row }) => {
        const data = row.original
        return (
          <div className="capitalize">
            {row.getValue("etapa")}
          </div>
        )
      }
    },
    {
      accessorKey: "estado",
      header: "Estado",
      cell: ({ row }) => {
        const data = row.original
        return (
          <div className="capitalize">
            {row.getValue("estado")}
          </div>
        )
      }
    },
    {
      id: "actions",
      enableHiding: false,
      cell: ({ row }) => {
        const tramite = row.original

        return (
          <>
            <div className="flex items-center justify-end">
              <Button onClick={() => navigate(`/factibilidadDashboard/verFactibilidadAdmin?tramiteId=${tramite?.id}`)}>Ver<IoEyeOutline /></Button>
            </div>
          </>
        )
      },
    },
  ]
  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
      // pagination
    },
  })

  return (
    <div className="w-full flex flex-col">
      <FiltrosFactibilidadMonitor params={params} setParams={setParams} />
      <div className="ml-auto my-3 flex gap-3 flex-wrap">
        <Button
          disabled={loading}
          onClick={async () => {
            try {
              await indexTramites(setLoading, params, setData);
            } catch (e) {
              toast({
                title: "Error",
                description: "Ocurrio un error al buscar los tramites",
                action: <ToastAction altText="Aceotar">Aceptar</ToastAction>,
                variant: "destructive"
              })
            }
          }}
        >Aplicar filtros<FaMagnifyingGlass /></Button>

        <Button
          variant={"outline"}
          className="text-blue-500"
          disabled={loading}
          onClick={async () => {
            try {
              await indexTramites(setLoading, params, setData);
              setParams(
                {
                  folio: "",
                  id_contrato: "",
                  estado: "",
                  etapa: "",
                  fecha_solicitud_inicio: "",
                  fecha_solicitud_fin: ""
                }
              );
            } catch (e) {
              toast({
                title: "Error",
                description: "Ocurrio un error al buscar los tramites",
                action: <ToastAction altText="Aceotar">Aceptar</ToastAction>,
                variant: "destructive"
              })
            }

          }}>Limpiar filtros<LuEraser /></Button>

      </div>
      {
        loading && <div className="flex w-full items-center justify-center"><Loader /></div>
      }
      {
        !loading &&
        <>



          <div className="rounded-md border">
            <Table>
              <TableHeader>
                {table.getHeaderGroups().map((headerGroup) => (
                  <TableRow key={headerGroup.id}>
                    {headerGroup.headers.map((header) => {
                      return (
                        <TableHead key={header.id}>
                          {header.isPlaceholder
                            ? null
                            : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                        </TableHead>
                      )
                    })}
                  </TableRow>
                ))}
              </TableHeader>
              <TableBody>
                {table.getRowModel().rows?.length ? (
                  table.getRowModel().rows.map((row) => (
                    <TableRow
                      key={row.id}
                      data-state={row.getIsSelected() && "selected"}
                    >
                      {row.getVisibleCells().map((cell) => (
                        <TableCell key={cell.id}>
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={columns.length}
                      className="h-24 text-center"
                    >
                      No results.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
          <div className="flex items-center justify-end space-x-2 py-4">
            <div className="space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => table.previousPage()}
                disabled={!table.getCanPreviousPage()}
              >
                Previous
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => table.nextPage()}
                disabled={!table.getCanNextPage()}
              >
                Next
              </Button>
            </div>
          </div>
        </>
      }



    </div>
  )
}
