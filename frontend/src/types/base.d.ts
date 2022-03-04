interface BaseActionState {
    pending: boolean;
    error?: boolean;
}
interface BasePagination {
    page?: number;
    limit?: number;
}