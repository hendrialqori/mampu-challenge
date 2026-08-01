import { User } from "@/interfaces/user";
import { render, screen } from "@testing-library/react";
import { AvatarHeader } from "../avatar-header";
import userEvent from "@testing-library/user-event";

const mockBack = jest.fn()

const renderAvatarHeader = () => {
   const data = {
      name: "Hendri Alqori",
      email: 'hendri@email.com'
   } as User

   return render(<AvatarHeader data={data} />)
}

jest.mock("next/navigation", () => ({
   useRouter: () => ({
      back: mockBack
   }),
}));

describe('Avatar header', () => {

   beforeEach(() => {
      mockBack.mockClear()
   })

   it('should render user data perfectly', () => {
      renderAvatarHeader()

      expect(screen.getByText('Hendri Alqori')).toBeInTheDocument()
      expect(screen.getByText('hendri@email.com')).toBeInTheDocument()
   })

   it('should call route.back when clicked', async () => {
      const user = userEvent.setup()

      renderAvatarHeader()

      await user.click(
         screen.getByRole('button', { name: /back/i })
      )

      expect(mockBack).toHaveBeenCalledTimes(1)
   })
})