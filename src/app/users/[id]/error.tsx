'use client'

import { AlertTriangleIcon } from "lucide-react"

import {
   Alert,
   AlertAction,
   AlertDescription,
   AlertTitle,
} from "@/components/ui/alert"
import { BackButton } from '@/modules/detail-user/components/back-button'

export default function ErrorPage({
   error
}: {
   error: Error & { digest?: string }
}) {

   const fallbackError = "We couldn't load the data. Please check your connection or try again."

   return (
      <main className="w-full min-h-screen flex justify-center items-center py-5 border px-2">
         <Alert className="max-w-md border-red-200 bg-red-50 text-red-900">
            <AlertTriangleIcon />
            <AlertTitle>Detail Error!</AlertTitle>
            <AlertDescription>
               {error.message ?? fallbackError}
            </AlertDescription>
            <AlertAction>
               <BackButton />
            </AlertAction>
         </Alert>
      </main>
   )
}