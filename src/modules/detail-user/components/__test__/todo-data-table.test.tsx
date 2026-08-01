import { Todo } from "@/interfaces/todo";
import { render, screen } from "@testing-library/react";
import { TodoTable } from "../todo-data-table";
import { todoColumn } from "../todo-column";

const mockTodos = [
   {
      id: 1,
      title: 'Wake up at 6.am',
      completed: false
   }
] as Todo[]

const renderTable = (data = mockTodos) => {
   return render(
      <TodoTable
         columns={todoColumn}
         data={data} />
   )
}

describe('Todo section', () => {

   it('should render title and status perfectly', () => {
      renderTable()

      expect(screen.getAllByText(/wake up at 6.am/i)).toHaveLength(2)

      /**
       * For completed property
       * its render either pending for false and completed for true
       */
      expect(screen.getAllByText(/pending/i)).toHaveLength(2)

   })

   it('should render no result. with data props is empty', () => {
      renderTable([])

      expect(screen.getByText(/no results/i)).toBeInTheDocument()
   })
})