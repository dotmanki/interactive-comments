'use client'

import { createContext, useContext, useEffect } from 'react'
import { Comment } from '../models/comment'
import { useLocalStorage } from '../hooks/useLocalStorage'

interface CommentContextProps {
  comments: Comment[]
  createComment: (comment: Comment) => void
  updateComment: (comment: Comment) => void
  deleteComment: (comment: Comment) => void
}

const CommentContext = createContext<CommentContextProps>({
  comments: [],
  createComment: () => {},
  updateComment: () => {},
  deleteComment: () => {},
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

  const createComment = (comment: Comment) => {
    setComments([...comments, comment])
  }

  const updateComment = (comment: Comment) => {
    setComments([...comments.filter((c) => c.id !== comment.id), comment])
  }

  const deleteComment = (comment: Comment) => {
    setComments([...comments.filter((c) => c.id !== comment.id)])
  }

  return (
    <CommentContext.Provider
      value={{ comments, createComment, deleteComment, updateComment }}
    >
      {children}
    </CommentContext.Provider>
  )
}
