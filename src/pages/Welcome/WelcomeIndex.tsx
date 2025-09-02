import { useEffect, useRef } from "react";
import { Search } from "lucide-react";
import LogoWithTitle from "../../components/LogoWithTitle";
import ResultIndex from "../Result/ResultIndex";

export const WelcomeIndex = () => {

    const searchRef = useRef<HTMLInputElement>(null)

    const resultRef = useRef<{ handleSearch: (search: string) => void }>(null);

    // const { data, isFetching } = useQuery({
    //     queryKey: ['search'],
    //     queryFn: async () => {
    //         const res = await axios.get(`get-sample`)
    //         return res.data
    //     }
    // })CSS (Centralize Science Search Engine)"

    useEffect(() => {
        handleKeyDown()
    }, [])

    const handleKeyDown = () => {
        const value = searchRef.current?.value || "";
        resultRef.current?.handleSearch(value);
    };


    return (
        <>
            <div className="mt-4 lg:max-w-7xl lg:mx-auto">
                
                <div className="mx-4">
                    <LogoWithTitle />
                </div>

                <div className="text-center text-2xl font-bold mb-4 mx-4">STII - Knowledge Manangement</div>

                <div className="flex rounded-4xl overflow-hidden border border-red-400 mx-4">
                    <div className='flex-1'>
                        <input
                            type="text"
                            className="text-[#7a7a7a] px-4 py-2 md:px-6 md:py-4 w-full outline-0"
                            placeholder="Collections, Innovations, Technology, News & Events, Topics, Trends..."
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
                        className="bg-danger md:py-4 pl-4 pr-6 text-white cursor-pointer active:bg-red-500 duration-150 hover:bg-red-400 ease-in-out outline-0]"
                        onClick={() => {
                            handleKeyDown();
                        }}
                    >
                        <div className='flex gap-2 items-center'>  <Search size={18} /> Search</div>
                    </button>
                </div>

            </div>

            <div className="mt-10 lg:max-w-7xl lg:mx-auto">
                <ResultIndex ref={resultRef} />
            </div>
        </>
    )
}
