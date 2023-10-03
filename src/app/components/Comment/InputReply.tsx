'use client'
import { useAuth } from '@/app/context/AuthContext'
import Image from 'next/image'
import React, { useContext } from 'react'

interface Props {
  replyingTo: string
  onBlur?: () => void
}

const InputReply = ({ onBlur, replyingTo }: Props) => {
  const profile = useAuth().currentUser?.image.webp!
  const [isFocused, setIsFocused] = React.useState(true)

  const handleBlur = (e: React.FocusEvent) => {
    if (e.relatedTarget !== null) return
    setIsFocused(false)
    onBlur && onBlur()
  }

  const [reply, setReply] = React.useState(`@${replyingTo}`)
  return (
    <>
      {isFocused && (
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
            value={reply}
            onChange={(e) => setReply(e.target.value)}
          ></textarea>
          <Image
            alt='profile photo'
            src={profile.substring(1)}
            width={32}
            height={32}
            className='col-span-2 lg:row-start-1 lg:col-start-1'
          />
          <button className='bg-primary text-white rounded-lg py-3 px-8 col-span-4 h-12 col-start-9 lg:row-start-1 lg:col-span-2'>
            SEND
          </button>
        </div>
      )}
    </>
  )
}

export default InputReply
