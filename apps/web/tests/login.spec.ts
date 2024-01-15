import { test, expect } from "@playwright/test";

test("should display the login form", async ({ page }) => {
  await page.goto("http://localhost:3000/login");

  const emailInput = await page.waitForSelector('input[name="email"]');
  expect(emailInput).toBeTruthy();

  const passwordInput = await page.waitForSelector('input[name="password"]');
  expect(passwordInput).toBeTruthy();

  const loginButton = await page.waitForSelector('button[type="submit"]');
  expect(loginButton).toBeTruthy();
});

test("should be able to fill login form", async ({ page }) => {
  await page.goto("http://localhost:3000/login");
  await page.fill('input[name="email"]', "user@example.com");
  await page.fill('input[name="password"]', "password");
  await page.click('button[type="submit"]');
});
