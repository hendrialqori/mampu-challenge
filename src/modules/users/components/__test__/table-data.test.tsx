import { render, screen } from "@testing-library/react"

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

describe('Table data', () => {

   it('render name of user', () => {
      renderTable()

      const users = screen.getAllByText('Hendri Alqori')
      expect(users).toHaveLength(2)
   })

   it('render derived activity signals (Total task, done, pending)', () => {
      renderTable()

      expect(screen.getAllByText("10")).toHaveLength(4)
      expect(screen.getAllByText("6")).toHaveLength(2)
      expect(screen.getAllByText("8")).toHaveLength(2)
      expect(screen.getAllByText("2")).toHaveLength(2)
      expect(screen.getAllByText("4")).toHaveLength(2)
   })

   it("shows 'No results.' when data is empty", () => {
      renderTable([])
      expect(screen.getByText(/no results./i)).toBeInTheDocument()
   })
})
