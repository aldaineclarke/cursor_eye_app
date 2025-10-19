export interface APIResponse<R=any> {
    statusCode?: number;
    status: string;
    message: string;
    error:any;
    data: R;
}