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
import ZustandPrincipal from "@/Zustand/ZustandPrincipal";
import { useNavigate } from "react-router-dom";
import { ModalVerArchivo } from "./ModalVerArchivo";
import { ModalRechazarEntregable } from "./ModalRechazarEntregable";
import { SiGooglemaps } from "react-icons/si";
import { ModalEstablecerUbicacion } from "./ModalEstablecerUbicacion";

export function RequisitosFactibilidadTable({ tramite }) {
  const [archivos, set_archivos] = useState([]);
  const cellStyles = ""
  const [requisitos, setRequisitos] = useState(tramite?.contrato?.requisitos);
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const { user } = ZustandPrincipal();
  const navigate = useNavigate();

  return (
    <Table>
      <TableHeader className="bg-muted">
        <TableRow>
          <TableHead className="text-center w-[200px]">Requisito</TableHead>
          <TableHead className="text-center w-[400px]"></TableHead>
          <TableHead className="text-center w-[400px]"></TableHead>
          <TableHead className="text-center w-[400px]"></TableHead>
          <TableHead className="text-center w-[400px]">Estado</TableHead>
          <TableHead className="text-end">
            {
              user?.roles[0]?.name == "public" ?
                <>
                </>
                :
                <>
                  <Button>Marcar Documentación lista<FaCheck /></Button>
                </>
            }

          </TableHead>
          {/* <TableHead className="text-center">Original</TableHead>
          <TableHead className="text-center">Copia</TableHead> */}
        </TableRow>
      </TableHeader>
      <TableBody>

        {
          requisitos?.map((requisito, index) => {

            const rows = [];
            let estadoStyles = "";

            if (requisito?.documentos[0]?.entregables[0]?.estado?.toUpperCase() == "ENTREGADO") {
              estadoStyles = "bg-green-200 p-3 text-gray-700 font-bold";
            }

            if (requisito?.documentos[0]?.entregables[0]?.estado?.toUpperCase() == "PENDIENTE") {
              estadoStyles = "bg-orange-200 p-3 text-gray-700 font-bold";
            }


            if (requisito?.documentos[0]?.entregables[0]?.estado?.toUpperCase() == "RECHAZADO") {
              estadoStyles = "bg-red-300 p-3 text-gray-700 font-bold";
            }

            rows.push(
              <TableRow key={index}>
                <TableCell className="items-center text-center bg-muted" rowSpan={requisito?.documentos?.length} >{requisito?.nombre}</TableCell>
                <TableCell className="">{requisito?.documentos[0]?.nombre}</TableCell>
                <TableCell className="text-center">

                  <ModalVerArchivo
                    nombre={requisito?.documentos[0]?.entregables[0]?.archivos[0]?.nombre}
                    url={requisito?.documentos[0]?.entregables[0]?.archivos[0]?.url}
                  />
                </TableCell>
                <TableCell className={cellStyles}>
                  {
                    user?.roles[0]?.name == "public" ?
                      <>
                        <MyDropzone set={set_archivos} entregableId={requisito?.documentos[0]?.entregables[0]?.id} setRequisitos={setRequisitos} />
                      </> :
                      <>
                        {
                          requisito?.documentos[0]?.entregables[0]?.estado == "entregado" && <ModalRechazarEntregable setRequisitos={setRequisitos} entregableId={requisito?.documentos[0]?.entregables[0]?.id} />
                        }
                      </>
                  }
                </TableCell>

                <TableCell className="text-center">
                  <p className={estadoStyles}>
                    {requisito?.documentos[0]?.entregables[0]?.estado?.toUpperCase()}
                  </p>
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

              if (documento?.entregables[0]?.estado.toUpperCase() == "RECHAZADO") {
                estadoStyles = "bg-red-300 p-3 text-gray-700 font-bold";
              }


              if (index != 0) {
                rows.push(
                  < TableRow className="" key={index}>
                    <TableCell>{documento?.nombre}</TableCell>
                    <TableCell className="text-center">
                      <ModalVerArchivo
                        nombre={documento?.entregables[0]?.archivos[0]?.nombre}
                        url={documento?.entregables[0]?.archivos[0]?.url}
                      />
                    </TableCell>
                    <TableCell className={cellStyles}>
                      {
                        user?.roles[0]?.name == "public" ?
                          <>
                            {documento?.tipo == "Archivo" && <MyDropzone set={set_archivos} entregableId={documento?.entregables[0]?.id} setRequisitos={setRequisitos} />}
                            {documento?.tipo == "Point" && <ModalEstablecerUbicacion entregableId={documento?.entregables[0]?.id} setRequisitos={setRequisitos} />}

                          </> :
                          <>
                            {
                              documento?.entregables[0]?.estado == "entregado" && <ModalRechazarEntregable setRequisitos={setRequisitos} entregableId={documento?.entregables[0]?.id} />
                            }
                          </>
                      }
                      {documento?.tipo == "Point" && <>
                        <iframe
                          width="100%"
                          height="150"
                          style={{ border: 0 }}
                          loading="lazy"
                          allowFullScreen
                          src={`https://maps.google.com/maps?q=${tramite?.posicion?.coordinates[1]},${tramite?.posicion?.coordinates[0]}&z=${15}&output=embed`}
                        /></>}
                    </TableCell>

                    <TableCell className="text-center">
                      <p className={estadoStyles}>
                        {documento?.entregables[0]?.estado.toUpperCase()}
                      </p>
                    </TableCell>
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
