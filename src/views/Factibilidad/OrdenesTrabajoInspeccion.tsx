import { DataTableOrdenesTrabajoInspecciones } from '@/components/components/DataTableOrdenesTrabajoInspecciones'
import { FormInspeccionAgua } from '@/components/components/FormInspeccionAgua'
import { Button } from '@/components/ui/button';
import React, { useState } from 'react'
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

const OrdenesTrabajoInspeccion = () => {

  const [ordenTrabajoId, setOrdenTrabajoId] = useState(null);

  return (
    <div>
      {ordenTrabajoId == null ? <DataTableOrdenesTrabajoInspecciones setOrdenTrabajoId={setOrdenTrabajoId} /> :
        <>
          <div className='flex gap-2 items-center'>
            <Button
              variant={"outline"}
              onClick={() => {
                setOrdenTrabajoId(null);
              }}
            >
              <FaArrowLeft />
              Volver</Button>
            <p> Orden de Inspeccion de agua 12/12/2024</p>
          </div>
          <FormInspeccionAgua />

        </>
      }

    </div>
  )
}

export default OrdenesTrabajoInspeccion