class apiResponse {
    constructor(statuscode , data , message = "sucess"){
        this.statuscode = statuscode
        this.data = data
        this.message = message
        this.success = statuscode <400
    }
}

export default apiResponse