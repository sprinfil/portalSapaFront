import React, { useRef, useMemo } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { TrendingUp } from "lucide-react"
import { Bar, BarChart, CartesianGrid, LabelList, XAxis, YAxis } from "recharts"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { Button } from "../ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import sapaLogo2 from "../../assets/sapalogo21.jpg"
import ayuntamiento from "../../assets/ayuntamiento.png"
import "../../index.css"
import { BsFilePdfFill } from "react-icons/bs";

const InspeccionAguaPDF = ({ inspeccion }) => {
  const pdfRef = useRef();
  const generatePDF = () => {
    const element = pdfRef.current;

    html2canvas(element, { scale: 2 }).then((canvas) => {
      const pdf = new jsPDF("p", "mm", "a4");
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();

      const canvasWidth = canvas.width;
      const canvasHeight = canvas.height;

      const imgHeight = (pdfWidth / canvasWidth) * canvasHeight; // Altura total del canvas escalado al ancho del PDF
      const pageHeightPx = (pdfHeight * canvasWidth) / pdfWidth; // Altura en píxeles del canvas equivalente a una página PDF

      let position = 0;

      while (position < canvasHeight) {
        const canvasPage = document.createElement("canvas");
        canvasPage.width = canvasWidth;
        canvasPage.height = pageHeightPx;

        const context = canvasPage.getContext("2d");
        context.drawImage(
          canvas,
          0,
          position,
          canvasWidth,
          pageHeightPx,
          0,
          0,
          canvasWidth,
          pageHeightPx
        );

        const pageData = canvasPage.toDataURL("image/png");
        pdf.addImage(
          pageData,
          "PNG",
          0,
          0,
          pdfWidth,
          pdfHeight,
          undefined,
          "FAST"
        );

        position += pageHeightPx;
        if (position < canvasHeight) pdf.addPage();
      }

      pdf.save(`inspeccions`);
    });
  };

  return (
    <>
      <Button className='mb-5' variant={"destructive"} onClick={generatePDF}>Exportar PDF<BsFilePdfFill /></Button>

      <div className="overflow-hidden h-0">
        <div
          ref={pdfRef}
          style={{
            width: "230mm",
            minHeight: "310mm",
            padding: "30px",
            background: "white",
            color: "black",
            margin: "0 auto",
            fontFamily: "Roboto, sans-serif",
          }}
        >
          <div className="flex  gap-4 items-center mb-[20px]">
            <img src={ayuntamiento} alt="" className="w-[70px] mr-[120px]" />

            <div className="text-[12px] text-center ">
              <p className="font-bold">H. XVII AYUNTAMIENTO DE LA PAZ</p>
              <p className="font-bold">ORGANISMO OPERADOR MUNICIPAL DEL SISTEMA DE AGUA POTABLE</p>
              <p className="font-bold">ALCANTARILLADO Y SANAMIENTO DE LA PAZ</p>
              <p>DEPARTAMENTO DE FACTIBILIDADES</p>
              <p className="font-bold">REPORTE DE INSPECCIÓN</p>
            </div>

            <div className="flex text-[13px] gap-2 ml-[120px]">
              <img src={sapaLogo2} alt="" className="w-[80px] h-[80px] -rotate-90" />
            </div>
          </div>

          <table className="min-w-full border border-gray-200">
            {/* <thead className="bg-gray-100">
              <tr>
                <th colSpan={6} className="px-4 py-2 text-sm font-bold border-b text-center">DATOS DE LA SOLICITUD</th>
              </tr>
            </thead> */}


            <tr>
              <td className="px-4 py-2 items-center text-sm text-gray-800 border font-bold text-right">No. Solicitud</td>
              <td className="px-4 py-2 items-center text-sm text-gray-800 border w-[200px]">{inspeccion?.no_solicitud}</td>
              <td className="px-4 py-2 items-center text-sm text-gray-800 border font-bold text-right">Fecha</td>
              <td className="px-4 py-2 items-center text-sm text-gray-800 border">{inspeccion?.fecha}</td>

            </tr>

            <tr>
              <td className="px-4 py-2 items-center text-sm text-gray-800 border font-bold text-right">Nombre / Razón social</td>
              <td className="px-4 py-2 items-center text-sm text-gray-800 border">{inspeccion?.nombre_razon_social}</td>
              <td className="px-4 py-2 items-center text-sm text-gray-800 border text-right font-bold">Número de teléfono</td>
              <td className="px-4 py-2 items-center text-sm text-gray-800 border text-rightx]">{inspeccion?.telefono}</td>
            </tr>

            <tr>
              <td className="px-4 py-2 items-center text-sm text-gray-800 border font-bold text-right">Ubicación</td>
              <td className="px-4 py-2 items-center text-sm text-gray-800 border">{inspeccion?.ubicacion}</td>
              <td className="px-4 py-2 items-center text-sm text-gray-800 border text-right font-bold">Trámite</td>
              <td className="px-4 py-2 items-center text-sm text-gray-800 border">{inspeccion?.no_solicitud}</td>
            </tr>

            <tr>
              <td className="px-4 py-2 items-center text-sm text-gray-800 border font-bold text-right">Colonia / Localidad</td>
              <td className="px-4 py-2 items-center text-sm text-gray-800 border">{inspeccion?.colonia_localidad}</td>
              <td className="px-4 py-2 items-center text-sm text-gray-800 border text-right font-bold">Giro</td>
              <td className="px-4 py-2 items-center text-sm text-gray-800 border">{inspeccion?.giro}</td>
            </tr>

            <tr>
              <td className="px-4 py-2 items-center text-sm text-gray-800 border font-bold text-right">Clave catastral</td>
              <td className="px-4 py-2 items-center text-sm text-gray-800 border">{inspeccion?.clave_catastral}</td>
              <td className="px-4 py-2 items-center text-sm text-gray-800 border text-right font-bold">Coordenadas de ubicación</td>
              <td className="px-4 py-2 items-center text-sm text-gray-800 border">{inspeccion?.coordenadas}</td>
            </tr>

            <tr>
              <td className="px-4 py-2 items-center text-sm text-gray-800 border font-bold text-right">Sector No.</td>
              <td className="px-4 py-2 items-center text-sm text-gray-800 border">{inspeccion?.sector_no}</td>
              <td className="px-4 py-2 items-center text-sm text-gray-800 border font-bold text-center bg-blue-100" colSpan={3}>RED DE AGUA POTABLE</td>
            </tr>
          </table>

          <table className=" w-full">
            <tr className="bg-cyan-600 text-white ">
              <th className="py-2 text-[14px]">OBSERVACIONES DE INSPECCIÓN</th>
            </tr>
          </table>

          <table className="">
            <tr>
              <td className="px-4 py-2 items-center text-sm text-gray-800 border font-bold text-center w-[180px] ">EXISTE</td>
              <td className="px-4 py-2 items-center text-sm text-gray-800 border font-bold text-center w-[80px]">SI</td>
              <td className="px-4 py-2 items-center text-sm text-gray-800 border font-bold text-center w-[80px]">NO</td>
              <td className="px-4 py-2 items-center text-sm text-gray-800 border font-bold text-center w-[530px]">OBSERVACIONES (INDICAR DIÁMETRO Y MATERIAL DE TUBERÍA)</td>
            </tr>

            <tr>
              <td className="px-4 py-2 items-center text-sm text-gray-800 border text-center w-[180px]">RED HIDRÁULICA INSTALADA Y AUTORIZADA FRENTE AL PERDIO</td>
              <td className="px-4 py-2 items-center text-sm text-gray-800 border text-center w-[80px]">{inspeccion?.red_instalada == 1 && "●"}</td>
              <td className="px-4 py-2 items-center text-sm text-gray-800 border text-center w-[80px]">{inspeccion?.red_instalada == 0 && "●"}</td>
              <td className="px-4 py-2 items-center text-sm text-gray-800 border text-center w-[510px]">{inspeccion?.red_instalada_observaciones}</td>
            </tr>

            <tr>
              <td className="px-4 py-2 items-center text-sm text-gray-800 border text-center w-[180px]">TOMA O PREPARACIÓN</td>
              <td className="px-4 py-2 items-center text-sm text-gray-800 border text-center w-[80px]">{inspeccion?.toma_preparacion == 1 && "●"}</td>
              <td className="px-4 py-2 items-center text-sm text-gray-800 border text-center w-[80px]">{inspeccion?.toma_preparacion == 0 && "●"}</td>
              <td className="px-4 py-2 items-center text-sm text-gray-800 border text-center w-[510px]">{inspeccion?.toma_preparacion_observaciones}</td>
            </tr>

            <tr>
              <td className="px-4 py-2 items-center text-sm text-gray-800 border text-center w-[180px]">MEDIDOR</td>
              <td className="px-4 py-2 items-center text-sm text-gray-800 border text-center w-[80px]">{inspeccion?.medidor == 1 && "●"}</td>
              <td className="px-4 py-2 items-center text-sm text-gray-800 border text-center w-[80px]">{inspeccion?.medidor == 0 && "●"}</td>
              <td className="px-4 py-2 items-center text-sm text-gray-800 border text-center w-[510px]">{inspeccion?.medidor_observaciones}</td>
            </tr>

            <tr>
              <td className="px-4 py-2 items-center text-sm text-gray-800 border text-center w-[180px]">PRESIÓN MANOMETRICA <span>(DEL PUNTO MÁS CERCANO)</span></td>
              <td className="px-4 py-2 items-center text-sm text-gray-800 border text-center w-[80px]" colSpan={2}>{inspeccion?.presion}</td>
              <td className="px-4 py-2 items-center text-sm text-gray-800 border text-center w-[510px]">{inspeccion?.presion_observaciones}</td>
            </tr>
          </table>

          <table className="w-full">
            <tr className="border">
              <th className="py-2 text-[14px]" colSpan={5}>EN CASO DE REQUERIR AMPLIACIÓN DE RED:</th>
            </tr>
            <tr>
              <td className="px-4 py-2 items-center text-sm text-gray-800 border text-center font-bold">DEMOLICIÓN</td>
              <td className="px-4 py-2 items-center text-sm text-gray-800 border text-center font-bold">ASFALTO</td>
              <td className="px-4 py-2 items-center text-sm text-gray-800 border text-center font-bold">CONCRETO</td>
              <td className="px-4 py-2 items-center text-sm text-gray-800 border text-center font-bold">EMPEDRADO</td>
              <td className="px-4 py-2 items-center text-sm text-gray-800 border text-center font-bold">TERRENO NATURAL</td>
            </tr>
            <tr>
              <td className="px-4 py-2 items-center text-sm text-gray-800 border text-center">DISTANCIAS:</td>
              <td className="px-4 py-2 items-center text-sm text-gray-800 border text-center">{inspeccion?.tipo_demolicion == "asfalto" && inspeccion?.tipo_demolicion_metros}</td>
              <td className="px-4 py-2 items-center text-sm text-gray-800 border text-center">{inspeccion?.tipo_demolicion == "concreto" && inspeccion?.tipo_demolicion_metros}</td>
              <td className="px-4 py-2 items-center text-sm text-gray-800 border text-center">{inspeccion?.tipo_demolicion == "empedrado" && inspeccion?.tipo_demolicion_metros}</td>
              <td className="px-4 py-2 items-center text-sm text-gray-800 border text-center">{inspeccion?.tipo_demolicion == "terrenoNatural" && inspeccion?.tipo_demolicion_metros}</td>
            </tr>
            <tr>
              <td className="px-4 py-2 items-center text-sm text-gray-800 border text-center h-[70px]">OBSERVACIONES / MATERIALES</td>
              <td className="px-4 py-2 items-center text-sm text-gray-800 border text-center" colSpan={5}>{inspeccion?.observaciones_demolicion_metros}</td>
            </tr>
            <tr>
              <td className="px-4 py-2 items-center text-sm text-gray-800 border text-center font-bold">EXCAVACIÓN TIPO DE SUELO</td>
              <td className="px-4 py-2 items-center text-sm text-gray-800 border text-center font-bold">A</td>
              <td className="px-4 py-2 items-center text-sm text-gray-800 border text-center font-bold">B</td>
              <td className="px-4 py-2 items-center text-sm text-gray-800 border text-center font-bold">C</td>
              <td className="px-4 py-2 items-center text-sm text-gray-800 border text-center font-bold">D</td>
            </tr>
            <tr>
              <td className="px-4 py-2 items-center text-sm text-gray-800 border text-center">PROFUNDIDAD:</td>
              <td className="px-4 py-2 items-center text-sm text-gray-800 border text-center">{inspeccion?.tipo_suelo == "A" && inspeccion?.tipo_suelo_metros}</td>
              <td className="px-4 py-2 items-center text-sm text-gray-800 border text-center">{inspeccion?.tipo_suelo == "B" && inspeccion?.tipo_suelo_metros}</td>
              <td className="px-4 py-2 items-center text-sm text-gray-800 border text-center">{inspeccion?.tipo_suelo == "C" && inspeccion?.tipo_suelo_metros}</td>
              <td className="px-4 py-2 items-center text-sm text-gray-800 border text-center">{inspeccion?.tipo_suelo == "D" && inspeccion?.tipo_suelo_metros}</td>
            </tr>
            <tr>
              <td className="px-4 py-2 items-center text-sm text-gray-800 border text-center h-[70px]">OBSERVACIONES / MATERIALES</td>
              <td className="px-4 py-2 items-center text-sm text-gray-800 border text-center" colSpan={5}>{inspeccion?.observaciones_suelo_metros}</td>
            </tr>
          </table>


          <div className="w-full items-center flex justify-between mt-2">

            <div className=" flex flex-col items-center justify-center text-[12px]">
              <p className="text-gray-400 mb-2">RESPONSABLE DEL SECTOR</p>
              <div className="bg-black h-[1px] w-[200px]"></div>
              <p>NOMBRE Y FIRMA</p>
            </div>

            <div className=" flex flex-col items-center justify-center text-[12px]">
              <p className="text-gray-400 mb-2">INSPECTOR ASIGNADO</p>
              <div className="bg-black h-[1px] w-[200px]"></div>
              <p>NOMBRE Y FIRMA</p>
            </div>

            <div className=" flex flex-col items-center justify-center text-[12px]">
              <p className="text-gray-400 mb-2">RESPONSABLE ÁREA FACTIBILIDADES</p>
              <div className="bg-black h-[1px] w-[200px]"></div>
              <p>ARQ. AGUSTIN A. MEZA LORA</p>
            </div>

          </div>


        </div>


      </div>
    </>

  );
};

export default InspeccionAguaPDF;