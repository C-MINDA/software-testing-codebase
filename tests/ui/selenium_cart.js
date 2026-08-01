const { Builder, By, until } = require("selenium-webdriver");
require("chromedriver");
const assert = require("assert");

(async function example() {
  // UI TEST: End-to-End User Interface testing
  let driver = await new Builder().forBrowser("chrome").build();
  try {
    // Helper to slow down execution for visual debugging
    const sleep = (ms) => driver.sleep(ms);
    const DELAY = 1500; // 1.5 second delay between actions

    console.log("--- Starting UI Test ---");

    // 1. Open the App
    await driver.get("http://127.0.0.1:8080");
    await sleep(DELAY);

    // 2. Wait for products to load
    await driver.wait(
      until.elementLocated(By.css(".product-card button")),
      5000,
    );

    // 3. Add the first TWO items to the cart
    const addButtons = await driver.findElements(
      By.css(".product-card button"),
    );
    for (const btn of addButtons.slice(0, 2)) {
      await btn.click();
      console.log('Clicked "Add to Cart"');
      await sleep(DELAY); // Wait to see the action
    }

    // 4. Verify Total before removing an item (100 + 5 = 105)
    // STUDENT: Implement the assertion logic below (Modified for multiple items)

    const totalElement = await driver.findElement(By.id("total-price"));

    await driver.wait(async () => {
      const text = await totalElement.getText();
      return text === "105";
    }, 5000);
    assert.strictEqual(await totalElement.getText(), "105");
    console.log("Base Total Verified: 105");
    await sleep(DELAY);

    // 5. Remove the first item and verify the updated total
    const firstRemoveButton = await driver.wait(
      until.elementLocated(By.css("#cart-items li button")),
      5000,
    );
    await firstRemoveButton.click();
    console.log("Clicked X");

    await driver.wait(async () => {
      const text = await totalElement.getText();
      return text === "5";
    }, 5000);
    const totalAfterRemoval = await totalElement.getText();
    assert.strictEqual(totalAfterRemoval, "5");
    console.log("Final Total Verified: 5");
    await sleep(DELAY);

    // 6. Test Invalid Discount Code
    const discountInput = await driver.findElement(By.id("discount-code"));
    const applyBtn = await driver.findElement(
      By.css(".discount-section button"),
    );
    const msg = await driver.findElement(By.id("discount-message"));

    await discountInput.sendKeys("INVALID");
    await sleep(1000);
    await applyBtn.click();
    console.log("Tried Invalid Discount");

    await driver.wait(
      until.elementTextContains(msg, "Invalid Discount Code"),
      2000,
    );
    console.log("Invalid Discount Feedback Verified");
    await sleep(DELAY);

    // 7. Test Valid Discount Code
    await discountInput.clear();
    await discountInput.sendKeys("KUDOS10");
    await sleep(1000);
    await applyBtn.click();
    console.log("Applied Valid Discount");

    // 8. Verify Discounted Total (5 * 0.9 = 4.5)
    await driver.wait(async () => {
      const text = await totalElement.getText();
      return text === "4.5";
    }, 5000);
    assert.strictEqual(await totalElement.getText(), "4.5");
    console.log("Discounted Total Verified: 4.5");

    await sleep(2000);
  } catch (e) {
    if (e.message.includes("SessionNotCreatedError")) {
      console.error("\n ChromeDriver Version Mismatch");
      console.error(
        "Please update your ChromeDriver to match your Chrome browser version.",
      );
      console.error(
        "Try running: npm install chromedriver@latest --save-dev\n",
      );
    } else {
      console.error("UI Test Failed", e);
    }
    process.exit(1); // Exit with error
  } finally {
    if (driver) {
      await driver.quit();
    }
  }
})();
