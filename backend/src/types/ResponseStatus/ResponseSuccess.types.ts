export const ResponseSuccess = {
    CREATED: 201,
    ACCEPTED: 202,
    NO_CONTENT: 204,
}

export type ResponseSuccessCode = typeof ResponseSuccess[keyof typeof ResponseSuccess];
