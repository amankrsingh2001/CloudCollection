class ApiResponse {
    success:boolean;
    message:string;
    data:any
    constructor( success:boolean, message:string,  data:any){
        this.message = message;
        this.success = success
        this.data = data
    }
}

export {ApiResponse}