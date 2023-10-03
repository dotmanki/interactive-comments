'use client'
import React, { useContext } from 'react'
import { Comment } from '../../models/comment'
import Reply from '../Reply'
import Score from '../Score'
import CommentHeader from './CommentHeader'
import CommentContent from './CommentContent'
import ReplyComponent from './Reply'
import EditComment from './EditComment'
import InputReply from './InputReply'
import { useAuth } from '@/app/context/AuthContext'

interface Props extends Comment {
  isReply?: boolean
  replyingTo?: string
}

const CommentComponent = ({
  user,
  createdAt,
  content,
  score,
  replies,
  isReply = false,
  replyingTo,
}: Props) => {
  const isYourComment = useAuth().currentUser?.username === user.username
  const [isReplying, setIsReplying] = React.useState(false)
  return (
    <>
      <div className='grid grid-cols-12 gap-y-4 items-center p-4 bg-white rounded-md lg:p-6 lg:gap-y-6'>
        <CommentHeader
          user={user}
          createdAt={createdAt}
          isYourComment={isYourComment}
        />
        <CommentContent
          content={content}
          isReply={isReply}
          replyingTo={replyingTo}
        />

        <div
          className={`col-span-${
            isYourComment ? 6 : 10
          } lg:col-start-1 lg:row-start-1 lg:col-span-1 lg:row-span-2 lg:self-start`}
        >
          <Score score={score} />
        </div>

        {!isYourComment ? (
          <ReplyComponent
            isEnabled={!isReplying}
            onClick={() => setIsReplying(!isReplying)}
          />
        ) : (
          <EditComment />
        )}
      </div>
      {!!replies && replies.length > 0 && (
        <div className='border-transparent border-l-lightGrey border-l-2 flex flex-col gap-4 lg:ml-10'>
          {replies.map((reply) => (
            <Reply key={reply.id} {...reply} />
          ))}
        </div>
      )}
      {isReplying && (
        <InputReply
          onBlur={() => setIsReplying(false)}
          replyingTo={user.username}
        />
      )}
    </>
  )
}

export default CommentComponent
