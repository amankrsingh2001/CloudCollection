interface Btn{
    text:string,
}

const AuthButton = ({text}:Btn) =>{
    return  <button
            type='submit'
         className="px-8 py-2 rounded-md bg-mood-blue text-white font-bold transition outline-none duration-200 hover:bg-dirt-white hover:text-black border-2 border-transparent hover:border-mood-blue" >
          {text}
        </button>

}

export default AuthButton