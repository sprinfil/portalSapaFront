import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { initMapaDefault, initMapaEscogerUbicacion, StylesRecorridosMap } from "@/lib/MapaService";
import { useEffect, useRef, useState } from "react";
import { SiGooglemaps } from "react-icons/si";
import { Loader } from "./Loader";
import { patchEntregable } from "@/lib/EntregableService";

export function ModalEstablecerUbicacion({ entregableId, setRequisitos, coordinates, setCoordinates }) {
  const [map, setMap] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false); // Señal para saber si el modal está abierto
  const mapRef = useRef(null);
  const [loadingMap, setLoadingMap] = useState(false)

  const [loadingPatch, setLoadingPatch] = useState(false);

  useEffect(() => {
    if (map == null) {
      setLoadingMap(true);
      const timeout = setTimeout(() => {
        initMapaEscogerUbicacion(map, setMap, setCoordinates);
        setLoadingMap(false);
      }, 500);
      return () => clearTimeout(timeout);
    }
  }, [isModalOpen]);

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          className="w-full text-red-500"
          variant={"outline"}
          onClick={() => setIsModalOpen(true)}
        >
          Establecer Punto <SiGooglemaps />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="min-w-[70%]">
        <AlertDialogHeader>
          <AlertDialogTitle>Escoge la ubicación</AlertDialogTitle>
          <AlertDialogDescription></AlertDialogDescription>
        </AlertDialogHeader>
        <p className="flex gap-5 items-center">
          <p>Latitud: {coordinates?.lat}</p>
          <p>Longitud: {coordinates?.lng}</p>
          {
            coordinates?.lat &&
            <Button
              onClick={async () => {
                try {
                  const { data } = await patchEntregable(setLoadingMap,
                    {
                      ubicacion: {
                        lat: coordinates?.lat,
                        lng: coordinates?.lng
                      }

                    },
                    entregableId
                  )

                  if (setRequisitos) {
                    setRequisitos(prev => {
                      return prev?.map(requisito => ({
                        ...requisito,
                        documentos: requisito.documentos?.map(documento => ({
                          ...documento,
                          entregables: documento.entregables?.map(entregable => {
                            if (entregable.id === entregableId) {
                              return data;
                            }
                            return entregable;
                          })
                        }))
                      }));
                    });
                  }

                } catch (e) {

                }
              }}
            >Guardar</Button>
          }
        </p>
        {
          loadingMap && <Loader />
        }
        <div ref={mapRef} id="map" style={StylesRecorridosMap}></div>
        <AlertDialogFooter>
          <AlertDialogCancel
            onClick={() => { setIsModalOpen(false); setMap(null); setCoordinates(null) }}
          >
            Cancel
          </AlertDialogCancel>

        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
