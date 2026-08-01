import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Post } from "@/interfaces/post"

type Props = {
   data: Post[]
}

export const PostList = ({ data }: Props) => {

   if (!data.length) {
      return <p>No posts exists.</p>
   }

   return (
      <div className="space-y-2 overflow-auto">
         {data.map((post) => (
            <Card key={post.id}>
               <CardHeader>
                  <CardTitle>
                     <h2 className="font-semibold">{post.title}</h2>
                  </CardTitle>
               </CardHeader>
               <CardContent>
                  <p className="text-muted-foreground">{post.body}</p>
               </CardContent>
            </Card>
         ))}
      </div>
   )
}