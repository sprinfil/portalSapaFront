import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "../ui/button"
import MyDropzone from "./dropzone"
import { useEffect, useState } from "react";
import { FaCheck } from "react-icons/fa";
import { useToast } from "@/hooks/use-toast";
import { ToastAction } from "@radix-ui/react-toast";
import { getContratoById } from "@/lib/ContratoService";

export function RequisitosFactibilidadTable({ tramite }) {
  const [archivos, set_archivos] = useState([]);
  const cellStyles = ""
  const [requisitos, setRequisitos] = useState(tramite?.contrato?.requisitos);
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  return (
    <Table>
      <TableHeader className="bg-muted">
        <TableRow>
          <TableHead className="text-center w-[200px]">Requisito</TableHead>
          <TableHead className="text-center w-[400px]"></TableHead>
          <TableHead className="text-center w-[400px]">Documento</TableHead>
          <TableHead className="text-center w-[400px]">Estado</TableHead>
          <TableHead className="text-end"><Button>Marcar Documentación lista<FaCheck /></Button></TableHead>
          {/* <TableHead className="text-center">Original</TableHead>
          <TableHead className="text-center">Copia</TableHead> */}
        </TableRow>
      </TableHeader>
      <TableBody>

        {
          requisitos?.map(requisito => {

            const rows = [];
            let estadoStyles = "";

            if (requisito?.documentos[0]?.entregables[0]?.estado?.toUpperCase() == "ENTREGADO") {
              estadoStyles = "bg-green-200 p-3 text-gray-700 font-bold";
            }

            if (requisito?.documentos[0]?.entregables[0]?.estado?.toUpperCase() == "PENDIENTE") {
              estadoStyles = "bg-orange-200 p-3 text-gray-700 font-bold";
            }

            rows.push(
              <TableRow>
                <TableCell className="items-center text-center bg-muted" rowSpan={requisito?.documentos?.length} >{requisito?.nombre}</TableCell>
                <TableCell className="">{requisito?.documentos[0]?.nombre}</TableCell>
                <TableCell className="text-center"><Button variant={"link"}>{requisito?.documentos[0]?.entregables[0]?.archivos[0]?.nombre}</Button></TableCell>
                <TableCell className="text-center">
                  <p className={estadoStyles}>
                    {requisito?.documentos[0]?.entregables[0]?.estado?.toUpperCase()}
                  </p>

                </TableCell>
                <TableCell className={cellStyles}>
                  <MyDropzone set={set_archivos} entregableId={requisito?.documentos[0]?.entregables[0]?.id} />
                </TableCell>
              </TableRow>
            )

            requisito?.documentos?.map((documento, index) => {

              let estadoStyles = "";

              if (documento?.entregables[0]?.estado.toUpperCase() == "ENTREGADO") {
                estadoStyles = "bg-green-200 p-3 text-gray-700 font-bold";
              }

              if (documento?.entregables[0]?.estado.toUpperCase() == "PENDIENTE") {
                estadoStyles = "bg-orange-200 p-3 text-gray-700 font-bold";
              }


              if (index != 0) {
                rows.push(
                  < TableRow className="">
                    <TableCell>{documento?.nombre}</TableCell>
                    <TableCell className="text-center"> <Button variant={"link"}>{documento?.entregables[0]?.archivos[0]?.nombre}</Button> </TableCell>
                    <TableCell className="text-center">
                      <p className={estadoStyles}>
                        {documento?.entregables[0]?.estado.toUpperCase()}
                      </p>

                    </TableCell>
                    <TableCell className={cellStyles}><MyDropzone set={set_archivos} entregableId={documento?.entregables[0]?.id} /></TableCell>
                  </TableRow>
                )
              }
            })

            return rows;
          })
        }
      </TableBody>
    </Table >
  )
}
