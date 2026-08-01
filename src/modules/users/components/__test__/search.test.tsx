import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"

import { DataTable } from "../data-table"
import { columns } from "../column"
import { UserWithStats } from "@/interfaces/user"

jest.mock("@/modules/users/hooks/use-qs-table", () => ({
   useQueryStringTable: () => ({
      pagination: {
         pageIndex: 0,
         pageSize: 5,
      },
      globalFilter: "",
      sorting: [],
      setPagination: jest.fn(),
      setGlobalFilter: jest.fn(),
      setSorting: jest.fn(),
   }),
}))

const mockUsers = [
   {
      id: 1,
      name: 'Hendri Alqori',
      email: 'hendri@email.com',
      website: 'hendri.com',
      task: 10,
      pending: 4,
      done: 6
   },
   {
      id: 2,
      name: 'Budi',
      email: 'budi@email.com',
      website: 'budi.com',
      task: 10,
      pending: 2,
      done: 8
   }
] as UserWithStats[]

const renderTable = (data = mockUsers) => {
   return render(
      <DataTable
         columns={columns}
         data={data}
      />
   )
}

describe('Search / filter', () => {

   it('render search input', async () => {
      renderTable()

      const input = screen.getByPlaceholderText(/search name or email/i)
      expect(input).toBeInTheDocument()
   })

   it("allows typing in search input without crashing", async () => {
      renderTable()

      const input = screen.getByPlaceholderText(/search name or email/i)
      await userEvent.type(input, "Hendri")
      expect(input).toBeInTheDocument()
   })
})
