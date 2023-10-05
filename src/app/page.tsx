'use client'
import CommentList from './components/Comment/CommentList'
import Skeleton from './components/Comment/Skeleton'
import InputComment from './components/InputComment'
import { useComment } from './context/CommentContext'

export default function Home() {
  const { comments } = useComment()
  return (
    <main className='p-4 pt-8 bg-veryLightGrey min-h-screen lg:flex lg:justify-center lg:items-center'>
      <div className='w-full h-full flex flex-col gap-4 lg:w-1/2'>
        {Array.isArray(comments) ? (
          <>
            <CommentList comments={comments} />

            <InputComment />
          </>
        ) : (
          <Skeleton />
        )}
      </div>
    </main>
  )
}
