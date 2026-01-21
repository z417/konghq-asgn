export type ApiResponseList<T> = {
    data: T[];
    next: string | null;
    offset?: string | number;
}

export type ApiResponse = {
    id: string;
    name: string;
    [key: string]: any;
}

export type ApiRequest = {
    host?: string;
    pathParams?: string;
    queryParams?: Record<string, string | number | boolean>;
    body?: Record<string, any>;
    auth?: { token: string; type?: 'Bearer' | 'Basic' };
}; 
