export type ApiResponse<T> = {
    data: T[];
    next: string | null;
    offset?: string | number;
}

export type ApiRequest = {
    host?: string;
    pathParams?: Record<string, string>;
    queryParams?: Record<string, string | number | boolean>;
    body?: Record<string, any>;
    auth?: { token: string; type?: 'Bearer' | 'Basic' };
}; 
