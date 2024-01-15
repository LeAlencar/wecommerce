import { test, expect } from "@playwright/test";

test("should display the register form", async ({ page }) => {
  await page.goto("http://localhost:3000/register");

  const emailInput = await page.waitForSelector('input[name="email"]');
  expect(emailInput).toBeTruthy();

  const userNameInput = await page.waitForSelector('input[name="username"]');
  expect(userNameInput).toBeTruthy();

  const passwordInput = await page.waitForSelector('input[name="password"]');
  expect(passwordInput).toBeTruthy();

  const loginButton = await page.waitForSelector('button[type="submit"]');
  expect(loginButton).toBeTruthy();
});

test("should be able to fill login form", async ({ page }) => {
  await page.goto("http://localhost:3000/register");
  await page.fill('input[name="email"]', "user@example.com");
  await page.fill('input[name="username"]', "user123");
  await page.fill('input[name="password"]', "password");
  await page.click('button[type="submit"]');
});
