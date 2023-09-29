import Image from 'next/image'
import React from 'react'
import { Comment } from '@/app/models/comment'

interface Props extends Pick<Comment, 'user' | 'createdAt'> {
  isYourComment?: boolean
}

const CommentHeader = ({ user, isYourComment, createdAt }: Props) => {
  return (
    <>
      <Image
        alt='profile photo'
        src={user.image.webp.substring(1)}
        width={32}
        height={32}
        className='col-span-2 lg:col-start-2 lg:row-start-1'
      />
      <div className='col-span-10 flex gap-4 lg:col-start-3 lg:row-start-1 lg:col-end-10'>
        <span className='font-bold'>{user.username}</span>
        {isYourComment && (
          <span className='text-white bg-primary rounded py-1 px-2 font-bold text-xs'>
            you
          </span>
        )}
        <span className='text-grayishBlue'>{createdAt}</span>
      </div>
    </>
  )
}

export default CommentHeader
