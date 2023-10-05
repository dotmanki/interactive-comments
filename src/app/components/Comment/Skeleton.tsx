import React from 'react'

const Skeleton = () => {
  return (
    <div className='w-full h-64 border-2 rounded-md mx-auto'>
      <div className='flex animate-pulse flex-col h-full p-4 gap-4'>
        <div className='flex gap-2 items-center'>
          <div className='w-8 bg-gray-300 h-8 rounded-full '></div>
          <div className='w-60 bg-gray-300 h-6 rounded-md '></div>
        </div>
        <div className='w-full bg-gray-300 h-2/3 rounded-md'></div>
        <div className='flex gap-2 items-center justify-between h-8'>
          <div className='w-24 bg-gray-300 h-full rounded-md '></div>
          <div className='w-24 bg-gray-300 h-full rounded-md '></div>
        </div>
      </div>
    </div>
  )
}

const SkeletonList = () => {
  return (
    <>
      <Skeleton />
      <Skeleton />
      <Skeleton />
      <Skeleton />
    </>
  )
}

export default SkeletonList
