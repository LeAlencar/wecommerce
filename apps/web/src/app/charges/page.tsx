'use client'
import { graphql, useLazyLoadQuery } from "react-relay";
import { Suspense } from "react";
import Link from "next/link";
import { Home, Package2Icon, PackageSearch, Settings, ShoppingCart, UsersRound } from "lucide-react";
import DashboardSkeleton from "@/components/DashboardSkeleton";
import { MenuDrawer } from "@/components/MenuDrawer";
import { DataTable } from "./data-table";
import { columns } from "./columns";
import type { pageChargesQuery } from "./__generated__/pageChargesQuery.graphql";

export default function ChargesPage() {
  const response = useLazyLoadQuery<pageChargesQuery>(
    graphql`
          query pageChargesQuery {
              charges(first: 100)
              @connection(key: "ChargeList_charges") {
                  edges {
                      node {
                          brCode
                          customerEmail
                          status
                          product {
                              name
                              price
                          }
                      }
                  }
              }
          }
      `,
    {},
    { fetchPolicy: 'network-only' }
  )


  const chargesData = response.charges.edges?.map((edge) => {
    if (!edge?.node) return
    return {
      status: edge.node.status,
      customerEmail: edge.node.customerEmail,
      price: edge.node.product.price,
      brCode: edge.node.brCode,
      productName: edge.node.product.name,
    }
  })

  return (

    <div className="grid min-h-screen overflow-hidden w-full lg:grid-cols-[280px_1fr]">
      <div className="hidden border-r bg-gray-100/40 lg:block dark:bg-gray-800/40">
        <div className="flex flex-col gap-2">
          <div className="flex h-[60px] items-center px-6">
            <Link className="flex items-center gap-2 font-semibold" href="#">
              <Package2Icon className="h-6 w-6" />
              <span className="">Wecommerce Inc</span>
            </Link>
          </div>
          <div className="flex-1 overflow-auto">
            <nav className="grid items-start px-4 text-sm font-medium">
              <Link
                className="flex items-center gap-3 rounded-lg  px-3 py-2 text-gray-500  transition-all hover:text-gray-900 dark:bg-gray-800 dark:text-gray-50 dark:hover:text-gray-50"
                href="/"
              >
                <Home className="h-4 w-4" />
                Home
              </Link>
              <Link
                className="flex items-center gap-3 rounded-lg px-3 py-2 bg-gray-100 text-gray-900   transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
                href="/charges"
              >
                <ShoppingCart className="h-4 w-4" />
                Orders
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
        </div>
      </div>
      <div className="flex flex-col overflow-x-auto">
        <header className="flex h-14 lg:h-[60px] items-center gap-4 border-b bg-gray-100/40 px-6 dark:bg-gray-800/40">
          <Link className="lg:hidden" href="#">
            <MenuDrawer />
          </Link>
          <div className="flex-1">
            <h1 className="font-semibold text-lg">Charges</h1>
          </div>
          <div className="flex flex-1 items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
            {/* <form className="ml-auto flex-1 sm:flex-initial">
              <div className="relative">
                <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400" />
                <Input
                  className="pl-8 sm:w-[300px] md:w-[200px] lg:w-[300px] bg-white"
                  placeholder="Search orders..."
                  type="search"
                />
              </div>
            </form> */}
          </div>
        </header>
        <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6 overflow-auto">
          <div className="p-2 overflow-auto">
            <Suspense fallback={<DashboardSkeleton />}>
              <h1 className="font-extrabold text-3xl">All Charges</h1>
              <div className="overflow-x-auto">
                <DataTable columns={columns} data={chargesData ?? []} />
              </div>
            </Suspense>
          </div>
        </main>
      </div>
    </div>
  )
}