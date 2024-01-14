'use client'
import { graphql, useFragment, useLazyLoadQuery } from "react-relay"
import QRCode from "react-qr-code";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@components/ui/card";
import { ProductFragment } from "@/relay/ProductFragment";
import { Label } from "@components/ui/label";
import { Button } from "@components/ui/button";
import type { ProductFragment_product$key } from "@/relay/__generated__/ProductFragment_product.graphql";
import type { CheckoutQuery as CheckoutQueryType } from "./__generated__/CheckoutQuery.graphql";

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
  const response = useLazyLoadQuery<CheckoutQueryType>(CheckoutQuery, {
    productId: decodeURIComponent(params.productId)
  })

  const product = useFragment<ProductFragment_product$key>(
    ProductFragment,
    response.node as ProductFragment_product$key
  )

  const formattedPrice = (product.price / 100).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
  return (
    <>
      <nav className="flex items-center justify-center flex-wrap bg-gray-800 p-6 fixed w-full top-0">
        <p className="text-white">Wecommerce Inc.</p>
      </nav>
      <div className="flex justify-center mt-28">
        <Card className="w-96 h-auto text-center">
          <CardHeader>
            <CardTitle>{product.displayName}</CardTitle>
            <CardDescription>{product.description}</CardDescription>
          </CardHeader>
          <CardContent className="flex justify-center items-center">
            <QRCode
              size={256}
              value="https://google.com"
              viewBox="0 0 256 256"
            />
          </CardContent>
          <CardFooter className="flex flex-col gap-4">
            <Label className="font-extrabold text-lg text-emerald-300">{formattedPrice}</Label>
            <Button>Copy QrCode</Button>
          </CardFooter>
        </Card>
      </div>
    </>
  )
}