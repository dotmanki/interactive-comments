import Image from 'next/image'
import React, { useState } from 'react'
import iconDelete from '@public/images/icon-delete.svg'
import iconEdit from '@public/images/icon-edit.svg'
import { useComment } from '@/app/context/CommentContext'

interface Props {
  id: number
  handleUpdate: () => void
  isEditing: boolean
}

const EditComment = ({ id, handleUpdate, isEditing }: Props) => {
  const { deleteComment } = useComment()
  const onDeleteClick = () => {
    deleteComment(id)
  }

  const onUpdateClick = () => {
    handleUpdate()
  }
  return (
    <div className='flex gap-4 col-span-6 justify-self-end lg:row-start-1'>
      <button
        className='text-red-500 flex gap-2 items-center disabled:opacity-50'
        onClick={onDeleteClick}
        disabled={isEditing}
      >
        <Image alt='icon delete' src={iconDelete} width={14} height={13} />
        Delete
      </button>

      <button
        className='text-primary flex gap-2 items-center disabled:opacity-50'
        onClick={onUpdateClick}
        disabled={isEditing}
      >
        <Image alt='icon edit' src={iconEdit} width={14} height={13} />
        Edit
      </button>
    </div>
  )
}

export default EditComment
