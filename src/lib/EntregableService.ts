import axiosClient from "@/axios-client"

export const storeEntregable = async (setLoading: Function, values: Object, setEntregables: Function) => {
  try {
    setLoading(true);
    const response = await axiosClient.post("/entregables", values);

    setEntregables(prev => {
      return [...prev, response.data.data];
    })

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

export const patchEntregable = async (setLoading: Function, values: Object, entregableId: number, setData: Function) => {
  try {
    setLoading(true);
    const response = await axiosClient.patch("/entregables/" + entregableId, values);
    // setData(response.data.data);
    let data = response.data.data;
    return { data };
  }
  catch (e) {
    throw e;
  }
  finally {
    setLoading(false);
  }
}
