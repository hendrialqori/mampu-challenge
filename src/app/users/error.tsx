'use client'

import { useEffect } from 'react'
import { AlertTriangleIcon } from "lucide-react"

import {
   Alert,
   AlertAction,
   AlertDescription,
   AlertTitle,
} from "@/components/ui/alert"
import { Button } from '@/components/ui/button'

export default function ErrorPage({
   error,
   unstable_retry,
}: {
   error: Error & { digest?: string }
   unstable_retry: () => void
}) {
   useEffect(() => {
      console.error(error)
   }, [error])

   return (
      <main className="w-full min-h-screen flex justify-center items-center py-5 border px-2">
         <Alert className="max-w-md border-red-200 bg-red-50 text-red-900">
            <AlertTriangleIcon />
            <AlertTitle>Table Error!</AlertTitle>
            <AlertDescription>
               We couldn&apos;t retrieve the data for this table. Please check your connection or try again.
            </AlertDescription>
            <AlertAction>
               <Button size="xs" variant="default" onClick={unstable_retry}>
                  Retry
               </Button>
            </AlertAction>
         </Alert>
      </main>
   )
}
