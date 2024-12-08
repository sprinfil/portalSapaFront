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

const ProbarPDF = () => {
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

      pdf.save("estado-de-cuenta.pdf");
    });
  };

  return (
    <div>
      <Button onClick={generatePDF}>Descargar PDF</Button>
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
          <img src={sapaLogo2} alt="" className="w-[220px]" />
          <div className="text-[12px] text-center">
            <p>SOLICITUD DE CONTRATACIÓN DEDL SERVICIO DE AGUA POTABLE Y/O ALCANTARILLADO</p>
          </div>
          <div className="flex text-[13px] gap-2">
            <p className="font-bold">Folio:</p>
            <p className="">SDFSDFSDFSDFSDFSDFSDFDS</p>
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
            <td className="px-4 py-2 text-sm text-gray-800 border-b " colSpan={3}>07/12/2024</td>
            <td className="px-4 py-2 text-sm text-gray-800 border-b font-bold text-right">Localidad</td>
            <td className="px-4 py-2 text-sm text-gray-800 border-b ">La Paz</td>
          </tr>

          <tr className="">
            <td className="px-4 py-2 text-sm text-gray-800 border-b font-bold text-right">Contrato solicitado</td>
            <td className="px-4 py-2 text-sm text-gray-800 border-b " colSpan={5}>DOMESTICO COMERCIAL INDUSTRIAL CON INFRAESTRUCTURA EXISTENTE</td>
          </tr>

          <tr className="">
            <td className="px-4 py-2 text-sm text-gray-800 border-b font-bold text-right">Modalidad</td>
            <td className="px-4 py-2 text-sm text-gray-800 border-b " colSpan={3} >Nuevo</td>
            <td className="px-4 py-2 text-sm text-gray-800 border-b font-bold text-right">Giro Comercial:</td>
            <td className="px-4 py-2 text-sm text-gray-800 border-b">RESTAURANTE</td>
          </tr>

          {/* datos del propietario */}
          <thead className="bg-gray-100">
            <tr>
              <th colSpan={6} className="px-4 py-2 text-sm font-bold border-b text-center">DATOS DEL PROPIETARIO</th>
            </tr>
          </thead>

          <tr className="">
            <td className="px-4 py-2 text-sm text-gray-800 border-b font-bold text-right">Nombre Completo:</td>
            <td className="px-4 py-2 text-sm text-gray-800 border-b" colSpan={5}>JEREMY IVAN OJEDA CESEÑA</td>
          </tr>
          <tr className="">
            <td className="px-4 py-2 text-sm text-gray-800 border-b font-bold text-right">Razón social</td>
            <td className="px-4 py-2 text-sm text-gray-800 border-b" colSpan={5}>RAZON SOCIAL</td>
          </tr>
          <tr className="">
            <td className="px-4 py-2 text-sm text-gray-800 border-b font-bold text-right">Domicilio:</td>
            <td className="px-4 py-2 text-sm text-gray-800 border-b" colSpan={5}>BAHAI DE LA PAZ 120</td>
          </tr>
          <tr className="">
            <td className="px-4 py-2 text-sm text-gray-800 border-b font-bold text-right">Localidad:</td>
            <td className="px-4 py-2 text-sm text-gray-800 border-b" colSpan={3}>LA PAZ</td>
            <td className="px-4 py-2 text-sm text-gray-800 border-b font-bold text-right">Código Postal:</td>
            <td className="px-4 py-2 text-sm text-gray-800 border-b t">23400</td>
          </tr>
          <tr className="">
            <td className="px-4 py-2 text-sm text-gray-800 border-b font-bold text-right">Correo electrónico: </td>
            <td className="px-4 py-2 text-sm text-gray-800 border-b">jeremy.ojeda@hotmail.com</td>
            <td className="px-4 py-2 text-sm text-gray-800 border-b font-bold text-right w-[90px]">Tel. Fijo: </td>
            <td className="px-4 py-2 text-sm text-gray-800 border-b">6241002298</td>
            <td className="px-4 py-2 text-sm text-gray-800 border-b font-bold text-right">Tel. Móvil: </td>
            <td className="px-4 py-2 text-sm text-gray-800 border-b">6241002298</td>
          </tr>

          {/* DATOS DEL APODERADO LEGAL O REPRESENTANTE PERSONAL */}
          <thead className="bg-gray-100">
            <tr>
              <th colSpan={6} className="px-4 py-2 text-sm font-bold border-b text-center">DATOS DEL APODERADO LEGAL O REPRESENTANTE PERSONAL</th>
            </tr>
          </thead>

          <tr className="">
            <td className="px-4 py-2 text-sm text-gray-800 border-b font-bold text-right">Nombre Completo:</td>
            <td className="px-4 py-2 text-sm text-gray-800 border-b" colSpan={5}>JEREMY IVAN OJEDA CESEÑA</td>
          </tr>
          <tr className="">
            <td className="px-4 py-2 text-sm text-gray-800 border-b font-bold text-right">Domicilio:</td>
            <td className="px-4 py-2 text-sm text-gray-800 border-b" colSpan={5}>BAHAI DE LA PAZ 120</td>
          </tr>
          <tr className="">
            <td className="px-4 py-2 text-sm text-gray-800 border-b font-bold text-right">Localidad:</td>
            <td className="px-4 py-2 text-sm text-gray-800 border-b" colSpan={3}>LA PAZ</td>
            <td className="px-4 py-2 text-sm text-gray-800 border-b font-bold text-right">Código Postal:</td>
            <td className="px-4 py-2 text-sm text-gray-800 border-b t">23400</td>
          </tr>
          <tr className="">
            <td className="px-4 py-2 text-sm text-gray-800 border-b font-bold text-right">Correo electrónico: </td>
            <td className="px-4 py-2 text-sm text-gray-800 border-b" colSpan={3}>jeremy.ojeda@hotmail.com</td>
            <td className="px-4 py-2 text-sm text-gray-800 border-b font-bold text-right w-[90px]">Tel. Fijo: </td>
            <td className="px-4 py-2 text-sm text-gray-800 border-b">6241002298</td>
          </tr>
          <tr className="">
            <td className="px-4 py-2 text-sm text-gray-800 border-b font-bold text-right">En calidad de: </td>
            <td className="px-4 py-2 text-sm text-gray-800 border-b" colSpan={3}>Representante personal</td>
            <td className="px-4 py-2 text-sm text-gray-800 border-b font-bold text-right w-[90px]">Tel. Móvil: </td>
            <td className="px-4 py-2 text-sm text-gray-800 border-b">6241002298</td>
          </tr>

          {/* datos del autorizado para oir y recibir notificaciones */}
          <thead className="bg-gray-100">
            <tr>
              <th colSpan={6} className="px-4 py-2 text-sm font-bold border-b text-center">DATOS DEL AUTORIZADO PARA OIR O RECIBIR NOTIFICACIONES</th>
            </tr>
          </thead>

          <tr className="">
            <td className="px-4 py-2 text-sm text-gray-800 border-b font-bold text-right">Nombre Completo:</td>
            <td className="px-4 py-2 text-sm text-gray-800 border-b" colSpan={5}>JEREMY IVAN OJEDA CESEÑA</td>
          </tr>
          <tr className="">
            <td className="px-4 py-2 text-sm text-gray-800 border-b font-bold text-right">Domicilio:</td>
            <td className="px-4 py-2 text-sm text-gray-800 border-b" colSpan={5}>BAHAI DE LA PAZ 120</td>
          </tr>
          <tr className="">
            <td className="px-4 py-2 text-sm text-gray-800 border-b font-bold text-right">Localidad:</td>
            <td className="px-4 py-2 text-sm text-gray-800 border-b" colSpan={3}>LA PAZ</td>
            <td className="px-4 py-2 text-sm text-gray-800 border-b font-bold text-right">Código Postal:</td>
            <td className="px-4 py-2 text-sm text-gray-800 border-b t">23400</td>
          </tr>
          <tr className="">
            <td className="px-4 py-2 text-sm text-gray-800 border-b font-bold text-right">Correo electrónico: </td>
            <td className="px-4 py-2 text-sm text-gray-800 border-b">jeremy.ojeda@hotmail.com</td>
            <td className="px-4 py-2 text-sm text-gray-800 border-b font-bold text-right w-[90px]">Tel. Fijo: </td>
            <td className="px-4 py-2 text-sm text-gray-800 border-b">6241002298</td>
            <td className="px-4 py-2 text-sm text-gray-800 border-b font-bold text-right">Tel. Móvil: </td>
            <td className="px-4 py-2 text-sm text-gray-800 border-b">6241002298</td>
          </tr>

          {/* datos del autorizado para oir y recibir notificaciones */}
          <thead className="bg-gray-100">
            <tr>
              <th colSpan={6} className="px-4 py-2 text-sm font-bold border-b text-center">DATOS BÁSICOS DEL PREDIO (en el que solicita contratar los servicios)</th>
            </tr>
          </thead>

          <tr className="">
            <td className="px-4 py-2 text-sm text-gray-800 border-b font-bold text-right">Calle:</td>
            <td className="px-4 py-2 text-sm text-gray-800 border-b" colSpan={3}>BAHIA DE LA PAZ</td>
            <td className="px-4 py-2 text-sm text-gray-800 border-b font-bold text-right">Número:</td>
            <td className="px-4 py-2 text-sm text-gray-800 border-b" colSpan={5}>126</td>
          </tr>
          <tr className="">
            <td className="px-4 py-2 text-sm text-gray-800 border-b font-bold text-right">Entre Calles:</td>
            <td className="px-4 py-2 text-sm text-gray-800 border-b" colSpan={3}>BAHIA DE LA PAZ y Bahia Concepción</td>
            <td className="px-4 py-2 text-sm text-gray-800 border-b font-bold text-right">Código Postal:</td>
            <td className="px-4 py-2 text-sm text-gray-800 border-b" colSpan={5}>23080</td>
          </tr>
          <tr className="">
            <td className="px-4 py-2 text-sm text-gray-800 border-b font-bold text-right">Colonia:</td>
            <td className="px-4 py-2 text-sm text-gray-800 border-b" colSpan={3}>SudCalifornia</td>
            <td className="px-4 py-2 text-sm text-gray-800 border-b font-bold text-right">Localidad:</td>
            <td className="px-4 py-2 text-sm text-gray-800 border-b" colSpan={5}>La Paz</td>
          </tr>
          <tr className="">
            <td className="px-4 py-2 text-sm text-gray-800 border-b font-bold text-right">Clave catastral:</td>
            <td className="px-4 py-2 text-sm text-gray-800 border-b" colSpan={5}>123123123123</td>
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
            <td className="px-4 py-2 text-sm text-gray-800 border-b" colSpan={5}>BAHIA DE LA PAZ</td>
          </tr>
          <tr className="">
            <td className="px-4 py-2 text-sm text-gray-800 border-b font-bold text-right">Tipo de calle:</td>
            <td className="px-4 py-2 text-sm text-gray-800 border-b" colSpan={5}>BAHIA DE LA PAZ</td>
          </tr>
          <tr className="">
            <td className="px-4 py-2 text-sm text-gray-800 border-b font-bold text-right">Instalaciones existentes:</td>
            <td className="px-4 py-2 text-sm text-gray-800 border-b" colSpan={5}>BAHIA DE LA PAZ</td>
          </tr>
          <tr className="">
            <td className="px-4 py-2 text-sm text-gray-800 border-b font-bold text-right">Régimen en condominio:</td>
            <td className="px-4 py-2 text-sm text-gray-800 border-b" colSpan={5}>BAHIA DE LA PAZ</td>
          </tr>

        </table>

        <div className="mt-10 flex flex-col items-center justify-center">
          <div className="bg-black h-[1px] w-[400px]"></div>
          <p>Firma del solicitante o Apoderado Legal</p>
        </div>

      </div>


    </div>
  );
};

export default ProbarPDF;
