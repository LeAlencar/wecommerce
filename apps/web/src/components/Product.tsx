
import { useFragment } from "react-relay";
import Link from "next/link";
import { ProductFragment } from "../relay/ProductFragment";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import DeleteProduct from "./DeleteProduct";


export default function Product(props: { product: any }) {
  const product = useFragment(
    ProductFragment,
    props.product
  )

  return (
    <Card>
      <CardHeader>
        <CardTitle>{product.displayName}</CardTitle>
        <CardDescription>{product.name}</CardDescription>
      </CardHeader>
      <CardContent>
        <p>{product.description}</p>
      </CardContent>
      <CardFooter className="gap-5">
        <div className="flex flex-col justify-center">
          <p>R${product.price / 100}</p>
          <div className="flex flex-row">
            <Button className="mt-5 gap-10">
              <Link href={`/ ${product.id} / checkout`}>
                Checkout Link
              </Link>
            </Button>
          </div>
          <DeleteProduct />
        </div>
      </CardFooter>
    </Card>

  )
}