import React from 'react'

interface Props {
  content: string
  setContent: (content: string) => void
  onBlur: () => void
}

const EditingComment = ({ content, setContent, onBlur }: Props) => {
  return (
    <textarea
      value={content}
      className='col-span-12'
      autoFocus
      onChange={(e) => setContent(e.target.value)}
      onBlur={onBlur}
    ></textarea>
  )
}

export default EditingComment
