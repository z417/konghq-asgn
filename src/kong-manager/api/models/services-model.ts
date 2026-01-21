import { type APIRequestContext } from "@playwright/test";
import { ADMIN_API_ROUTES } from "../api-routes";
import { type ApiRequest, type ApiResponse } from "./index";


export const servicesApi = {
    getAService: async (request: APIRequestContext, req?: ApiRequest,
    ): Promise<ApiResponse> => {
        const { host, pathParams } = req
        const response = await request.get(
            `${host}${ADMIN_API_ROUTES.SERVICES}/${pathParams}`,
        );
        return response.json();
    },
    createNewServiceInWorkspace: async (request: APIRequestContext, req?: ApiRequest,
    ): Promise<ApiResponse> => {
        const { host, pathParams, body } = req
        const response = await request.post(
            `${host}/${pathParams}${ADMIN_API_ROUTES.SERVICES}`,
            { data: body },
        );
        return response.json();
    },
    deleteService: async (request: APIRequestContext, req?: ApiRequest,
    ): Promise<Number> => {
        const { host, pathParams } = req
        const response = await request.delete(
            `${host}${ADMIN_API_ROUTES.SERVICES}/${pathParams}`,
        );
        return response.status();
    }
}
