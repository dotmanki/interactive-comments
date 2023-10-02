'use client'
import Image from 'next/image'
import React, { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'

const InputComment = () => {
  const profile = useContext(AuthContext).currentUser?.image.webp!
  return (
    <div className='grid p-4 bg-white rounded-md grid-cols-12 grid-rows-2 items-center gap-y-4 lg:gap-x-4'>
      <textarea
        name='comment'
        className='border-lightGrey border rounded-lg p-4 resize-none col-span-12 row-span-2 lg:row-start-1 lg:col-start-2'
        placeholder='Add a comment...'
        rows={3}
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
  )
}

export default InputComment
