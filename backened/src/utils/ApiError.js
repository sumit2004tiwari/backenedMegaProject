class ApiError extends Error {
    constructor(
        statuscode,
        message = "Something went Wrong",
        stack = "",
        errors = [],
    ) {
        super(message)
        this.statuscode = statuscode
            this.data = null
            this.message = message
            this.stack = stack
            this.errors = errors
            this.success = false

    if (stack) {
            this.stack = stack
        } else {
            Error.captureStackTrace(this, this.construtor)
        }
    }
}

export default ApiError
