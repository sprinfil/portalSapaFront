import axiosClient from "@/axios-client"

export const getInspecciones = async (
  setLoading: Function,
  params: Object,
  setData: Function
) => {
  try {
    setLoading(true);
    const response = await axiosClient.get("/inspecciones", { params: params });
    let inspecciones = response.data.data;
    setData(inspecciones)
  }
  catch (e) {
    throw e;
  }
  finally {
    setLoading(false);
  }
}

export const storeInspeccion = async (
  setLoading: Function,
  params: Object,
  setData,
) => {
  try {
    setLoading(true);
    const response = await axiosClient.post("/inspecciones", params);
    let data = response.data.data;
    setData(prev => {
      return [data, ...prev];
    })
  }
  catch (e) {
    throw e;
  }
  finally {
    setLoading(false);
  }
}

export const updateInspeccionAgua = async (
  setLoading: Function,
  params: Object,
  idInspeccion: number,
  setInspeccion: Function
) => {
  try {
    setLoading(true);
    const response = await axiosClient.put("/inspecciones/agua/" + idInspeccion, params);
    let data = response.data.data;
    setInspeccion(data);
  }
  catch (e) {
    throw e;
  }
  finally {
    setLoading(false);
  }
}

export const updateInspeccionAlcantarillado = async (
  setLoading: Function,
  params: Object,
  idInspeccion: number,
  setInspeccion: Function
) => {
  try {
    setLoading(true);
    const response = await axiosClient.put("/inspecciones/alcantarillado/" + idInspeccion, params);
    let data = response.data.data;
    setInspeccion(data);
  }
  catch (e) {
    throw e;
  }
  finally {
    setLoading(false);
  }
}