"use client"

import type { ColumnDef } from "@tanstack/react-table"
import { MoreHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export interface Charge {
  id: string
  status: "WAITING_PAYMENT" | "PAID" | "CANCELED"
  customerEmail: string
  createdAt: string
  price: number
  productName: string
  brCode: string
}

export const columns: ColumnDef<Charge>[] = [
  {
    accessorKey: "productName",
    header: "Product Name",
    cell: ({ row }) => {
      const productName = row.getValue<string>("productName");
      return <div className="text-left font-bold">{productName}</div>
    }
  },
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    accessorKey: "price",
    header: () => <div className="text-left">Amount</div>,
    cell: ({ row }) => {
      const amount = row.getValue<number>("price") / 100;
      const formatted = new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
      }).format(amount)
      return <div className="text-left font-bold">{formatted}</div>
    },
  },
  {
    accessorKey: "customerEmail",
    header: "Email",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const payment = row.original

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button className="h-8 w-8 p-0" variant="ghost">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(payment.brCode)}
            >
              Copy Pix code
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>View customer</DropdownMenuItem>
            <DropdownMenuItem>View payment details</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]
