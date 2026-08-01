import { User } from "@/interfaces/user";
import { render, screen } from "@testing-library/react";
import { PersonalInfo } from "../personal-info";

const mockUser = {
   id: 1,
   name: 'Hendri Alqori',
   username: 'hendrialqori',
   email: 'hendri@email.com',
   address: {
      city: 'Pontianak',
      geo: {
         lat: "1",
         lng: "2"
      },
      street: 'test',
      suite: '1',
      zipcode: '220'
   },
   company: {
      name: 'test',
      bs: 'test',
      catchPhrase: 'test'
   },
   phone: '01010',
   website: 'test.com'

} as User

describe('Personal info section', () => {

   it('should render data user perfectly', () => {
      render(<PersonalInfo data={mockUser} />)

      // name
      expect(screen.getByText(/hendri alqori/i)).toBeInTheDocument()
      // email
      expect(screen.getByText(/hendri@email.com/i)).toBeInTheDocument()
      // address
      expect(screen.getByText(/pontianak/i)).toBeInTheDocument()
   })

})