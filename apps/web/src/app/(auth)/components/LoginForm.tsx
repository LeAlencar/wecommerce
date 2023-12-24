"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import {
  Button,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
} from "@wecommerce/ui"
import { useMutation } from "react-relay"
import { useRouter } from "next/navigation"
import { UserLogin } from "../mutations/LoginMutation"
import type { LoginMutation } from "../mutations/__generated__/LoginMutation.graphql"


const formSchema = z.object({
  email: z.string().email({
    message: "Email is not valid.",
  }),
  password: z.string()
})



export function LoginForm(): JSX.Element {
  const router = useRouter()
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: ""
    },
  })

  const [login, isPending] = useMutation<LoginMutation>(UserLogin);

  function onSubmit(data: z.infer<typeof formSchema>) {
    login({
      variables: {
        input: {
          email: data.email,
          password: data.password
        },
      },
      onCompleted: ({ userLogin }) => {
        if (userLogin?.me) {
          router.push('/')
        }
      },
      onError(error) {
        console.log('deu ruim')
        console.log(error)
      },
    })
  }

  return (
    <Form {...form}>
      <form className="space-y-8" onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="shadcn" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input placeholder="*******" type="password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">
          {isPending ? <svg className="animate-spin h-5 w-5 mr-3 ..." viewBox="0 0 24 24" /> : <p>Submit</p>}
        </Button>
      </form>
    </Form>
  )
}



