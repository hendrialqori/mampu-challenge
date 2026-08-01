import { createParser, parseAsIndex, parseAsInteger, parseAsString, parseAsStringLiteral, useQueryState, useQueryStates } from "nuqs"

export const useQueryStringTable = () => {
   const parseAsSort = createParser({
      parse: (query) => {
         const [key = '', direction = ''] = query.split(':')
         const desc = parseAsStringLiteral(['asc', 'desc']).parse(direction) ?? 'asc'
         return [{
            id: key,
            desc: desc === 'desc'
         }]
      },
      serialize: ([value]) => {
         if (!value?.id) return null as unknown as string

         return `${value?.id}:${value?.desc ? 'desc' : 'asc'}`
      }
   })

   // pagination state handler
   const [pagination, setPagination] = useQueryStates({
      pageIndex: parseAsIndex.withDefault(0),
      pageSize: parseAsInteger.withDefault(5)
   }, {
      urlKeys: {
         pageIndex: 'page',
         pageSize: 'size'
      },
   });
   // search/global filter state handler
   const [globalFilter, setGlobalFilter] =
      useQueryState('search', parseAsString.withDefault(''))
   // sorting state handler
   const [sorting, setSorting] =
      useQueryState('sort', parseAsSort.withDefault([]))


   return {
      pagination,
      globalFilter,
      sorting,
      setPagination,
      setGlobalFilter,
      setSorting
   }
}