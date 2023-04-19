import { test, expect } from '@playwright/test'

test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3000/login')
    await page.fill("input[name='email']", "adamadmin@blog.ch")
    await page.fill("input[name='password']", "admin1234")
    await page.locator("button").click()
    await page.waitForNavigation()
    await expect(page).toHaveURL('http://localhost:3000/')
})

test("can create post", async ({ page }) => {
    await page.goto('http://localhost:3000/posts/create')
    await page.fill("input[name='title']", "new post")
    await page.fill("textarea", "new post body")
    await page.click("button")
    await expect(await page.locator("ul li:first-child h2")).toContainText("new post")
})

test("can edit post", async ({ page }) => {
    await page.goto('http://localhost:3000/posts/2/edit')
    await page.fill("input[name='title']", "")
    await page.fill("input[name='title']", "edited text")
    await page.click("button")
    await page.goto("http://localhost:3000/posts/2")
    await expect(await page.locator("h1.blog-title")).toContainText("edited text")
})