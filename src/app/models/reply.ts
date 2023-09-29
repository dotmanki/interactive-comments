import { Comment } from './comment'

export interface Reply extends Omit<Comment, 'replies'> {
  replyingTo: string
}
