import axiosClient from "@/axios-client"

export const storeEntregable = async (setLoading: Function, values: Object) => {
  try {
    setLoading(true);
    const response = await axiosClient.post("/entregables", values);
  } catch (e) {
    throw e
  }
  finally {
    setLoading(false);
  }
}

export const getEntregablesNull = async (setLoading: Function, setData: Function, tramiteId: number) => {
  try {
    setLoading(true);
    const response = await axiosClient.get("/entregables/tramitenull/" + tramiteId);
    setData(response.data.data);
  }
  catch (e) {
    throw e;
  }
  finally {
    setLoading(false);
  }
}