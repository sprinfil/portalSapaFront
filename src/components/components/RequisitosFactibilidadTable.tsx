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

export function RequisitosFactibilidadTable() {
  const cellStyles = "items-center justify-end gap-4 flex"
  return (
    <Table>
      <TableHeader className="bg-muted">
        <TableRow>
          <TableHead className="text-center w-[200px]">Requisito</TableHead>
          <TableHead className="text-center w-[400px]">Documento</TableHead>
          <TableHead className="text-center"></TableHead>
          {/* <TableHead className="text-center">Original</TableHead>
          <TableHead className="text-center">Copia</TableHead> */}
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell className="items-center text-center bg-muted" rowSpan={6}>Acreditar personalidad jurídica</TableCell>
          <TableCell>Identificacion oficial vigente</TableCell>
          <TableCell className={cellStyles}>
            <Button variant={"outline"}>Ver</Button>
            <Button>Subir Archivo</Button>
          </TableCell>
        </TableRow>

        <TableRow>
          <TableCell>CURP reciente</TableCell>
          <TableCell></TableCell>
        </TableRow>

        <TableRow>
          <TableCell>Constancia de Situación fiscal</TableCell>
          <TableCell></TableCell>
        </TableRow>

        <TableRow>
          <TableCell>Acta constitutiva</TableCell>
          <TableCell></TableCell>
        </TableRow>

        <TableRow>
          <TableCell>Carta poder</TableCell>
          <TableCell></TableCell>
        </TableRow>

        <TableRow>
          <TableCell>Poder notarial</TableCell>
          <TableCell></TableCell>
        </TableRow>

        <TableRow>
          <TableCell className="items-center text-center bg-muted" rowSpan={3}>Acreditar propiedad del predio</TableCell>
          <TableCell>Escritura o título debidamente inscrito en Registro Público y Catastro</TableCell>
          <TableCell></TableCell>
        </TableRow>

        <TableRow>
          <TableCell>Certificado de no adeudo predial</TableCell>
          <TableCell></TableCell>
        </TableRow>

        <TableRow>
          <TableCell>Comprobante de domicilio</TableCell>
          <TableCell></TableCell>
        </TableRow>

        <TableRow>
          <TableCell className="items-center text-center bg-muted" rowSpan={5}>Tomas Comericales e industriales</TableCell>
          <TableCell>Copia del plano arquitectónico</TableCell>
          <TableCell></TableCell>
        </TableRow>

        <TableRow>
          <TableCell>Planta de conjunto del local a construir o croquis de distribución local</TableCell>
          <TableCell></TableCell>
        </TableRow>

        <TableRow>
          <TableCell>Memoria de cálculo hidráulico del proyecto</TableCell>
          <TableCell></TableCell>
        </TableRow>

        <TableRow>
          <TableCell>Autorización de uso de suelo</TableCell>
          <TableCell></TableCell>
        </TableRow>

        <TableRow>
          <TableCell>Contrato de arrendamiento (si aplica)</TableCell>
          <TableCell></TableCell>
        </TableRow>

        <TableRow>
          <TableCell className="items-center text-center bg-muted" rowSpan={3}>Viviendas y/o departamentos</TableCell>
          <TableCell>Copia del plano arquitectónico de la vivienda y/o departamento a construir</TableCell>
          <TableCell></TableCell>
        </TableRow>

        <TableRow>
          <TableCell>plano de la subdivisión autorizada</TableCell>
          <TableCell></TableCell>
        </TableRow>

        <TableRow>
          <TableCell>Oficio de la subdivisión autorizada</TableCell>
          <TableCell></TableCell>
        </TableRow>

        <TableRow>
          <TableCell className="items-center text-center bg-muted" rowSpan={2}>Régimen en condominio</TableCell>
          <TableCell>Estructura pública protocolizada ante notario público que lo establezca y debidamente registrada ante el Registro Público de la Propiedad y el Comercio</TableCell>
          <TableCell></TableCell>
        </TableRow>

        <TableRow>
          <TableCell>Reglamento autorizado por el H. Ayuntamiento de La Paz</TableCell>
          <TableCell></TableCell>
        </TableRow>

      </TableBody>
    </Table>
  )
}
