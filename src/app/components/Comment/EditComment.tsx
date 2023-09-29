import Image from 'next/image'
import React from 'react'
import iconDelete from '@public/images/icon-delete.svg'
import iconEdit from '@public/images/icon-edit.svg'

const EditComment = () => {
  return (
    <div className='flex gap-4 col-span-6 justify-self-end lg:row-start-1'>
      <button className='text-red-500 flex gap-2 items-center'>
        <Image alt='icon delete' src={iconDelete} width={14} height={13} />
        Delete
      </button>
      <button className='text-primary flex gap-2 items-center'>
        <Image alt='icon delete' src={iconEdit} width={14} height={13} />
        Edit
      </button>
    </div>
  )
}

export default EditComment
