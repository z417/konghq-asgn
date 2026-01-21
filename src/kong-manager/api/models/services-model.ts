import { type APIRequestContext } from "@playwright/test";
import { ADMIN_API_ROUTES } from "../api-routes";
import { type ApiRequest, type ApiResponse } from "./index";


interface Services {
    id: string;
    name: string;
    [key: string]: any;
}

type ServicesEndpointResp = ApiResponse<Services>;

export const servicesApi = {
    getAService: async (request: APIRequestContext, req?: ApiRequest,
    ): Promise<Services> => {
        const { host, pathParams } = req
        // TODO: switch ServiceIdOrName
        const response = await request.get(
            `${host}${ADMIN_API_ROUTES.SERVICES}/${pathParams.name}`,
        );
        return response.json();
    }
}
