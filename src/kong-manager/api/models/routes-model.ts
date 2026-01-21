import { type APIRequestContext } from "@playwright/test";
import { ADMIN_API_ROUTES } from "../api-routes";
import { type ApiRequest, type ApiResponse } from "./index";

export const routesApi = {
    getARoute: async (request: APIRequestContext, req?: ApiRequest,
    ): Promise<ApiResponse> => {
        const { host, pathParams } = req
        // TODO: switch RouteIdOrName
        const response = await request.get(
            `${host}${ADMIN_API_ROUTES.ROUTES}/${pathParams}`,
        );
        return response.json();
    }
}
