import axiosClient from "@/axios-client";

export const subirArchivo = async (
    setLoading: Function,
    entregableId: number,
    archivo: File
) => {
    try {
        setLoading(true);

        const formData = new FormData();
        formData.append("documentos", archivo);

        const response = await axiosClient.post("/entregables/subir-documento/" + entregableId, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });

    } catch (e) {
        throw e;
    } finally {
        setLoading(false);
    }
};