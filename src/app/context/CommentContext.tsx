'use client'

import { createContext, useContext, useEffect } from 'react'
import { Comment } from '../models/comment'
import { useLocalStorage } from '../hooks/useLocalStorage'
import { Reply } from '../models/reply'

interface CommentContextProps {
  comments: Comment[]
  submitComment: (comment: Comment) => void
  updateComment: (comment: Comment) => void
  deleteComment: (id: number) => void
  findComment: (id: number, isAReply: boolean) => Comment | undefined
  index: number
}

const CommentContext = createContext<CommentContextProps>({
  comments: [],
  submitComment: () => {},
  updateComment: () => {},
  deleteComment: () => {},
  findComment: () => undefined,
  index: 0,
})

export const useComment = () => {
  const context = useContext(CommentContext)
  if (!context)
    throw new Error('useComment must be used within a CommentProvider')
  return context
}

export const CommentProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const { state: comments, setState: setComments } = useLocalStorage<Comment[]>(
    'comments',
    [],
  )
  // static id for testing purposes
  const { state: index, setState: setIndex } = useLocalStorage<number>(
    'index',
    4,
  )

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const res = await fetch(`/api/comments`, {
          cache: 'no-cache',
        })
        const data = await res.json()
        setComments(data)
      } catch (error) {
        console.error(error)
      }
    }
    fetchComments()
  }, [setComments])

  const submitComment = (comment: Comment) => {
    setComments([...comments, comment])
    setIndex(index + 1)
  }

  const updateComment = (comment: Comment | Reply) => {
    if ('replyingTo' in comment) {
      setComments([
        ...comments.filter(
          (c) => c.replies?.filter((r) => r.id !== comment.id),
        ),
      ])
    } else {
      setComments([...comments.filter((c) => c.id !== comment.id), comment])
    }
  }

  const deleteComment = (id: number) => {
    setComments([
      ...comments.filter((c) => {
        if (c.replies) {
          const filteredReplies = c.replies.filter((r) => {
            return r.id !== id
          })
          c.replies = filteredReplies
        }
        return c.id !== id
      }),
    ])
  }

  const findComment = (id: number, isAReply: boolean) =>
    isAReply
      ? comments.find(
          (c) =>
            c.replies?.find((r) => {
              return r.id === id
            }),
        )
      : comments.find((c) => {
          return c.id === id
        })

  return (
    <CommentContext.Provider
      value={{
        comments,
        submitComment,
        deleteComment,
        updateComment,
        findComment,
        index,
      }}
    >
      {children}
    </CommentContext.Provider>
  )
}

/* const isReply = (x: any): x is Reply => {
  return 'replyingTo' in x
} */
