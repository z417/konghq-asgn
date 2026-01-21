import { type APIRequestContext } from "@playwright/test";
import { ADMIN_API_ROUTES } from "../api-routes";
import { type ApiRequest, type ApiResponse, type ApiResponseList } from "./index";


type WorkspacesEndpointResp = ApiResponseList<ApiResponse>;

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
