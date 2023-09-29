import { Comment } from '@/app/models/comment'
import React from 'react'

interface Props extends Pick<Comment, 'content'> {
  isReply?: boolean
  replyingTo?: string
}

const CommentContent = ({ isReply, content, replyingTo }: Props) => {
  return (
    <p className='text-grayishBlue col-span-12 lg:row-start-2'>
      {isReply && (
        <span className='text-primary font-bold'>@{replyingTo} </span>
      )}
      {content}
    </p>
  )
}

export default CommentContent
