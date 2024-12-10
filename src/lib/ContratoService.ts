//contratos

import axiosClient from "@/axios-client"

export const getContratos = async (setLoading: Function, setContratos: Function) => {
  try {
    setLoading(true);
    const response = await axiosClient.get("/contratos");
    let contratos = response.data.data;
    setContratos(contratos);
    return { contratos }
  }
  catch (e) {
    throw e;
  }
  finally {
    setLoading(false);
  }
}

export const requisitosContratosBulkCreate = async (setLoading: Function, values: Array<any>) => {
  try {
    setLoading(true);
    const response = await axiosClient.post("/requisito-contratos/bulk-create", { data: values });
  }
  catch (e) {
    throw e;
  }
  finally {
    setLoading(false);
  }
}

export const requisitosContratosBulkDelete = async (setLoading: Function, values: Array<any>) => {
  try {
    setLoading(true);
    const response = await axiosClient.post("/requisito-contratos/bulk-delete", { ids: values });
  }
  catch (e) {
    throw e;
  }
  finally {
    setLoading(false);
  }
}

export const getContratoById = async (setLoading: Function, contratoId: number) => {
  try {
    setLoading(true);
    const response = await axiosClient.get("/contratos/" + contratoId);
    let contrato = response.data.data;
    return { contrato }
  }
  catch (e) {
    throw e;
  }
  finally {
    setLoading(false);
  }
}
