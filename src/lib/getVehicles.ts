import axios from "axios";

export const getVehicles = async () => {
    const makesResponse = await axios.get(`${process.env.defaultApiEndpoint}/api/vehicles/getAllMakes`, {}).then(async (response) => await response.data);
    const modelsResponse = await axios.get(`${process.env.defaultApiEndpoint}/api/vehicles/getAllModels`, {}).then(async (response) => await response.data);

    return {
        makesData: makesResponse,
        modelsData: modelsResponse
    }
}