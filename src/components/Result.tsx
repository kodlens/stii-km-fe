import axios from 'axios';
import React, { useState, forwardRef, useImperativeHandle } from 'react';
import { config } from '../config/config';
import { Link } from 'react-router';


interface InfoProps {
    title: string;
    description: string;
}

const Result = forwardRef(( _, ref) => {
    const [data, setData] = useState<any[]>([]);
    const [subjectHeadings, setSubjectHeadings] = useState<string[]>([]);

    const handleSearch = (search:string) => {
        axios.get(`${config.baseUri}/api/search/s?key=${search}`).then(res => {
            setData(res.data.results.data); // adjust if structure differs
            setSubjectHeadings(res.data.related_subject_headings);
        });
    };

    // Expose methods to parent
    // useImperativeHandle(ref, (search) => (
    //     handleSearch(search)
    // ));

    useImperativeHandle(ref, ()=>({

    }))

    return (
        <div className='flex lg:flex-row flex-col gap-4'>
            <div className='bg-white shadow-lg p-4 rounded-md'>
                <div className='font-bold mb-2'>Subject Headings</div>
                <div>
                    {subjectHeadings.map((heading, i) => (
                        <Link className='text-sm' to={'#'} key={i}>{heading}</Link>
                    ))}
                </div>
            </div>

            <div className='flex-1 lg:w-[750px] rounded-md bg-white shadow-lg p-4'>
                <div className='mb-2 font-bold'>Result(s)</div>
                {data.map((item: InfoProps, i) => (
                    <div key={i} className='mb-4'>
                        <h3 className='text-lg font-semibold'>{item.title}</h3>
                        <div
                            dangerouslySetInnerHTML={{ __html: item.description }}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
});

export default Result;
