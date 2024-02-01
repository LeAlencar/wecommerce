'use client'
import { ConnectionHandler, useMutation } from "react-relay";
import { ROOT_ID } from "relay-runtime";
import { toast } from "sonner";
import { DeleteProduct } from '../app/mutations/DeleteProductMutation'
import type { DeleteProductMutation } from "../app/mutations/__generated__/DeleteProductMutation.graphql";
import { AlertDialogHeader, AlertDialogTrigger, AlertDialogAction, AlertDialogTitle, AlertDialog, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, } from "./ui/alert-dialog";

export default function DeleteProductAlert({ productId }: { productId: string }) {
  const [deleteProduct] = useMutation<DeleteProductMutation>(DeleteProduct)
  const connectionID = ConnectionHandler.getConnectionID(
    ROOT_ID,
    'ProductList_products'
  )

  const handleDelete = () => {
    deleteProduct({
      variables: {
        connections: [connectionID],
        input: {
          id: productId
        }
      },
      onCompleted(response) {
        if (response.ProductDeleteMutation?.success) {
          toast('Product deleted with success')
          return
        }

        if (response.ProductDeleteMutation?.error) {
          toast(response.ProductDeleteMutation.error)
        }
      },
    })
  }
  return (
    <div className="mt-5">
      <AlertDialog>
        <AlertDialogTrigger className="bg-destructive rounded-md px-3 py-2 text-white w-full">
          Delete
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your product.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction className="bg-destructive" onClick={handleDelete}>Continue</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}