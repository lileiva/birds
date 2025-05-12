import { test, expect } from "@playwright/test";

test.describe("Home page", () => {
  test("should display birds list", async ({ page }) => {
    // Navigate to the home page
    await page.goto("/");

    await expect(page.locator("h1")).toHaveText("Birds");

    await expect(page.getByPlaceholder("Search for birds")).toBeVisible();

    const birdCards = page.getByTestId("bird-card-1-nothoprocta-perdicaria");
    await expect(birdCards).toBeVisible();

    const searchInput = page.getByPlaceholder("Search for birds");
    await searchInput.fill("chilean");

    await page.waitForTimeout(400);

    const visibleBirdNames = page.locator(
      'a[href^="/birds/"]:not(.opacity-0) h3'
    );
    for (const el of await visibleBirdNames.all()) {
      const text = await el.textContent();
      expect(text?.toLowerCase()).toContain("chilean");
    }
  });

  test("should go to bird page when clicking on a bird card", async ({
    page,
  }) => {
    await page.goto("/");

    const birdCards = page.getByTestId("bird-card-1-nothoprocta-perdicaria");
    await expect(birdCards).toBeVisible();

    await birdCards.click();

    await expect(page).toHaveURL("/birds/1-nothoprocta-perdicaria");

    await page.waitForResponse(
      (response) =>
        response.url().includes("/graphql") && response.status() === 200
    );

    await page.waitForTimeout(1000);

    await expect(
      page.getByRole("heading", { name: "Chileans Tinamou" })
    ).toBeVisible();
  });

  test("should go to the bird page then add a note", async ({ page }) => {
    await page.goto("/");

    const birdCards = page.getByTestId("bird-card-1-nothoprocta-perdicaria");
    await expect(birdCards).toBeVisible();

    await birdCards.click();

    await expect(page).toHaveURL("/birds/1-nothoprocta-perdicaria");

    const timestamp = Math.floor(Date.now() / 1000);

    await page.getByRole("button", { name: "Add Note" }).click();

    await page.waitForTimeout(2000);

    await page
      .getByRole("textbox", { name: "Where did you spot it?" })
      .fill(`This is a test location ${timestamp}`);

    await page
      .getByRole("textbox", { name: "Enter your notes here" })
      .fill(`This is a test note ${timestamp}`);

    await page.waitForSelector("button[type='submit']");

    await page.getByRole("button", { name: "Add Note" }).click();

    await page.waitForTimeout(1000);

    await expect(
      page.getByText(`This is a test location ${timestamp}`)
    ).toBeVisible();

    await expect(
      page.getByText(`This is a test note ${timestamp}`)
    ).toBeVisible();
  });
});
