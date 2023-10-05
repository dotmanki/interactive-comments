import { Comment } from '@/app/models/comment'
import CommentComponent from './Comment'

interface CommentListProps {
  comments: Comment[]
}

const CommentList = ({ comments }: CommentListProps) => {
  const sortedComments = comments.sort((a, b) => b.score - a.score)

  return (
    <>
      {sortedComments.map((comment) => (
        <CommentComponent key={comment.id} {...comment} />
      ))}
    </>
  )
}

export default CommentList
