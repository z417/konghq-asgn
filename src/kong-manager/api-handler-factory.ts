import { type APIRequestContext } from "@playwright/test"
import { routesApi } from "@src/kong-manager/api/models/routes-model"
import { servicesApi } from "@src/kong-manager/api/models/services-model"
import { workspacesApi } from "@src/kong-manager/api/models/workspace-model"

export interface KongManagerApiHandler {
    request: APIRequestContext
    workspacesApi: typeof workspacesApi
    servicesApi: typeof servicesApi
    routesApi: typeof routesApi
}

export const createApiHandler = (request: APIRequestContext): KongManagerApiHandler => {
    return {
        request,
        workspacesApi,
        servicesApi,
        routesApi
    }
}
