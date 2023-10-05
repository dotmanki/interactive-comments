import { useAuth } from '@/app/context/AuthContext'
import { useComment } from '@/app/context/CommentContext'
import { Comment } from '@/app/models/comment'
import { useEffect, useState } from 'react'

export const useInstantiate = () => {
  const [comment, setComment] = useState<Comment | null>(null)
  const { index } = useComment()
  const { currentUser } = useAuth()
  /**
   *
   * @param content
   * @description instantiate a comment with the given content and the current user
   */
  const instantiate = (content: string) =>
    setComment({
      id: index + 1,
      content,
      createdAt: 'now',
      replies: null,
      score: 0,
      user: currentUser!,
    })

  /**
   * @description reset comment state to null
   */
  const reset = () => setComment(null)

  return { comment, instantiate, reset }
}
