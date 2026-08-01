import { Post } from "@/interfaces/post"
import { render, screen } from "@testing-library/react"
import { PostList } from "../post-list"

const mockPosts = [
   {
      id: 1,
      title: 'Javascript closure',
      body: 'lorem ipsum dolor si amet'
   }
] as Post[]

const renderPosts = (data = mockPosts) => {
   return render(<PostList data={data} />)
}

describe('Posts section', () => {

   it('should render title and body perfectly', () => {
      renderPosts()

      expect(screen.getByText(/javascript closure/i)).toBeInTheDocument()
      expect(screen.getByText(/lorem ipsum dolor si amet/i)).toBeInTheDocument()
   })

   it('should show "No posts exists." with empty props data', () => {
      renderPosts([])

      expect(screen.getByText('No posts exists.')).toBeInTheDocument()
   })

})