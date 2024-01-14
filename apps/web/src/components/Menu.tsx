

'use client'
import { useRouter } from "next/navigation";
import { useMutation } from "react-relay";
import { UserLogout } from "../app/mutations/LogoutMutation";
import type { LogoutMutation } from "../app/mutations/__generated__/LogoutMutation.graphql";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { CreateProductDialog } from "./CreateProduct";

export default function Menu() {
  const router = useRouter()
  const [logout] = useMutation<LogoutMutation>(UserLogout);
  const signOutSubmit = () => {
    logout({
      variables: {
        input: {}
      },
      onCompleted({ userLogout }) {
        if (userLogout?.success) {
          router.push('/login')
        }
      },
      onError(error) {
        console.log(error)
      },
    })
  }
  return (
    <nav className="flex items-center justify-between flex-wrap bg-emerald-300 p-6 fixed w-full z-10 top-0">
      <p className="text-white">Wecommerce Inc</p>
      <CreateProductDialog />
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Avatar>
            <AvatarImage className="rounded-full" src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem disabled>Profile</DropdownMenuItem>
          <DropdownMenuItem className="text-destructive" onClick={signOutSubmit}>
            Sign Out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu >

    </nav>
  )
}