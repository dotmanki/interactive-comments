'use client'
import { Payload } from './api/comments/route'
import Comment from './components/Comment/Comment'
import InputComment from './components/InputComment'
import { useComment } from './context/CommentContext'

export default function Home() {
  const { comments } = useComment()
  return (
    <main className='p-4 pt-8 bg-veryLightGrey h-full lg:flex lg:justify-center lg:items-center'>
      <div className='w-full h-full flex flex-col gap-4 lg:w-1/2'>
        {comments.map((comment) => (
          <Comment key={comment.id} {...comment} />
        ))}
        <InputComment />
      </div>
    </main>
  )
}
