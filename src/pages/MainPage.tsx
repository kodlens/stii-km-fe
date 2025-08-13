import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import { Search } from "lucide-react"
import { useRef, useState } from "react"
import Result from "../components/result"

const MainPage = () => {


    const [search, setSearch] = useState('')
    const resultRef = useRef<any>(null);

    const { data, isFetching } = useQuery({
        queryKey: ['search'],
        queryFn: async () => {
            const res = await axios.get(`get-sample`)
            return res.data
        }
    })

     const handleKeyDown = () => {
        console.log('test');
        
        resultRef.current?.handleSearch(search);
    };

    return (
        <>
            <div className="h-[100px] bg-[#031ba3]">

            </div>

            <div className="mt-10 lg:max-w-4xl lg:mx-auto">
                <div className="flex rounded-4xl overflow-hidden border border-red-400">
                    <div className='flex-1'>
                        <input
                            type="text"
                            className="text-[#7a7a7a] px-6 py-4 w-full outline-0"
                            placeholder="Collections, Innovations, Technology, News ..."
                            name="search"
                            value={search}
                            // onKeyDown={(e) => {
                            //     if (e.key === 'Enter') {
                            //         handleKeyDown();
                            //     }
                            // }}
                            onChange={(e) => setSearch(e.target.value)}
                            autoComplete="off"
                        />
                    </div>
                    <button
                        type="button"
                        className="bg-danger py-4 pl-4 pr-6 text-white cursor-pointer active:bg-red-500 duration-150 hover:bg-red-400 ease-in-out outline-0"
                        onClick={() => {
                            console.log(search);
                            handleKeyDown();

                        }}
                    >
                        <div className='flex gap-2 items-center'>  <Search size={18}/> Search Now</div>
                    </button>
                </div>

            </div>

            <div className="mt-10 lg:max-w-4xl lg:mx-auto">
                <Result ref={resultRef}  />
            </div>


        </>
    )
}

export default MainPage