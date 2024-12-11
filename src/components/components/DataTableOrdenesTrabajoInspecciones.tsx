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
import { IoEyeOutline } from "react-icons/io5";
import { Button } from "@/components/ui/button"
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
import { PlusCircle } from "lucide-react"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { getInspecciones, storeInspeccion } from "@/lib/InspeccionService";
import { useToast } from "@/hooks/use-toast";
import { ToastAction } from "@radix-ui/react-toast";
import { useNavigate } from "react-router-dom";
import { Loader } from "./Loader";


export function DataTableOrdenesTrabajoInspecciones({ setOrdenTrabajo, tramite }) {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  )
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = React.useState({})
  const [data, setData] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [loadingStore, setLoadingStore] = React.useState(false);
  const [params, setParams] = React.useState(
    {
      id_tramite: tramite.id
    })

  React.useEffect(() => {
    try {
      getInspecciones(setLoading, params, setData);
    } catch (e) {

      toast({
        title: "Error",
        description: "Ocurrió un error buscando las inspecciones",
        action: <ToastAction altText="Aceptar">Aceptar</ToastAction>,
        variant: "destructive",
      })

    }

  }, [])

  const columns = [
    {
      accessorKey: "no_solicitud",
      header: "No.",
      // cell: ({ row }) => (
      //   <div className="capitalize">{row.getValue("status")}</div>
      // ),
    },
    {
      accessorKey: "tipo_inspeccion",
      header: "Tipo",
      // cell: ({ row }) => (
      //   <div className="capitalize">{row.getValue("status")}</div>
      // ),
    },
    {
      accessorKey: "fecha",
      header: "Fecha",
      // cell: ({ row }) => (
      //   <div className="capitalize">{row.getValue("status")}</div>
      // ),
    },
    {
      accessorKey: "sector_no",
      header: "Sector",
      // cell: ({ row }) => (
      //   <div className="capitalize">{row.getValue("status")}</div>
      // ),
    },
    {
      id: "actions",
      enableHiding: false,
      cell: ({ row }) => {
        const inspeccion = row.original
        return (
          <div className="flex w-full">
            <Button className="ml-auto"
              onClick={() => {
                setOrdenTrabajo(inspeccion);
              }}
            >
              Ver
              <IoEyeOutline /></Button>
          </div>
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
    },
  })

  return (
    <div className="w-full">
      <div className="flex flex-wrap items-center py-4 gap-4">
        <Input
          placeholder="Filter emails..."
          value={(table.getColumn("email")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("email")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
        <div className="flex gap-3 items-center md:ml-auto">
          <Button onClick={() => {
            try {
              storeInspeccion(setLoading,
                {
                  id_tramite: tramite?.id,
                  tipo_inspeccion: "agua",
                  sector_no: 1,
                },
                setData
              )
            } catch (e) {
              toast({
                title: "Error",
                description: "Ocurrió un error creando la inspección",
                action: <ToastAction altText="Aceptar">Aceptar</ToastAction>,
                variant: "destructive",
              })
            }
          }} disabled={loading} className="">
            Crear Inspección de Agua<PlusCircle />
          </Button>
          <Button className="">
            Crear Inspección de Alcantarillado<PlusCircle />
          </Button>
        </div>

      </div>

      {
        loading ?
          <Loader />
          :
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
