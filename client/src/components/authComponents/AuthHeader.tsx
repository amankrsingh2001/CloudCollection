import { Dispatch,SetStateAction } from "react"


interface AuthHeaderValues {
    heading:string,
    signupvalue:string,
    text:string
    setAuthState: Dispatch<SetStateAction<string>>; 
    authState:string
}


const AuthHeader = ({heading, signupvalue, text , setAuthState, authState}:AuthHeaderValues)  =>{
    return <div className="w-[80%]">
        <div className="flex flex-col gap-3">
        <h1 className="text-4xl tracking-wide font-mono font-semibold text-mood-blue">{heading}</h1>
        <p className="text-mood-blue text-md font-serif tracking-wide">{signupvalue} <button className="underline" onClick={()=> authState==='signin'?setAuthState('signup'):setAuthState("signin")}>{text}</button> </p>

        </div>
      
    </div>
}

export default AuthHeader;