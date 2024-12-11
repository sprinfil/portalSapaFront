import { DataTableOrdenesTrabajoInspecciones } from '@/components/components/DataTableOrdenesTrabajoInspecciones'
import { FormInspeccionAgua } from '@/components/components/FormInspeccionAgua'
import { FormInspeccionAlcantarillado } from '@/components/components/FormInspeccionAlcantarillado';
import { Button } from '@/components/ui/button';
import React, { useState } from 'react'
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

const OrdenesTrabajoInspeccion = ({ tramite }) => {

  const [ordenTrabajo, setOrdenTrabajo] = useState(null);



  return (
    <div>
      {ordenTrabajo == null ? <DataTableOrdenesTrabajoInspecciones setOrdenTrabajo={setOrdenTrabajo} tramite={tramite} /> :
        <>
          <div className='flex gap-2 items-center'>
            <Button
              variant={"outline"}
              onClick={() => {
                setOrdenTrabajo(null);
              }}
            >
              <FaArrowLeft />
              Volver</Button>
            <p> Orden de Inspeccion de {ordenTrabajo?.tipo_inspeccion} {ordenTrabajo?.no_solicitud}</p>
          </div>
          {
            ordenTrabajo?.tipo_inspeccion == "agua" ?
              <>
                <FormInspeccionAgua inspeccion={ordenTrabajo} setInspeccion={setOrdenTrabajo} />
              </>
              :
              <>
                <FormInspeccionAlcantarillado />
              </>
          }
        </>
      }

    </div>
  )
}

export default OrdenesTrabajoInspeccion