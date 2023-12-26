/* eslint-disable @typescript-eslint/await-thenable */
"use server";

import { cookies } from "next/headers";

export async function logOut() {
  await cookies().delete("userToken");
}
