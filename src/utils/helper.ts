interface PaginationOptions {
    page: number;
    size: number;
}

export function pagination(options: PaginationOptions) {
    const { page, size } = options;
    const offset = (page - 1) * size;
    return { offset, size };
}