'use client'
import { Button } from "@wecommerce/ui";
import { graphql, useLazyLoadQuery } from "react-relay";
import { useRouter } from "next/navigation";
import type { pageQuery } from "./__generated__/pageQuery.graphql";

export default function Page(): JSX.Element {
  const data = useLazyLoadQuery<pageQuery>(
    graphql`
      query pageQuery {
        version
      }
    `,
    {}
  );

  const router = useRouter()
  router.push('/login')

  return (
    <div className='mt-5 flex justify-center'>
      <Button variant='destructive'>Teste</Button>
      <h1>{data.version}</h1>
    </div>
  );
}
