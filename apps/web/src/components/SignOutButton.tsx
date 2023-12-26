'use server'

import Link from "next/link"
import { cookies } from "next/headers"
import { DropdownMenuItem } from "./ui/dropdown-menu"

export default function SignOutButton() {
  function signOut() {
    cookies().delete('userToken')
  }
  return (
    <DropdownMenuItem className="text-destructive" onClick={signOut}>
      <Link className="text-destructive" href='/login'>Sign out</Link>
    </DropdownMenuItem>
  )



}