import React from 'react'
import CommentComponent from './Comment'
import { Reply } from '../models/reply'

const Reply = ({ ...props }: Reply) => {
  return (
    <div className='pl-4 lg:pl-10'>
      <CommentComponent isReply {...props} replies={null} />
    </div>
  )
}

export default Reply
