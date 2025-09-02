import { useParams } from 'react-router'

const TopicIndex = () => {

    const { subjectHeading } = useParams<{ subjectHeading: string }>();

    return (
        <div>
            {subjectHeading}
        </div>
    )
}

export default TopicIndex