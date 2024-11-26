export const ResponseServer = {
    INTERNAL_SERVER_ERROR: 500,
    BAD_GATEWAY: 502,
    SERVICE_UNAVAILABLE: 503,
}

export type ResponseServerCode = typeof ResponseServer[keyof typeof ResponseServer];
