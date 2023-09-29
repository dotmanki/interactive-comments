import Image from 'next/image'
import React from 'react'
import iconReply from '@public/images/icon-reply.svg'

const Reply = () => {
  return (
    <button className='text-primary flex gap-2 items-center justify-self-end lg:row-start-1 lg:col-span-3'>
      <Image alt='icon reply' src={iconReply} width={14} height={13} />
      Reply
    </button>
  )
}

export default Reply
