import Image from 'next/image'
import React from 'react'
import iconPlus from '@public/images/icon-plus.svg'
import iconMinus from '@public/images/icon-minus.svg'
import { useComment } from '../context/CommentContext'

interface Props {
  id: number
  score: number
  isAReply?: boolean
}

const Score = ({ score, id, isAReply }: Props) => {
  const { findComment, updateComment } = useComment()
  const comment = findComment(id, isAReply ?? false)
  const [states, dispatch] = React.useState({
    score: score,
    initialScore: score,
    addButton: false,
    minusButton: false,
  })

  const onSubmit = (add?: boolean) => {
    add
      ? dispatch((p) => ({ ...p, score: p.initialScore + 1 }))
      : dispatch((p) => ({ ...p, score: p.initialScore - 1 }))
    comment!.score = states.score
    updateComment(comment!)
  }

  return (
    <div className=' w-fit flex gap-5 items-center text-primary rounded-xl bg-veryLightGrey p-2 lg:flex-col lg:w-10 lg:py-3'>
      <button
        onClick={() => {
          onSubmit(true)
          dispatch((p) => ({ ...p, addButton: true, minusButton: false }))
        }}
        disabled={states.addButton}
      >
        <Image alt='icon plus' src={iconPlus} width={12} height={12} />
      </button>
      <span className='text-primary'>{states.score}</span>
      <button
        onClick={() => {
          onSubmit(false)
          dispatch((p) => ({ ...p, minusButton: true, addButton: false }))
        }}
        disabled={states.minusButton}
      >
        <Image alt='icon minus' src={iconMinus} width={12} height={12} />
      </button>
    </div>
  )
}

export default Score
