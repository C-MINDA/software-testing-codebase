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

    // 3. Add ONE of each item to the cart
    const addButtons = await driver.findElements(
      By.css(".product-card button"),
    );
    for (const btn of addButtons) {
      await btn.click();
      console.log('Clicked "Add to Cart"');
      await sleep(DELAY); // Wait to see the action
    }

    // 4. Verify Total before discount (100 + 5 + 30 = 135)
    // STUDENT: Implement the assertion logic below (Modified for multiple items)

    const totalElement = await driver.findElement(By.id("total-price"));

    await driver.wait(async () => {
      const text = await totalElement.getText();
      return text === "135";
    }, 5000);
    console.log("✅ Base Total Verified: 135");
    await sleep(DELAY);

    // 5. Test Invalid Discount Code
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
    console.log("✅ Invalid Discount Feedback Verified");
    await sleep(DELAY);

    // 6. Test Valid Discount Code
    await discountInput.clear();
    await discountInput.sendKeys("KUDOS10");
    await sleep(1000);
    await applyBtn.click();
    console.log("Applied Valid Discount");

    // 7. Verify New Total (135 * 0.9 = 121.5)
    await driver.wait(async () => {
      const text = await totalElement.getText();
      return text === "121.5";
    }, 5000);
    console.log("✅ Final Total Verified: 121.5");

    // ANSWER BEGIN

    // END OF ANSWER

    await sleep(2000); // Final pause to admire the work
  } catch (e) {
    if (e.message.includes("SessionNotCreatedError")) {
      console.error("\n⚠️  ChromeDriver Version Mismatch ⚠️");
      console.error(
        "Please update your ChromeDriver to match your Chrome browser version.",
      );
      console.error(
        "Try running: npm install chromedriver@latest --save-dev\n",
      );
    } else {
      console.error("❌ UI Test Failed", e);
    }
    process.exit(1); // Exit with error
  } finally {
    if (driver) {
      await driver.quit();
    }
  }
})();
