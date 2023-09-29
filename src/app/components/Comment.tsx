import React from 'react'
import { Comment } from '../models/comment'
import Image from 'next/image'
import iconReply from '@public/images/icon-reply.svg'
import Reply from './Reply'
import Score from './Score'
import iconDelete from '@public/images/icon-delete.svg'
import iconEdit from '@public/images/icon-edit.svg'

interface Props extends Comment {
  isReply?: boolean
}

const CommentComponent = ({
  user,
  createdAt,
  content,
  score,
  replies,
  isReply = false,
}: Props) => {
  const isYourComment = user.username === 'juliusomo'
  return (
    <>
      <div className='flex flex-col gap-4 p-4 bg-white rounded-md'>
        <div className='flex gap-4 items-center'>
          <Image
            alt='profile photo'
            src={user.image.webp.substring(1)}
            width={32}
            height={32}
          />
          <span className='font-bold'>{user.username}</span>
          {isYourComment && (
            <span className='text-white bg-primary rounded py-1 px-2 font-bold text-xs'>
              you
            </span>
          )}
          <span className='text-grayishBlue'>{createdAt}</span>
        </div>
        <p className='text-grayishBlue'>
          {isReply && (
            <span className='text-primary font-bold'>@{user.username} </span>
          )}
          {content}
        </p>
        <div className='flex justify-between'>
          <Score score={score} />
          {!isYourComment ? (
            <button className='text-primary flex gap-2 items-center'>
              <Image alt='icon reply' src={iconReply} width={14} height={13} />
              Reply
            </button>
          ) : (
            <div className='flex gap-4'>
              <button className='text-red-500 flex gap-2 items-center'>
                <Image
                  alt='icon delete'
                  src={iconDelete}
                  width={14}
                  height={13}
                />
                Delete
              </button>
              <button className='text-primary flex gap-2 items-center'>
                <Image
                  alt='icon delete'
                  src={iconEdit}
                  width={14}
                  height={13}
                />
                Edit
              </button>
            </div>
          )}
        </div>
      </div>
      {!!replies && replies.length > 0 && (
        <div className='border-transparent border-l-lightGrey border-l-2 flex flex-col gap-4'>
          {replies.map((reply) => (
            <Reply key={reply.id} {...reply} />
          ))}
        </div>
      )}
    </>
  )
}

export default CommentComponent
