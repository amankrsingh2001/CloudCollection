interface Value {
    text:string,
    author:string,
    exc:string
}

const Quote = ({text, author, exc}:Value) =>{
    return <div className="flex flex-col gap-3 w-[80%] text-left max-w-xl mx-auto">
                <h1 className="text-2xl leading-relaxed font-medium text-[#FFF8DE] font-serif "> {text}</h1>
                <p className="text-md font-semibold text-[#E5E3D4] subpixel-antialiased tracking-wide">{author}</p>
                <p className="text-sm font-thin underline tracking-wider">{exc}</p>
    </div>
}

export default Quote