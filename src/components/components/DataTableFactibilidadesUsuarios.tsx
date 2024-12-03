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
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { FiPlusCircle } from "react-icons/fi";
import { IoEyeOutline } from "react-icons/io5";
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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import ZustandPrincipal from "@/Zustand/ZustandPrincipal";
import { getTramitesByUserId } from "@/lib/TramiteService";
import dayjs from 'dayjs';
import 'dayjs/locale/es'; // Importar el idioma español
import { Loader } from "./Loader";
dayjs.locale('es');

export function DataTableFactibilidadesUsuarios() {
  const [data, setData] = React.useState([]);
  const { user } = ZustandPrincipal();
  const navigate = useNavigate();
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [loading, setLoading] = React.useState(false);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  )
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = React.useState({})

  React.useEffect(() => {
    getTramitesByUserId(setLoading, user?.id, setData);
  }, [])
  const columns = [
    {
      accessorKey: "folio",
      header: "Folio",
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue("folio")}</div>
      ),
    },
    {
      accessorKey: "fecha_solicitud",
      header: "Fecha de solicitud",
      cell: ({ row }) => (
        <div className="">
          {dayjs(row.getValue("fecha_solicitud")).format("D [de] MMMM [del] YYYY")}
        </div>
      ),
    },
    {
      accessorKey: "etapa",
      header: "Etapa",
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue("etapa")}</div>
      ),
    },
    {
      accessorKey: "estado",
      header: "Estado",
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue("estado").toUpperCase()}</div>
      ),
    },
    {
      id: "actions",
      enableHiding: false,
      cell: ({ row }) => {
        const tramite = row.original

        return (
          <>
            <div className="flex gap-3 w-full items-center justify-end">
              {/* <Button>Descargar Factibilidad</Button> */}
              <Button onClick={() => navigate(`/factibilidadDashboard/verFactibilidad?tramiteId=${tramite?.id}`)}>Ver<IoEyeOutline /></Button>
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
    },
  })

  return (
    <div className="w-full">
      {
        loading ? <div className="flex w-full items-center justify-center"><Loader /></div> :
          <>
            <div className="flex items-center py-4 flex-nowrap">
              <Input
                placeholder="Folio ..."
                value={(table.getColumn("email")?.getFilterValue() as string) ?? ""}
                onChange={(event) =>
                  table.getColumn("email")?.setFilterValue(event.target.value)
                }
                className="w-[200px]"
              />

              <Button onClick={() => navigate("/crearFactibilidad")} className="ml-auto">Nueva Factbilidad <FiPlusCircle /></Button>

            </div>
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
