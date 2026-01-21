import { type APIRequestContext } from "@playwright/test"
import { workspacesApi } from "@src/kong-manager/api/models/workspace-model"

export interface KongManagerApiHandler {
    request: APIRequestContext
    workspacesApi: typeof workspacesApi
}

export const createApiHandler = (request: APIRequestContext): KongManagerApiHandler => {
    return {
        request,
        workspacesApi
    }
}
