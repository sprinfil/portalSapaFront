import { useToast } from '@/hooks/use-toast';
import { subirArchivo } from '@/lib/ArhcivoService';
import { ToastAction } from '@radix-ui/react-toast';
import { Trash2Icon } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { FaCloudArrowUp } from "react-icons/fa6";
import { Loader } from './Loader';

const MyDropzone = ({ set, entregableId, setRequisitos }) => {

  const [archivos, set_archivos] = useState([]);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const onDrop = (acceptedFiles) => {
    // Aquí puedes manejar los archivos que fueron soltados
    set_archivos((prev) => {
      return [
        // ...prev,
        ...acceptedFiles
      ]
    })
  };

  useEffect(() => {
    // set(archivos);
    // console.log(archivos)
    subir_archivo();
  }, [archivos])

  const subir_archivo = async () => {
    if (archivos[0]) {
      try {
        const { data } = await subirArchivo(setLoading, entregableId, archivos[0]);

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
      catch (e) {
        toast({
          title: "Error",
          description: "Algo salió mal al subir el archivo",
          variant: "destructive",
          action: <ToastAction altText='Aceptar'>Aceptar  </ToastAction>
        })
      }
    }
  }

  const quitar_archivo = (key) => {

    const archivos_filtrados = archivos.filter((archivo, index) => index !== key);
    set_archivos(archivos_filtrados);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <>
      <div className='my-2 min-w-[200px]'>
        {
          loading ?
            <>
              <Loader />
            </>
            :
            <>
              <div {...getRootProps()} style={styles.dropzone}>
                <input {...getInputProps()} />
                {isDragActive ? (
                  <p className='py-4'>Suelta el archivo aquí ...</p>
                ) : (
                  <p className='py-4'>Sube el archivo aqui</p>
                )}

              </div>
            </>
        }


        {/* {
          archivos.length > 0 &&
          <>
            <div className='border mt-3'>
              {archivos.map((archivo, index) => (
                <div className='my-1 px-2  flex justify-between' key={index}>
                  {archivo.path}
                  <div className='flex gap-4 items-center'>
                    <FaCloudArrowUp className='text-blue-500 cursor-pointer w-[30px] h-[30px]' onClick={() => { }} />
                    <Trash2Icon className='text-red-500 cursor-pointer' onClick={() => { quitar_archivo(index) }} />
                  </div>
                </div>
              ))}
            </div>
          </>
        } */}
      </div>
    </>
  );
};

const styles = {
  dropzone: {
    border: '2px dashed #cccccc',
    padding: '2px',
    textAlign: 'center',
    cursor: 'pointer',
    borderRadius: '5px'
  }
};

export default MyDropzone;
