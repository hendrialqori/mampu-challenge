import ErrorPage from "@/app/users/[id]/error"
import { render, screen } from "@testing-library/react"

jest.mock("next/navigation", () => ({
   useRouter: () => ({
      back: jest.fn()
   }),
}));

describe('Error state', () => {

   it('should render error message', () => {

      const error = new Error('Failed to load data user')
      render(<ErrorPage error={error} />)

      expect(screen.getByText('Detail Error!')).toBeInTheDocument()
      expect(screen.getByText(/failed to load data user/i)).toBeInTheDocument()

   })

})