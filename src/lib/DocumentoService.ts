import axiosClient from "@/axios-client"

export const storeDocumento = async (setLoading: Function, values: Object) => {
  try {
    setLoading(true);
    const response = await axiosClient.post("/documentos", values);
    let documento = response?.data?.data;
    return { documento };
  } catch (e) {
    throw e;
  } finally {
    setLoading(false);
  }
}

export const updateDocumento = async (setLoading: Function, values: Object, documentoId:number) => {
  try {
    setLoading(true);
    const response = await axiosClient.put("/documentos/"+documentoId, values);
    let newDocumento = response?.data?.data;
    return { newDocumento };
  } catch (e) {
    throw e;
  } finally {
    setLoading(false);
  }
}