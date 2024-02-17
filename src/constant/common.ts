export const ENV = {
    MONGO_URI: process.env.MONGO_URI,
    PORT: Number(process.env.PORT),
    ACCESS_TOKEN_PRIVATE_KEY: process.env.ACCESS_TOKEN_PRIVATE_KEY,
    ACCESS_TOKEN_PUBLIC_KEY: process.env.ACCESS_TOKEN_PUBLIC_KEY,
    ACCESS_TOKEN_EXPIRES_IN: Number(process.env.ACCESS_TOKEN_EXPIRES_IN) * 60 * 1000
};

export const SORT_VALUES: { [key: string]: string } = {
    ASC: 'ASC',
    DESC: 'DESC'
};

export const SORT_ORDER_VALUES: { [key: string]: number } = {
    ASC: 1,
    DESC: -1
};

export const COMMON_STATUS: { [key: string]: string } = {
    ACTIVE: 'ACTIVE',
    INACTIVE: 'INACTIVE',
    PENDING: 'PENDING',
    COMPLETED: 'COMPLETED',
    OUT_FOR_DELIVERY: 'OUT_FOR_DELIVERY'
}