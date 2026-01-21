import { type APIRequestContext } from "@playwright/test";
import { ADMIN_API_ROUTES } from "../api-routes";
import { type ApiRequest, type ApiResponse } from "./index";


interface Routes {
    id: string;
    name: string;
    [key: string]: any;
}

type RoutesEndpointResp = ApiResponse<Routes>;

export const routesApi = {
    getARoute: async (request: APIRequestContext, req?: ApiRequest,
    ): Promise<Routes> => {
        const { host, pathParams } = req
        // TODO: switch RouteIdOrName
        const response = await request.get(
            `${host}${ADMIN_API_ROUTES.ROUTES}/${pathParams.name}`,
        );
        return response.json();
    }
}
