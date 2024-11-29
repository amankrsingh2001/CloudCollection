class ApiError extends Error {
    statuscode: number;
    success: boolean;

    constructor(statuscode: number, message:string = 'something went wrong', success: boolean) {
        super(message);
        this.statuscode = statuscode;
        this.success = success;

        
    }
}

export {ApiError}

