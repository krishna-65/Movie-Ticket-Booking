const Hero = ()=>{
    
    const images = [
        {src:"https://i.ytimg.com/vi/OXJu0tKWAhU/maxresdefault.jpg"}
    ]

    return(
        <div className="w-full">
            <div className="w-full p-10 mx-auto">
            <img src={images[0].src} alt="" className=" w-full h-[70vh] object-cover object-top" /></div>
        </div>
    )

    }
export default Hero;