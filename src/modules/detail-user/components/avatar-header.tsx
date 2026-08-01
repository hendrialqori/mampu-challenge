import { Card, CardContent } from "@/components/ui/card";
import { User } from "@/interfaces/user";
import Image from "next/image";
import { BackButton } from "./back-button";

export function AvatarHeader({ data }: { data: User }) {
   return (
      <div className="flex justify-between items-center sticky top-0 bg-[#f7f7f7] z-2">
         <Card className="ring-0 bg-transparent">
            <CardContent className="border-0">
               <figure className="flex items-center gap-3">
                  <div className="size-13 md:size-17.5 bg-black rounded-full overflow-hidden">
                     <Image
                        src="/old-man.webp"
                        alt="avatar"
                        width={70}
                        height={70}
                        loading="eager"
                     />
                  </div>
                  <figcaption>
                     <h2 className="text-base md:text-lg font-bold">{data.name}</h2>
                     <p className="text-sm text-gray-500">{data.email}</p>
                  </figcaption>
               </figure>
            </CardContent>
         </Card>
         <BackButton />
      </div>
   )
}