import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import { Search } from "lucide-react"
import { useEffect, useRef, useState } from "react"
import Result from "../components/Result"

const MainPage = () => {


    const searchRef = useRef<HTMLInputElement>(null)
    
    const resultRef = useRef<{ handleSearch: (search: string) => void }>(null);

    // const { data, isFetching } = useQuery({
    //     queryKey: ['search'],
    //     queryFn: async () => {
    //         const res = await axios.get(`get-sample`)
    //         return res.data
    //     }
    // })

    useEffect(()=>{
        handleKeyDown()
    }, [])

     const handleKeyDown = () => {
        const value = searchRef.current?.value || "";
        resultRef.current?.handleSearch(value);
    };

    return (
        <>
            <div className="h-[20px] bg-[#2c94d1]">

            </div>

            <div className="mt-10 lg:max-w-7xl lg:mx-auto">

                <img src="/images/header-logo.png" className="block mx-auto mb-6"/>
                <div className="text-center text-2xl font-bold mb-2">Hanap mo bhe?</div>
                <div className="flex rounded-4xl overflow-hidden border border-red-400 mx-2">
                    <div className='flex-1'>
                        <input
                            type="text"
                            className="text-[#7a7a7a] px-6 py-4 w-full outline-0"
                            //placeholder="Collections, Innovations, Technology, News ... CSS (Centrialize Science Search Engine)"
                            placeholder="Hanap mo bhe? Tempered?..."
                            ref={searchRef}
                           
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                    handleKeyDown();
                                }
                            }}
                          
                            autoComplete="off"
                        />
                    </div>
                    <button
                        type="button"
                        className="bg-danger py-4 pl-4 pr-6 text-white cursor-pointer active:bg-red-500 duration-150 hover:bg-red-400 ease-in-out outline-0]"
                        onClick={() => {
                            handleKeyDown();
                        }}
                    >
                        <div className='flex gap-2 items-center'>  <Search size={18}/> Search Now</div>
                    </button>
                </div>

            </div>

            <div className="mt-10 lg:max-w-7xl lg:mx-auto">
                <Result ref={resultRef}  />
            </div>


        </>
    )
}

export default MainPage