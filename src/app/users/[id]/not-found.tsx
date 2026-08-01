import { Alert, AlertAction, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { BackButton } from "@/modules/detail-user/components/back-button";
import { CircleOff } from "lucide-react";

export default function NotFound() {
   return (
      <main className="mx-auto w-full lg:w-2/3 px-5 space-y-4 p-5">
         <div className="flex justify-between items-center sticky top-0 bg-[#f7f7f7] z-2">
            <BackButton />
         </div>
         <Alert className="max-w-md mx-auto">
            <CircleOff />
            <AlertTitle>Missing user</AlertTitle>
            <AlertDescription>
               User not found!
            </AlertDescription>
            <AlertAction>
               <BackButton />
            </AlertAction>
         </Alert>
      </main>
   )
}