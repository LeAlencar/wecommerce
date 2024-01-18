'use client'
import { graphql, useLazyLoadQuery } from "react-relay";
import type { pageChargesQuery } from "@/app/charges/__generated__/pageChargesQuery.graphql.ts";
import Menu from "@/components/Menu";
import { DataTable } from "./data-table";
import { columns } from "./columns";

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
      status: 'WAITING_PAYMENT',
      customerEmail: edge.node.customerEmail,
      price: edge.node.product.price,
      brCode: edge.node.brCode,
      productName: edge.node.product.name,
    }
  })


  return (
    <>
      <Menu />
      <div className="container mx-auto py-10 mt-28">
        <h1 className="font-extrabold text-3xl">All Charges</h1>
        { /* @ts-ignore */}
        {chargesData ? <DataTable columns={columns} data={chargesData} /> : null}
      </div>
    </>
  )
}