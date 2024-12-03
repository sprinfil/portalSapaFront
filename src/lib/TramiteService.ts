import axiosClient from "@/axios-client";

export const storeTramite = async (setLoading: Function, values: Object, setTramite: Function) => {
  try {
    setLoading(true);
    const response = await axiosClient.post("tramites", values);
    setTramite({});
    let tramiteId = response?.data?.data?.id;
    return { tramiteId }
  }
  catch (e) {
    throw e;
  }
  finally {
    setLoading(false);
  }
}

export const getTramitesByUserId = async (setLoading: Function, userId: Object, setData: Function) => {
  try {
    setLoading(true);
    const response = await axiosClient.get("/tramites", { params: { id_solicitante: userId } });
    setData(response?.data?.data);
  }
  catch (e) {
    throw e;
  }
  finally {
    setLoading(false);
  }
}

export const getTramiteById = async (setLoading: Function, tramiteId: Object, setData: Function) => {
  try {
    setLoading(true);
    const response = await axiosClient.get(`/tramites/${tramiteId}`);
    setData(response?.data?.data);
  }
  catch (e) {
    throw e;
  }
  finally {
    setLoading(false);
  }
}