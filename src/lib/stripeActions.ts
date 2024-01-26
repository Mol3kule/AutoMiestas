import { TProduct } from "@/app/api/stripe/getProducts/route";
import axios from "axios"

const api = process.env.defaultApiEndpoint;

export const getProducts = async () => {
    return await axios.get(`${api}/api/stripe/getProducts`).then(res => res.data.products) as TProduct[];
}