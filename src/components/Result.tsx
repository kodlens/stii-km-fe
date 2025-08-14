import axios from 'axios';
import  { useState, forwardRef, useImperativeHandle } from 'react';
import { config } from '../config/config';
import { Link } from 'react-router';
import Loader from './loader/Loader';
import type { SubjectHeading } from '../types/subjectHeading';


interface InfoProps {
    title: string;
    description: string;
    slug:string;
    source_url:string;
}

const Result = forwardRef(( _, ref) => {
    const [data, setData] = useState<any[]>([]);
    const [subjectHeadings, setSubjectHeadings] = useState<SubjectHeading[]>([]);
    const [loading, setLoading] = useState<boolean>(false)


    const truncateWords = (str: string, maxLength = 100) => {
        if (!str) return "";
        if (str.length <= maxLength) return str;
        return str.slice(0, str.lastIndexOf(" ", maxLength)) + "…";
      };

    const handleSearch = (search:string) => {
        setLoading(true)
        console.log('from result component')
        axios.get(`${config.baseUri}/api/search/s?key=${search}`).then(res => {
            setData(res.data.results.data); // adjust if structure differs
            setSubjectHeadings(res.data.related_subject_headings);
            setLoading(false)

        }).catch(err => {
            console.log(err.response.message);
            setLoading(false)
        });
    };

    // Expose methods to parent
    // useImperativeHandle(ref, (search) => (
    //     handleSearch(search)
    // ));

    useImperativeHandle(ref, ()=>({
        handleSearch
    }))

    if(loading){
        return <Loader />
    }

    return (
        
        <div className='flex lg:flex-row flex-col gap-4'>
            <div className='p-4 lg:w-[250px]'>
                <div className='font-bold mb-2'>Topics</div>
                <div className='flex flex-col gap-2 '>
                    { subjectHeadings.length > 0 ? (
                        subjectHeadings.map((heading, i) => (
                            <Link className='text-[14px] text-blue-600' to={`/subject-headings/${heading.slug}`} 
                                key={i}>{heading.subject_heading}
                            </Link>
                        ))
                    ): (
                        <div className='italic text-sm'>No resulst found...</div>
                    )}
                   
                </div>
            </div>

           

            <div className='w-full py-4 px-6'>
                <div className='mb-2 font-bold'>Digital Collections</div>
                { data?.length > 0 ? (
                    data?.map((item: InfoProps, i) => (
                        <div key={i} className='mb-4'>
                            <h3 className='text-lg font-semibold text-blue-400'>
                                <Link className='hover:underline' to={`${item.source_url}/article/${item.slug}`}
                                    target='_blank'
                                >{item.title}</Link>
                            </h3>
                            <div
                                className='italic'
                                dangerouslySetInnerHTML={{ __html: item.description}}
                            />

                            { item.source_url ? (
                                <Link className='text-sm text-blue-500' to={item.source_url}>{item.source_url}</Link>
                            ) : null
                            }
                        </div>
                    ))
                ) : (
                    <div className='italic text-sm'>No resulst found...</div>
                ) }
                
            </div>
        </div>
    );
});

export default Result;
