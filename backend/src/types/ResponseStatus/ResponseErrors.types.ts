export const ResponseErrors = {
    BAD_REQUEST: 400,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    INPUT_ERRORS: 411,
    DB_DUPLICATE_KEY: 11000,
} as const

export type ResponseErrorCode = typeof ResponseErrors[keyof typeof ResponseErrors];