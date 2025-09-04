import { useParams } from 'react-router'

const SubjectIndex = () => {

    const { subject } = useParams<{ subject: string }>();

    return (
        <div className='mt-20 p-6 bg-red-200 mx-auto max-w-7xl'>
            <div className=''>
                 {subject}
            </div>
        </div>
    )
}

export default SubjectIndex