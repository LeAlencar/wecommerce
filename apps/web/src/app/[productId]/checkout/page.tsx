'use client'
import { graphql, useFragment, useLazyLoadQuery } from "react-relay"
import { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { isCPF, formatToCPF } from 'brazilian-values';
import type { ProductFragment_product$key } from "@/relay/__generated__/ProductFragment_product.graphql";
import { ProductFragment } from "@/relay/ProductFragment";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import QrCodeCard from "./QrCodeCard";
import ProductDisplay from "./ProductDisplay";
import type { CheckoutQuery as CheckoutQueryType } from "./__generated__/CheckoutQuery.graphql";

const formSchema = z.object({
  email: z.string().email({
    message: "Email is not valid.",
  }),
  cpf: z.custom((val) => {
    return isCPF(val as string)
  }, {
    message: 'CPF não é válido.'
  }),
  name: z.string().min(5, {
    message: "Name must be at least 5 characters long.",
  }),
})


const CheckoutQuery = graphql`
  query pageCheckoutQuery($productId: ID!) {
    node(id: $productId) {
      __typename
      ... on Product {
        ...ProductFragment_product
      }
    }
  }
`;

export default function CheckoutPage({ params }: { params: { productId: string } }) {
  const [paymentIntent, setPaymentIntent] = useState(false)
  const response = useLazyLoadQuery<CheckoutQueryType>(CheckoutQuery, {
    productId: decodeURIComponent(params.productId)
  })

  const product = useFragment<ProductFragment_product$key>(
    ProductFragment,
    response.node as ProductFragment_product$key
  )

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      cpf: "",
      name: "",
    },
  })
  function onSubmit(data: z.infer<typeof formSchema>) {
    setPaymentIntent(data)
    console.log(data)
  }
  return (
    <>
      <nav className="flex items-center justify-center flex-wrap bg-emerald-300 p-6 fixed w-full top-0">
        <p className="text-white">Wecommerce Inc.</p>
      </nav>
      <div className="flex justify-center h-screen gap-4 bg-slate-100">
        <div className="w-1/2 flex justify-center items-center flex-col">
          {
            paymentIntent ? (
              <QrCodeCard brCode="https://google.com" />
            ) : (
              <>
                <h1 className="font-extrabold text-lg mb-5">Digite seus dados para gerar o seu QrCode</h1>
                <Form {...form}>
                  <form className="space-y-8 w-96" onSubmit={form.handleSubmit(onSubmit)}>
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
                      name="cpf"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>CPF</FormLabel>
                          <FormControl>
                            <Input type="text" {...field} maxLength={14} value={formatToCPF(field.value)} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Name</FormLabel>
                          <FormControl>
                            <Input type="text" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button className="w-96 bg-emerald-300" type="submit">
                      Generate your QrCode
                    </Button>
                  </form>
                </Form>
              </>
            )
          }

        </div>
        <div className="w-1/2 flex justify-center items-center">
          <ProductDisplay product={product} />
        </div>
      </div>
    </>
  )
}