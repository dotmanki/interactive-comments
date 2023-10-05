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
import EditingComment from './EditingComment'

interface Props extends Comment {
  isReply?: boolean
  replyingTo?: string
}

const CommentComponent = ({
  id,
  user,
  createdAt,
  content,
  score,
  replies,
  isReply = false,
  replyingTo,
}: Props) => {
  const isYourComment = useAuth().currentUser?.username === user.username
  const [states, dispatch] = React.useState({
    isEditing: false,
    currentContent: content,
    isReplying: false,
  })
  return (
    <>
      <div className='grid grid-cols-12 gap-y-4 items-center p-4 bg-white rounded-md lg:p-6 lg:gap-y-6'>
        <CommentHeader
          user={user}
          createdAt={createdAt}
          isYourComment={isYourComment}
        />
        {!states.isEditing ? (
          <CommentContent
            content={states.currentContent}
            isReply={isReply}
            replyingTo={replyingTo}
          />
        ) : (
          <EditingComment
            content={states.currentContent}
            setContent={(content) =>
              dispatch((p) => ({ ...p, currentContent: content }))
            }
            onBlur={() => dispatch((p) => ({ ...p, isEditing: false }))}
          />
        )}

        <div
          className={`col-span-${
            isYourComment ? 6 : 10
          } lg:col-start-1 lg:row-start-1 lg:col-span-1 lg:row-span-2 lg:self-start`}
        >
          <Score score={score} id={id} isAReply={isReply} />
        </div>

        {!isYourComment ? (
          <ReplyComponent
            isEnabled={!states.isReplying}
            onClick={() => dispatch((p) => ({ ...p, isReplying: true }))}
          />
        ) : (
          <EditComment
            id={id}
            handleUpdate={() => dispatch((p) => ({ ...p, isEditing: true }))}
            isEditing={states.isEditing}
          />
        )}
      </div>
      {!!replies && replies.length > 0 && (
        <div className='border-transparent border-l-lightGrey border-l-2 flex flex-col gap-4 lg:ml-10'>
          {replies.map((reply) => (
            <Reply key={reply.id} {...reply} />
          ))}
        </div>
      )}
      {states.isReplying && (
        <InputReply
          onBlur={() => dispatch((p) => ({ ...p, isReplying: false }))}
          replyingTo={user.username}
          commentId={id}
          isAReply={isReply}
        />
      )}
    </>
  )
}

export default CommentComponent
