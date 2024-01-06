"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { useMutation } from "react-relay"
import { useRouter } from "next/navigation"
import { UserLogin } from "../app/mutations/LoginMutation"
import type { LoginMutation } from "../app/mutations/__generated__/LoginMutation.graphql"
import { Input } from "./ui/input"
import { Button } from "./ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "./ui/form"


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
        if (userLogin?.me && userLogin.token) {
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



