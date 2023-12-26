/* eslint-disable @typescript-eslint/no-confusing-void-expression */
/* eslint-disable @typescript-eslint/await-thenable */
'use client'
import { useRouter } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "./ui/dropdown-menu";

export default function Menu({ signOut }: { signOut: () => void }) {
  const router = useRouter()
  const signOutSubmit = async () => {
    await signOut();
    await router.push('/login')
  }
  return (
    <nav className="flex items-center justify-between flex-wrap bg-gray-800 p-6 fixed w-full z-10 top-0">
      <p className="text-white">Wecommerce Inc</p>
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