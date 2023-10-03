import { Comment } from '../../models/comment'
import { User } from '../../models/user'
import data from '../data.json'
export interface Payload {
  currentUser: User
  comments: Comment[]
}

export async function GET() {
  return Response.json(data.comments)
}
