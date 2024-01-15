"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { useMutation } from "react-relay"
import { useRouter } from "next/navigation"
import { RegisterUser } from "../app/mutations/RegisterMutation"
import type { RegisterMutation } from "../app/mutations/__generated__/RegisterMutation.graphql"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "./ui/form"
import { Button } from "./ui/button"
import { Input } from "./ui/input"

const formSchema = z.object({
  username: z.string().min(5, {
    message: "Username must be at least 5 characters.",
  }),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters"
  }),
  email: z.string().email({
    message: 'Email must be valid'
  }),
  pixKey: z.string()
})

export function RegisterForm(): JSX.Element {
  const router = useRouter()
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
      email: "",
      pixKey: ""
    },
  })

  const [register, isPending] = useMutation<RegisterMutation>(RegisterUser);

  function onSubmit(data: z.infer<typeof formSchema>) {
    register({
      variables: {
        input: {
          ...data
        }
      },
      onCompleted({ userCreate }) {
        if (userCreate?.user) {
          router.push('/');
        }
        console.log(userCreate?.error)
      },
      onError(error) {
        console.log(error)
      },
    })
  }

  return (
    <Form {...form}>
      <form className="space-y-8" onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="shadcn" {...field} />
              </FormControl>
              <FormDescription>
                This is your public display name.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="example@example.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="pixKey"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Chave PIX</FormLabel>
              <FormControl>
                <Input {...field} />
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
          {isPending ? <svg className="animate-spin h-5 w-5 mr-3 ..." viewBox="0 0 24 24" /> : <p>Register</p>}
        </Button>
      </form>
    </Form>
  )
}



