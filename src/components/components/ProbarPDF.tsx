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
import sapaLogo2 from "../../assets/sapalogo2.png"
import "../../index.css"

const ProbarPDF = ({tramite}) => {
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

      pdf.save(`${tramite?.folio}`);
    });
  };

  return (
    <>
      <Button className='absolute right-0' onClick={generatePDF}>Descargar PDF</Button>
      <div className="overflow-hidden h-[0px]">
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
          <div className="flex justify-between gap-4 items-center">
            <img src={sapaLogo2} alt="" className="w-[120px]" />
            <div className="text-[12px] text-center">
              <p>SOLICITUD DE CONTRATACIÓN DEDL SERVICIO DE AGUA POTABLE Y/O ALCANTARILLADO</p>
            </div>
            <div className="flex text-[13px] gap-2">
              <p className="font-bold">Folio:</p>
              <p className="">{tramite?.folio}</p>
            </div>
          </div>

          <table className="min-w-full border border-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th colSpan={6} className="px-4 py-2 text-sm font-bold border-b text-center">DATOS DE LA SOLICITUD</th>
              </tr>
            </thead>


            <tr>
              <td className="px-4 py-2 items-center text-sm text-gray-800 border-b font-bold text-right">Fecha de la solicitud</td>
              <td className="px-4 py-2 text-sm text-gray-800 border-b " colSpan={3}>{tramite?.fecha_solicitud}</td>
              <td className="px-4 py-2 text-sm text-gray-800 border-b font-bold text-right">Localidad</td>
              <td className="px-4 py-2 text-sm text-gray-800 border-b ">{tramite?.localidad}</td>
            </tr>

            <tr className="">
              <td className="px-4 py-2 text-sm text-gray-800 border-b font-bold text-right">Contrato solicitado</td>
              <td className="px-4 py-2 text-sm text-gray-800 border-b " colSpan={5}>{tramite?.contrato_nombre}</td>
            </tr>

            <tr className="">
              <td className="px-4 py-2 text-sm text-gray-800 border-b font-bold text-right">Modalidad</td>
              <td className="px-4 py-2 text-sm text-gray-800 border-b " colSpan={3} >{tramite?.modalidad}</td>
              <td className="px-4 py-2 text-sm text-gray-800 border-b font-bold text-right">Giro Comercial:</td>
              <td className="px-4 py-2 text-sm text-gray-800 border-b">{tramite?.giro_comercial}</td>
            </tr>

            {/* datos del propietario */}
            <thead className="bg-gray-100">
              <tr>
                <th colSpan={6} className="px-4 py-2 text-sm font-bold border-b text-center">DATOS DEL PROPIETARIO</th>
              </tr>
            </thead>

            <tr className="">
              <td className="px-4 py-2 text-sm text-gray-800 border-b font-bold text-right">Nombre Completo:</td>
              <td className="px-4 py-2 text-sm text-gray-800 border-b" colSpan={5}>{tramite?.propietario_nombre}</td>
            </tr>
            <tr className="">
              <td className="px-4 py-2 text-sm text-gray-800 border-b font-bold text-right">Razón social</td>
              <td className="px-4 py-2 text-sm text-gray-800 border-b" colSpan={5}>{tramite?.propietario_razon_social}</td>
            </tr>
            <tr className="">
              <td className="px-4 py-2 text-sm text-gray-800 border-b font-bold text-right">Domicilio:</td>
              <td className="px-4 py-2 text-sm text-gray-800 border-b" colSpan={5}>{tramite?.propietario_domicilio}</td>
            </tr>
            <tr className="">
              <td className="px-4 py-2 text-sm text-gray-800 border-b font-bold text-right">Localidad:</td>
              <td className="px-4 py-2 text-sm text-gray-800 border-b" colSpan={3}>{tramite?.propietario_localidad}</td>
              <td className="px-4 py-2 text-sm text-gray-800 border-b font-bold text-right">Código Postal:</td>
              <td className="px-4 py-2 text-sm text-gray-800 border-b t">{tramite?.propietario_codigo_postal}</td>
            </tr>
            <tr className="">
              <td className="px-4 py-2 text-sm text-gray-800 border-b font-bold text-right">Correo electrónico: </td>
              <td className="px-4 py-2 text-sm text-gray-800 border-b">{tramite?.propietario_correo_electronico}</td>
              <td className="px-4 py-2 text-sm text-gray-800 border-b font-bold text-right w-[90px]">Tel. Fijo: </td>
              <td className="px-4 py-2 text-sm text-gray-800 border-b">{tramite?.propietario_telefono_fijo}</td>
              <td className="px-4 py-2 text-sm text-gray-800 border-b font-bold text-right">Tel. Móvil: </td>
              <td className="px-4 py-2 text-sm text-gray-800 border-b">{tramite?.propietario_telefono_movil}</td>
            </tr>

            {/* DATOS DEL APODERADO LEGAL O REPRESENTANTE PERSONAL */}
            <thead className="bg-gray-100">
              <tr>
                <th colSpan={6} className="px-4 py-2 text-sm font-bold border-b text-center">DATOS DEL APODERADO LEGAL O REPRESENTANTE PERSONAL</th>
              </tr>
            </thead>

            <tr className="">
              <td className="px-4 py-2 text-sm text-gray-800 border-b font-bold text-right">Nombre Completo:</td>
              <td className="px-4 py-2 text-sm text-gray-800 border-b" colSpan={5}>{tramite?.apoderado_nombre}</td>
            </tr>
            <tr className="">
              <td className="px-4 py-2 text-sm text-gray-800 border-b font-bold text-right">Domicilio:</td>
              <td className="px-4 py-2 text-sm text-gray-800 border-b" colSpan={5}>{tramite?.apoderado_domicilio}</td>
            </tr>
            <tr className="">
              <td className="px-4 py-2 text-sm text-gray-800 border-b font-bold text-right">Localidad:</td>
              <td className="px-4 py-2 text-sm text-gray-800 border-b" colSpan={3}>{tramite?.apoderado_localidad}</td>
              <td className="px-4 py-2 text-sm text-gray-800 border-b font-bold text-right">Código Postal:</td>
              <td className="px-4 py-2 text-sm text-gray-800 border-b t">{tramite?.apoderado_codigo_postal}</td>
            </tr>
            <tr className="">
              <td className="px-4 py-2 text-sm text-gray-800 border-b font-bold text-right">Correo electrónico: </td>
              <td className="px-4 py-2 text-sm text-gray-800 border-b" colSpan={3}>{tramite?.apoderado_correo_electronico}</td>
              <td className="px-4 py-2 text-sm text-gray-800 border-b font-bold text-right w-[90px]">Tel. Fijo: </td>
              <td className="px-4 py-2 text-sm text-gray-800 border-b">{tramite?.apoderado_telefono_fijo}</td>
            </tr>
            <tr className="">
              <td className="px-4 py-2 text-sm text-gray-800 border-b font-bold text-right">En calidad de: </td>
              <td className="px-4 py-2 text-sm text-gray-800 border-b" colSpan={3}>{tramite?.apoderado_tipo_representante}</td>
              <td className="px-4 py-2 text-sm text-gray-800 border-b font-bold text-right w-[90px]">Tel. Móvil: </td>
              <td className="px-4 py-2 text-sm text-gray-800 border-b">{tramite?.apoderado_telefono_movil}</td>
            </tr>

            {/* datos del autorizado para oir y recibir notificaciones */}
            <thead className="bg-gray-100">
              <tr>
                <th colSpan={6} className="px-4 py-2 text-sm font-bold border-b text-center">DATOS DEL AUTORIZADO PARA OIR O RECIBIR NOTIFICACIONES</th>
              </tr>
            </thead>

            <tr className="">
              <td className="px-4 py-2 text-sm text-gray-800 border-b font-bold text-right">Nombre Completo:</td>
              <td className="px-4 py-2 text-sm text-gray-800 border-b" colSpan={5}>{tramite?.autorizado_nombre}</td>
            </tr>
            <tr className="">
              <td className="px-4 py-2 text-sm text-gray-800 border-b font-bold text-right">Domicilio:</td>
              <td className="px-4 py-2 text-sm text-gray-800 border-b" colSpan={5}>{tramite?.autorizado_domicilio}</td>
            </tr>
            <tr className="">
              <td className="px-4 py-2 text-sm text-gray-800 border-b font-bold text-right">Localidad:</td>
              <td className="px-4 py-2 text-sm text-gray-800 border-b" colSpan={3}>{tramite?.autorizado_localidad}</td>
              <td className="px-4 py-2 text-sm text-gray-800 border-b font-bold text-right">Código Postal:</td>
              <td className="px-4 py-2 text-sm text-gray-800 border-b t">{tramite?.autorizado_codigo_postal}</td>
            </tr>
            <tr className="">
              <td className="px-4 py-2 text-sm text-gray-800 border-b font-bold text-right">Correo electrónico: </td>
              <td className="px-4 py-2 text-sm text-gray-800 border-b">{tramite?.autorizado_correo_electronico}</td>
              <td className="px-4 py-2 text-sm text-gray-800 border-b font-bold text-right w-[90px]">Tel. Fijo: </td>
              <td className="px-4 py-2 text-sm text-gray-800 border-b">{tramite?.autorizado_telefono_fijo}</td>
              <td className="px-4 py-2 text-sm text-gray-800 border-b font-bold text-right">Tel. Móvil: </td>
              <td className="px-4 py-2 text-sm text-gray-800 border-b">{tramite?.autorizado_telefono_movil}</td>
            </tr>

            {/* datos del autorizado para oir y recibir notificaciones */}
            <thead className="bg-gray-100">
              <tr>
                <th colSpan={6} className="px-4 py-2 text-sm font-bold border-b text-center">DATOS BÁSICOS DEL PREDIO (en el que solicita contratar los servicios)</th>
              </tr>
            </thead>

            <tr className="">
              <td className="px-4 py-2 text-sm text-gray-800 border-b font-bold text-right">Calle:</td>
              <td className="px-4 py-2 text-sm text-gray-800 border-b" colSpan={3}>{tramite?.predio_calle}</td>
              <td className="px-4 py-2 text-sm text-gray-800 border-b font-bold text-right">Número:</td>
              <td className="px-4 py-2 text-sm text-gray-800 border-b" colSpan={5}>{tramite?.predio_numero}</td>
            </tr>
            <tr className="">
              <td className="px-4 py-2 text-sm text-gray-800 border-b font-bold text-right">Entre Calles:</td>
              <td className="px-4 py-2 text-sm text-gray-800 border-b" colSpan={3}>{tramite?.predio_entre_calle}</td>
              <td className="px-4 py-2 text-sm text-gray-800 border-b font-bold text-right">Código Postal:</td>
              <td className="px-4 py-2 text-sm text-gray-800 border-b" colSpan={5}>{tramite?.predio_codigo_postal}</td>
            </tr>
            <tr className="">
              <td className="px-4 py-2 text-sm text-gray-800 border-b font-bold text-right">Colonia:</td>
              <td className="px-4 py-2 text-sm text-gray-800 border-b" colSpan={3}>{tramite?.predio_colonia}</td>
              <td className="px-4 py-2 text-sm text-gray-800 border-b font-bold text-right">Localidad:</td>
              <td className="px-4 py-2 text-sm text-gray-800 border-b" colSpan={5}>{tramite?.predio_localidad}</td>
            </tr>
            <tr className="">
              <td className="px-4 py-2 text-sm text-gray-800 border-b font-bold text-right">Clave catastral:</td>
              <td className="px-4 py-2 text-sm text-gray-800 border-b" colSpan={5}>{tramite?.predio_clave_catastral}</td>
            </tr>
          </table>

          <div className="mt-[80px]"></div>

          <table className="min-w-full border border-gray-200">
            {/* DATOS ADICIONALES */}
            <thead className="bg-gray-100">
              <tr>
                <th colSpan={6} className="px-4 py-2 text-sm font-bold border-b text-center">DATOS ADICIONALES</th>
              </tr>
            </thead>

            <tr className="">
              <td className="px-4 py-2 text-sm text-gray-800 border-b font-bold text-right">Uso de suelo actual:</td>
              <td className="px-4 py-2 text-sm text-gray-800 border-b" colSpan={5}>{tramite?.uso_de_suelo_actual}</td>
            </tr>
            <tr className="">
              <td className="px-4 py-2 text-sm text-gray-800 border-b font-bold text-right">Tipo de calle:</td>
              <td className="px-4 py-2 text-sm text-gray-800 border-b" colSpan={5}>{tramite?.tipo_de_calle}</td>
            </tr>
            <tr className="">
              <td className="px-4 py-2 text-sm text-gray-800 border-b font-bold text-right">Instalaciones existentes:</td>
              <td className="px-4 py-2 text-sm text-gray-800 border-b" colSpan={5}>{tramite?.instalaciones_existentes}</td>
            </tr>
            <tr className="">
              <td className="px-4 py-2 text-sm text-gray-800 border-b font-bold text-right">Régimen en condominio:</td>
              <td className="px-4 py-2 text-sm text-gray-800 border-b" colSpan={5}>{tramite?.regimen_de_condominios == true ? "SI" : "NO"}</td>
            </tr>

          </table>

          <div className="mt-10 flex flex-col items-center justify-center">
            <div className="bg-black h-[1px] w-[400px]"></div>
            <p>Firma del solicitante o Apoderado Legal</p>
          </div>

        </div>


      </div>
    </>

  );
};

export default ProbarPDF;
