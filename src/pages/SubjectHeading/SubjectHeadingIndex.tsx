import { useParams } from 'react-router'

const SubjectHeadingIndex = () => {
    const { subjectHeading } = useParams< { subjectHeading:string } >()

  return (
    <div>
        { subjectHeading }
        SubjectHeadingIndex

    </div>
  )
}

export default SubjectHeadingIndex