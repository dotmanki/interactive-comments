import Image from 'next/image'
import React from 'react'
import iconPlus from '@public/images/icon-plus.svg'
import iconMinus from '@public/images/icon-minus.svg'

const Score = ({ score }: { score: number }) => {
  return (
    <div className='flex gap-5 items-center text-primary rounded-lg bg-veryLightGrey p-2'>
      <Image alt='icon plus' src={iconPlus} width={12} height={12} />
      <span className='text-primary'>{score}</span>
      <Image alt='icon minus' src={iconMinus} width={12} height={12} />
    </div>
  )
}

export default Score
