
import { useFragment } from "react-relay";
import Link from "next/link";
import { ExternalLink } from "lucide-react";
import { ProductFragment } from "../relay/ProductFragment";
import type { ProductFragment_product$key } from "../relay/__generated__/ProductFragment_product.graphql";
import { Card, CardContent, CardDescription, CardFooter, CardHeader } from "./ui/card";
import { Button } from "./ui/button";
import DeleteProductAlert from "./DeleteProduct";


export default function Product(props: { product: ProductFragment_product$key }) {
  const product = useFragment<ProductFragment_product$key>(
    ProductFragment,
    props.product
  )

  return (
    <Card className="flex flex-col bg-white rounded-lg shadow-md dark:bg-gray-800">
      <CardHeader>
        <h1 className="font-extrabold text-2xl">{product.displayName}</h1>
      </CardHeader>
      <CardContent className="p-4 flex-1 flex flex-col justify-between">
        <p>R${product.price / 100}</p>
      </CardContent>
      <CardDescription className="p-4 flex-1 flex flex-col justify-between">
        <h3>{product.description}</h3>
      </CardDescription>
      <CardFooter>
        <div className="flex flex-col justify-between w-full">
          <Button className="mt-5">
            <Link className="flex flex-row gap-3 text-center items-center" href={`/${product.id}/checkout`} target="_blank">
              Checkout Link
              <ExternalLink />
            </Link>
          </Button>
          <DeleteProductAlert productId={product.id} />
        </div>
      </CardFooter>
    </Card>
  )
}