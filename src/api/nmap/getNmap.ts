import axios from "axios"
import { url } from "../../env"
import type { responseApi } from "../../types/res.type"

export const getNmap = async (ip: string | ""): Promise<responseApi> => {
    try {
        const response = await axios.get(`${url}/nmap/${ip}`);
        const responseData: responseApi = {
            status: response.status, // Anda bisa mengatur status sesuai dengan kebutuhan Anda
            message: response.data.message, // Anda bisa mengatur pesan sesuai dengan kebutuhan Anda
            data: response.data.data // Asumsikan data API ada di sini, sesuaikan jika berbeda
        };
        return responseData;
    } catch (error) {
        const errorResponse: responseApi = {
            status: 500,
            message: 'An error occurred',
            data: []
        };
        return errorResponse;
    }
};