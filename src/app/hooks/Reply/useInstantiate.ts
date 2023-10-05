import { useAuth } from '@/app/context/AuthContext'
import { useComment } from '@/app/context/CommentContext'
import { Reply } from '@/app/models/reply'
import { useState } from 'react'

export const useInstantiate = () => {
  const [reply, setReply] = useState<Reply | null>(null)
  const { index } = useComment()
  const { currentUser } = useAuth()
  /**
   *
   * @description instantiate a comment with the given content and the current user
   */
  const instantiate = (content: string, replyingTo: string) => {
    if (content.includes(`@${replyingTo}`))
      content = content.replace(`@${replyingTo}`, '')
    setReply({
      id: index + 1,
      content,
      createdAt: 'now',
      score: 0,
      user: currentUser!,
      replyingTo,
    })
  }

  /**
   * @description reset comment state to null
   */
  const reset = () => setReply(null)

  return { reply, instantiate, reset }
}
