import { useState } from "react"
import Quote from "../components/authComponents/Quote"
import AuthHeader from "../components/authComponents/AuthHeader"
import Signup from "./Signup"
import Signin from "./Signin"

const Auth = () =>{
    const [authState, setAuthState] = useState('signup')

    return <div className="text-black  w-full h-screen grid lg:grid-cols-2 border-2 border-black bg-dirt-white ">    

                <div className="flex flex-col gap-4 justify-center items-center  ">
                    <div className="flex justify-center items-center  w-[80%]">
                        {
                            authState === 'signup'?<AuthHeader heading ={'Welcome to Medium daily.'}
                                    signupvalue = {'Already have an account??'} setAuthState= {setAuthState} text ={'Sign In'} authState={authState}
                            />:<AuthHeader heading ={'Welcome to Medium daily.'}
                            signupvalue = {'New to Medium Daily. Create an Account'} setAuthState= {setAuthState} text ={'Sign Up'} authState={authState}/>
                        }
                        
                    </div>
                    <div className="flex lg:ml-[15%] justify-center lg:justify-normal items-center w-[80%]  ">
                        {
                            authState === 'signup'? <Signup />:<Signin/>
                        }
                    </div>
                

                </div>

               
                <div className="bg-mood-blue py-6 px-16 text-white lg:block hidden">
                    <div className=" rounded-[40px] border-2 border-dirt-white p-12 h-full flex justify-center shadow-md shadow-dirt-white items-center">
                    {
                    authState === 'signup' &&  <Quote  author={"Jerulies Winfiled"} text = {"The customer support i recived was exceptional. The support team went above above an beyond to address my concerns"} exc={'- CEO | Acme Corp'}/>
                    }

                    {
                      authState ===  'signin' && <Quote text={"text"} author={" Julies Winfiled"} exc = {"- CEO | Acme Corp"} />
                    }
                    </div>
                   
                </div>

            </div>
}

export default Auth