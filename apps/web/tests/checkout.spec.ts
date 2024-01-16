import { test, expect } from "@playwright/test";

test("should display the login form", async ({ page }) => {
  await page.goto(
    "http://localhost:3000/UHJvZHVjdDo2NWEzMDM3OTk4OTMwY2FkYTcyYTc1YWY=/checkout"
  );

  const emailInput = await page.waitForSelector('input[name="email"]');
  expect(emailInput).toBeTruthy();

  const nameInput = await page.waitForSelector('input[name="name"]');
  expect(nameInput).toBeTruthy();

  const passwordInput = await page.waitForSelector('input[name="cpf"]');
  expect(passwordInput).toBeTruthy();

  const loginButton = await page.waitForSelector('button[type="submit"]');
  expect(loginButton).toBeTruthy();
});

test("should be able to fill checkout form", async ({ page }) => {
  await page.goto(
    "http://localhost:3000/UHJvZHVjdDo2NWEzMDM3OTk4OTMwY2FkYTcyYTc1YWY=/checkout"
  );
  await page.fill('input[name="email"]', "user@example.com");
  await page.fill('input[name="cpf"]', "21248213805");
  await page.fill('input[name="name"]', "username");
  await page.click('button[type="submit"]');
});

test("should render the product card", async ({ page }) => {
  await page.goto(
    "http://localhost:3000/UHJvZHVjdDo2NWEzMDM3OTk4OTMwY2FkYTcyYTc1YWY=/checkout"
  );
  const productTitle = page.getByText("produto novo");
  expect(productTitle).toBeTruthy();
});
