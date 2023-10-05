'use client'
import { useAuth } from '@/app/context/AuthContext'
import { useComment } from '@/app/context/CommentContext'
import { useInstantiate } from '@/app/hooks/Reply/useInstantiate'
import Image from 'next/image'
import React, { useEffect } from 'react'

interface Props {
  replyingTo: string
  onBlur?: () => void
  commentId: number
  isAReply?: boolean
}

const InputReply = ({ onBlur, replyingTo, isAReply, commentId }: Props) => {
  const profile = useAuth().currentUser?.image.png!
  const { comments, updateComment, findComment } = useComment()
  const { reply: currentReply, instantiate } = useInstantiate()
  const [states, dispatch] = React.useState({
    content: `@${replyingTo}`,
    isFocused: true,
  })

  const handleBlur = (e: React.FocusEvent) => {
    if (e.relatedTarget !== null) return
    onSubmit()
    dispatch((p) => ({ ...p, isFocused: false }))
  }

  const handleClick = () => {
    onSubmit()
    dispatch((p) => ({ ...p, isFocused: false }))
  }

  const onSubmit = () => {
    if (states.content === '') return
    instantiate(states.content, replyingTo)
  }

  useEffect(() => {
    if (!currentReply) return
    const targetComment = findComment(commentId, isAReply ?? false)
    targetComment?.replies?.push(currentReply!)
    updateComment(targetComment!)
    onBlur && onBlur()
  }, [
    currentReply,
    updateComment,
    commentId,
    comments,
    isAReply,
    onBlur,
    findComment,
  ])

  return (
    <>
      {states.isFocused && (
        <div
          className='grid p-4 bg-white rounded-md grid-cols-12 grid-rows-2 items-center gap-y-4 lg:gap-x-4'
          onBlur={handleBlur}
          tabIndex={0}
        >
          <textarea
            className='border-lightGrey border rounded-lg p-4 resize-none col-span-12 row-span-2 lg:row-start-1 lg:col-start-2'
            placeholder='Add a reply...'
            rows={3}
            name='reply'
            autoFocus
            value={states.content}
            onChange={(e) =>
              dispatch((p) => ({ ...p, content: e.target.value }))
            }
          ></textarea>
          <Image
            alt='profile photo'
            src={profile.substring(1)}
            width={32}
            height={32}
            className='col-span-2 lg:row-start-1 lg:col-start-1'
          />
          <button
            className='bg-primary text-white rounded-lg py-3 px-8 col-span-4 h-12 col-start-9 lg:row-start-1 lg:col-span-2'
            onClick={handleClick}
          >
            SEND
          </button>
        </div>
      )}
    </>
  )
}

export default InputReply
