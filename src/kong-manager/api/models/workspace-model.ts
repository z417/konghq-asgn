import { type APIRequestContext } from "@playwright/test";
import { ADMIN_API_ROUTES } from "../api-routes";
import { type ApiRequest, type ApiResponse } from "./index";


interface Workspaces {
    id: string;
    name: string;
    [key: string]: any;
}

type WorkspacesEndpointResp = ApiResponse<Workspaces>;

export const workspacesApi = {
    getWorkspaces: async (request: APIRequestContext, req?: ApiRequest,
    ): Promise<WorkspacesEndpointResp> => {
        const { host, queryParams } = req
        const response = await request.get(
            `${host}${ADMIN_API_ROUTES.WORKSPACES}`,
            { params: queryParams }
        );
        return response.json();
    }
}
