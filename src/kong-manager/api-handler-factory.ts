import { type APIRequestContext } from "@playwright/test"

export interface KongManagerApiHandler {
    request: APIRequestContext
}

export const createApiHandler = (request: APIRequestContext): KongManagerApiHandler => {
    return {
        request,
    }
}
