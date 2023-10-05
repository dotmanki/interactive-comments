'use client'
import Image from 'next/image'
import React, { useEffect } from 'react'
import { useAuth } from '../context/AuthContext'
import { useComment } from '../context/CommentContext'
import { Comment } from '../models/comment'
import { useInstantiate } from '../hooks/Comment/useInstantiate'

const InputComment = () => {
  const { submitComment } = useComment()
  const [content, setContent] = React.useState<string>('')
  const [isLoading, setIsLoading] = React.useState(false)
  const { comment, instantiate, reset } = useInstantiate()

  const handleClick = async () => {
    setIsLoading(true)
    instantiate(content)
  }

  useEffect(() => {
    if (comment) {
      submitComment(comment)
      setContent('')
      reset()
      setIsLoading(false)
    }
  }, [submitComment, reset, comment])
  const profile = useAuth().currentUser?.image.webp
  return (
    <div className='grid p-4 bg-white rounded-md grid-cols-12 grid-rows-2 items-center gap-y-4 lg:gap-x-4'>
      <textarea
        name='comment'
        className='border-lightGrey border rounded-lg p-4 resize-none col-span-12 row-span-2 lg:row-start-1 lg:col-start-2'
        placeholder='Add a comment...'
        rows={3}
        onChange={({ target: { value } }) => setContent(value)}
        value={content}
      ></textarea>
      {
        <Image
          alt='profile photo'
          src={profile ? profile.substring(1) : '/images/favicon.png'}
          width={32}
          height={32}
          className='col-span-2 lg:row-start-1 lg:col-start-1'
        />
      }
      <button
        className='bg-primary text-white rounded-lg py-3 px-8 col-span-4 h-12 col-start-9 lg:row-start-1 lg:col-span-2 disabled:opacity-50'
        disabled={isLoading}
        onClick={handleClick}
      >
        SEND
      </button>
    </div>
  )
}

export default InputComment
