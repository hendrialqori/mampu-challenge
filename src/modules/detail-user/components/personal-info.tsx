import {
   Card,
   CardContent,
   CardHeader,
} from "@/components/ui/card"
import { Field, FieldDescription, FieldGroup, FieldLabel, FieldSet } from "@/components/ui/field"
import { User } from "@/interfaces/user"

export function PersonalInfo({ data }: { data: User }) {
   return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1">
         <Card>
            <CardHeader>Personal info</CardHeader>
            <CardContent>
               <FieldSet>
                  <FieldGroup>
                     <div className="grid grid-cols-2 gap-3">
                        <Field>
                           <FieldLabel>Name</FieldLabel>
                           <FieldDescription>{data.name}</FieldDescription>
                        </Field>
                        <Field>
                           <FieldLabel>Username</FieldLabel>
                           <FieldDescription>{data.username}</FieldDescription>
                        </Field>
                        <Field>
                           <FieldLabel>Email</FieldLabel>
                           <FieldDescription>{data.email}</FieldDescription>
                        </Field>
                        <Field>
                           <FieldLabel>Phone</FieldLabel>
                           <FieldDescription>{data.phone}</FieldDescription>
                        </Field>
                        <Field>
                           <FieldLabel>Website</FieldLabel>
                           <FieldDescription>{data.website}</FieldDescription>
                        </Field>
                     </div>
                  </FieldGroup>
               </FieldSet>
            </CardContent>
         </Card>
         <Card>
            <CardHeader>Company</CardHeader>
            <CardContent>
               <FieldSet>
                  <FieldGroup>
                     <div className="grid grid-cols-2 gap-2">
                        <Field>
                           <FieldLabel>Name</FieldLabel>
                           <FieldDescription>{data.company.name}</FieldDescription>
                        </Field>
                        <Field>
                           <FieldLabel>Catch phrase</FieldLabel>
                           <FieldDescription>{data.company.catchPhrase}</FieldDescription>
                        </Field>
                     </div>
                  </FieldGroup>
               </FieldSet>
            </CardContent>
         </Card>
         <Card>
            <CardHeader>Address</CardHeader>
            <CardContent>
               <FieldSet>
                  <FieldGroup>
                     <div className="grid grid-cols-2 gap-2">
                        <Field>
                           <FieldLabel>Street</FieldLabel>
                           <FieldDescription>{data.address.street}</FieldDescription>
                        </Field>
                        <Field>
                           <FieldLabel>Suite</FieldLabel>
                           <FieldDescription>{data.address.suite}</FieldDescription>
                        </Field>
                        <Field>
                           <FieldLabel>City</FieldLabel>
                           <FieldDescription>{data.address.city}</FieldDescription>
                        </Field>
                        <Field>
                           <FieldLabel>Zipcode</FieldLabel>
                           <FieldDescription>{data.address.zipcode}</FieldDescription>
                        </Field>
                     </div>
                  </FieldGroup>
               </FieldSet>
            </CardContent>
         </Card>
      </div>
   )
}