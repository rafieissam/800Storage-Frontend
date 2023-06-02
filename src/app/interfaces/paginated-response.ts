export interface PaginatedResponse<T> {
    data: T[];
    page: number;
    total_pages: number;
    per_page: number;
    total: number;
    support: object;
}
