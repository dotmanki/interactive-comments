import { Payload } from './api/route'
import Comment from './components/Comment/Comment'
import InputComment from './components/InputComment'
import UserContainer from './components/UserContainer'

export default async function Home() {
  const data = await fetch(`${process.env.URL}/api`, { cache: 'no-cache' })
  const res: Payload = await data.json()
  return (
    <main className='p-4 pt-8 bg-veryLightGrey h-full lg:flex lg:justify-center lg:items-center'>
      <div className='w-full h-full flex flex-col gap-4 lg:w-1/2'>
        <UserContainer value={res.currentUser}>
          {res.comments.map((comment) => (
            <Comment key={comment.id} {...comment} />
          ))}
          <InputComment />
        </UserContainer>
      </div>
    </main>
  )
}
