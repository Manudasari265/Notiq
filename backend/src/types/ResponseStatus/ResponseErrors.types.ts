export const ResponseErrors = {
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    INPUT_ERRORS: 411,
} as const

export type ResponseErrorCode = typeof ResponseErrors[keyof typeof ResponseErrors];