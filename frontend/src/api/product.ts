import axios from "axios";
import { apiEndpoints } from "./apiConfig";

export const getProduks = async (page: number, limit: number) => {
  try {
    const response = await axios.get(apiEndpoints.produks, {
      params: {
        page,
        limit,
      },
    });
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data.message || "An error occurred");
  }
};

export const getProdukById = async (id: string) => {
  try {
    const response = await axios.get(`${apiEndpoints.produks}/${id}`);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data.message || "An error occurred");
  }
};

export const saveProduk = async (data: any) => {
  try {
    const response = await axios.post(apiEndpoints.produks, data);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data.message || "An error occurred");
  }
};

export const updateProduk = async (id: string, data: any) => {
  try {
    const response = await axios.patch(`${apiEndpoints.produks}/${id}`, data);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data.message || "An error occurred");
  }
};

export const deleteProduk = async (id: string) => {
  try {
    const response = await axios.delete(`${apiEndpoints.produks}/${id}`);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data.message || "An error occurred");
  }
};
