

'use client'
import { graphql, useLazyLoadQuery } from "react-relay";
import { useEffect, useState } from "react";
import Menu from "../components/Menu";
import Product from "../components/Product";
import { logOut } from "./(auth)/actions/logoutAction";
import type { pageQuery, pageQuery$data } from "./__generated__/pageQuery.graphql";

export default function Page(): JSX.Element {
  const response = useLazyLoadQuery<pageQuery>(
    graphql`
      query pageQuery {
        products(first: 100)
          @connection(key: "ProductList_products") {
          edges {
            cursor
            node {
              ...Product_product
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
      <Menu signOut={logOut} />
      <div className="mt-28 flex flex-col sm:flex-row justify-center gap-4">
        {products?.products.edges?.map((edge) => {
          if (!edge) return null
          return (
            <Product key={edge.cursor} product={edge.node} />
          )
        })}
      </div>
    </>
  );
}
