const { Given, When, Then } = require("@cucumber/cucumber");
const assert = require("assert");
const { calculateTotal } = require("../../../public/js/cartLogic");

let userBalance = 0;
let cart = [];

// BDD TEST: Testing business behavior using Gherkin syntax
Given("user has {int} points", function (points) {
  userBalance = points;
});

When('they add "Hoodie" to the cart', function () {
  // Simulating adding a Hoodie which costs 100 points
  cart.push({ name: "Hoodie", price: 100 });
});

// STUDENT: Implement the "Then" step below
// requirements:
// 1. Calculate the total of the cart
// 2. Calculate remaining balance (userBalance - total)
// 3. Assert that remaining balance matches 'expectedBalance'

// ANSWER BEGIN
Then("remaining balance should be {int} points", function (expectedBalance) {
  const total = calculateTotal(cart, "");
  const remainingBalance = userBalance - total;
  assert.strictEqual(remainingBalance, expectedBalance);
});
// END OF ANSWER
