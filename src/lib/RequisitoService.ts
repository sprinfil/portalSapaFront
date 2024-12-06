import axiosClient from "@/axios-client"

export const indexRequisitosCatalogo = async (setLoading: Function, setData: Function) => {
  try {
    setLoading(true);
    const response = await axiosClient.get("/requisitos");
    setData(response.data.data);
  }
  catch (e) {
    throw e;
  }
  finally {
    setLoading(false)
  }
}

export const storeRequisitoCatalogo = async (setLoading: Function, values: Object) => {
  try {
    setLoading(true);
    const response = await axiosClient.post("/requisitos", values);
    let id = response.data.data.id
    return { id };
  }
  catch (e) {
    throw e;
  }
  finally {
    setLoading(false)
  }
}

export const getRequisitoCatalogoById = async (setLoading: Function, requisitoId: number, setData: Function) => {
  try {
    setLoading(true);
    const response = await axiosClient.get("/requisitos/" + requisitoId);
    setData(response.data.data);
  }
  catch (e) {
    throw e;
  }
  finally {
    setLoading(false)
  }
}

export const updateRequisitoCatalogo = async (setLoading: Function, requisitoId: number, values: Object) => {
  try {
    setLoading(true);
    const response = await axiosClient.put("/requisitos/" + requisitoId, values);
    let newRequisito = response.data.data
    return { newRequisito };
  }
  catch (e) {
    throw e;
  }
  finally {
    setLoading(false)
  }
}