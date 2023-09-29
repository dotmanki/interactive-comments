import Image from 'next/image'
import React from 'react'

const InputComment = ({ profile }: { profile: string }) => {
  return (
    <div className='flex flex-col gap-4 p-4 bg-white rounded-md'>
      <textarea
        name='comment'
        className='border-lightGrey border rounded-lg p-4 resize-none'
        placeholder='Add a comment...'
        rows={3}
      ></textarea>
      <div className='flex justify-between items-center'>
        <Image
          alt='profile photo'
          src={profile.substring(1)}
          width={32}
          height={32}
        />
        <button className='bg-primary text-white rounded-lg py-3 px-8'>
          SEND
        </button>
      </div>
    </div>
  )
}

export default InputComment
