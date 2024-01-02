import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ConnectionHandler, useMutation } from "react-relay";
import { ROOT_ID } from "relay-runtime";
import { toast } from "sonner";
import { AddProduct } from "../app/mutations/AddProductMutation";
import type { AddProductMutation } from "../app/mutations/__generated__/AddProductMutation.graphql";
import { Button } from "./ui/button";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Input } from "./ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "./ui/form";

const formSchema = z.object({
  name: z.string().min(5, {
    message: "Product Name must be at least 5 characters.",
  }),
  displayName: z.string().min(5, {
    message: "DisplayName must be at least 5 characters"
  }),
  description: z.string().min(5, {
    message: 'Description must give more info'
  }),
  price: z.coerce.number().min(100, {
    message: 'price must be at least 100(1,00) in cents'
  })
})


export function CreateProductDialog() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      displayName: "",
      description: "",
      price: 100
    },
  })

  const [create] = useMutation<AddProductMutation>(AddProduct);

  const connectionID = ConnectionHandler.getConnectionID(
    ROOT_ID,
    'ProductList_products'
  )


  function onSubmit(data: z.infer<typeof formSchema>) {
    create({
      variables: {
        input: {
          description: data.description,
          displayName: data.displayName,
          name: data.name,
          price: data.price,
        },
        connections: [connectionID]
      },
      onCompleted({ ProductAddMutation }) {
        if (ProductAddMutation?.productEdge?.node) {
          toast("Product added with success.")
        }
      },
    })
  }
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Create a new product</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Create Product</DialogTitle>
          <DialogDescription>
            Create a new product and checkout link for it.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <Form {...form}>
            <form className="space-y-8" onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Product Name</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="displayName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Product Display Name</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Product Description</FormLabel>
                    <FormControl>
                      <Input  {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Product Price</FormLabel>
                    <FormControl>
                      <Input type="number"  {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <DialogFooter>
                <DialogClose>
                  <Button type="submit">Save changes</Button>
                </DialogClose>
              </DialogFooter>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  )
}
