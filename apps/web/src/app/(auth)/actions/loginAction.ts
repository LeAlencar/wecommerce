/* eslint-disable @typescript-eslint/await-thenable */
"use server";
import { cookies } from "next/headers";

export async function saveLoginCookie(token: string) {
  await cookies().set("userToken", token);
}
