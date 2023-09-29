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
  const isYourComment = user.username === 'juliusomo'
  return (
    <>
      <div className='grid grid-cols-12 gap-y-4 items-center p-4 bg-white rounded-md lg:p-6 lg:gap-y-6'>
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

        <p className='text-grayishBlue col-span-12 lg:row-start-2'>
          {isReply && (
            <span className='text-primary font-bold'>@{replyingTo} </span>
          )}
          {content}
        </p>
        <div
          className={`col-span-${
            isYourComment ? 6 : 10
          } lg:col-start-1 lg:row-start-1 lg:col-span-1 lg:row-span-2 lg:self-start`}
        >
          <Score score={score} />
        </div>

        {!isYourComment ? (
          <button className='text-primary flex gap-2 items-center justify-self-end lg:row-start-1 lg:col-span-3'>
            <Image alt='icon reply' src={iconReply} width={14} height={13} />
            Reply
          </button>
        ) : (
          <div className='flex gap-4 col-span-6 justify-self-end lg:row-start-1'>
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
              <Image alt='icon delete' src={iconEdit} width={14} height={13} />
              Edit
            </button>
          </div>
        )}
      </div>
      {!!replies && replies.length > 0 && (
        <div className='border-transparent border-l-lightGrey border-l-2 flex flex-col gap-4 lg:ml-10'>
          {replies.map((reply) => (
            <Reply key={reply.id} {...reply} />
          ))}
        </div>
      )}
    </>
  )
}

export default CommentComponent
