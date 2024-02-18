//@ts-nocheck
'use client'
import * as React from "react"
import Link from "next/link"
import { Home, Package2Icon, PackageSearch, Settings, ShoppingCart, UsersRound } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"


export function DrawerDialogDemo() {
  const [open, setOpen] = React.useState(true)




  return (
    <Drawer direction="left" dismissible={false} onOpenChange={setOpen} open={open} >
      <DrawerTrigger asChild>
        <Package2Icon className="h-6 w-6" />
      </DrawerTrigger>
      <DrawerContent className="max-w-sm">
        <DrawerHeader className="text-left">
          <DrawerTitle>Wecommerce</DrawerTitle>
        </DrawerHeader>
        <div className="flex-1 overflow-auto">
          <nav className="grid items-start px-4 text-sm font-medium">
            <Link
              className="flex items-center gap-3 rounded-lg px-3 py-2 bg-gray-100 text-gray-900   transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
              href="#"
            >
              <Home className="h-4 w-4" />
              Home
            </Link>
            <Link
              className="flex items-center gap-3 rounded-lg  px-3 py-2 text-gray-500  transition-all hover:text-gray-900 dark:bg-gray-800 dark:text-gray-50 dark:hover:text-gray-50"
              href="#"
            >
              <PackageSearch className="h-4 w-4" />
              Products - Coming soon
            </Link>
            <Link
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
              href="#"
            >
              <ShoppingCart className="h-4 w-4" />
              Orders - Coming soon
            </Link>
            <Link
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
              href="#"
            >
              <UsersRound className="h-4 w-4" />
              Customers - Coming soon
            </Link>
            <Link
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
              href="#"
            >
              <Settings className="h-4 w-4" />
              Settings
            </Link>
          </nav>
        </div>
        <DrawerFooter className="pt-2">
          <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}


