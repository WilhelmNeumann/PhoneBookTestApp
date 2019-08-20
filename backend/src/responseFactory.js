class ErrorResponse {
    constructor(message = 'Internal server error', statusCode = 500) {
        this.status = 'error'
        this.statusCode = statusCode
        this.payload = message
    }
}

class SuccessResponse {
    constructor(payload) {
        this.status = 'success'
        this.statusCode = 200
        this.payload = payload
    }
}

/**
 * Factory for creating responses for client
 */
module.exports = class ResponseFactory {
    static createErrorResponse(message, statusCode) {
        return new ErrorResponse(message, statusCode)
    }

    static createSuccessResponse(payload) {
        return new SuccessResponse(payload)
    }
}
