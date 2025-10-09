import { useParams } from "react-router"
import ResultIndex from "../Result/ResultIndex";
import { useEffect, useRef, useState } from "react";
import { Search } from "lucide-react";

const SearchIndex = () => {
    
    const { key } = useParams<{key:string}>();
    const [search, setSearch] = useState('')
    const resultRef = useRef<{ handleSearch: (search: string) => void }>(null)


    useEffect(() => {
        resultRef.current?.handleSearch(search)
    }, [])


    useEffect(() => {
        setSearch(key ? key : '')
    }, [])


    const handleKeyDown = () => {
        //const value = searchRef.current?.value.trim() || ""
        //setSearchValue(value)
        //navigate(`/search/${encodeURIComponent(search)}`);
        resultRef.current?.handleSearch(search)
    }


  return (
    <section
        className="mt-10 py-16 lg:max-w-7xl lg:mx-auto px-6"
    >

        <div className="my-6 w-full flex flex-col sm:flex-row rounded-3xl overflow-hidden border border-gray-200 shadow-md bg-white">
            <input
                type="text"
                value={search}
                placeholder="Search collections, innovations, technology, news & events, topics, trends..."
                className="flex-1 px-4 py-3 md:px-6 md:py-4 text-gray-700 outline-none placeholder:text-gray-400"
                onKeyDown={(e) => {
                    if (e.key === "Enter") handleKeyDown()
                }}
                onChange={(e)=>setSearch(e.target.value)}
                autoComplete="off"
            />
            <button
                type="button"
                onClick={handleKeyDown}
                className="flex items-center justify-center gap-2 bg-danger px-6 py-3 md:py-4 text-white font-medium transition-all hover:bg-red-500 active:bg-red-600"
            >
                <Search size={18} />
                <span>Search</span>
            </button>
        </div>

        {/* <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-8 text-center">
            Search Results
        </h2> */}

        <ResultIndex ref={resultRef} />

    </section>
  )
}

export default SearchIndex