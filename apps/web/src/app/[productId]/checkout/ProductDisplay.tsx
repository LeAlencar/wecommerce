import Image from "next/image"
import { Label } from "@radix-ui/react-dropdown-menu"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

interface ProductDisplayProps {
  product: {
    displayName: string
    description: string
    price: number
  }
}
export default function ProductDisplay({ product }: ProductDisplayProps) {
  const formattedPrice = (product.price / 100).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
  return (
    <Card className="w-full max-w-sm p-6">
      <CardHeader>
        <CardTitle className="mt-5">{product.displayName}</CardTitle>
        <CardDescription>{product.description}</CardDescription>
      </CardHeader>
      <CardContent className="relative w-full h-[300px]">

        <Image alt="sunglasses image" fill src="https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8cHJvZHVjdHxlbnwwfHwwfHx8MA%3D%3D" />

      </CardContent>
      <CardFooter className="flex flex-col gap-4">
        <Label className="mt-5 xl:mt-10 font-extrabold text-3xl text-emerald-300">{formattedPrice}</Label>
      </CardFooter>
    </Card>
  )
}