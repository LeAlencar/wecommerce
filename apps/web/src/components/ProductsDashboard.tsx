'use client'
import { useState, useEffect } from "react"
import { useLazyLoadQuery } from "react-relay"
import { graphql } from "relay-runtime"
import type { pageQuery, pageQuery$data } from "@/app/__generated__/pageQuery.graphql"
import Product from "./Product"
import { CreateProductDialog } from "./CreateProduct"

export default function ProductsDashboard() {
  const response = useLazyLoadQuery<pageQuery>(
    graphql`
      query ProductsDashboardQuery {
        products(first: 100)
          @connection(key: "ProductList_products") {
          edges {
            cursor
            node {
              ...ProductFragment_product
            }
          }
        }
      }
    `,
    {},
    { fetchPolicy: 'network-only' }
  )

  const [products, setProducts] = useState<pageQuery$data>()

  useEffect(() => {
    setProducts(response)
  }, [response])
  return (
    <>
      <div className="flex text-right justify-end">
        <CreateProductDialog />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-4 py-6">
        {products?.products.edges?.map((edge) => {
          if (!edge?.node) return null
          return (
            <Product key={edge.cursor} product={edge.node} />
          )
        })}
      </div>
    </>
  )
}