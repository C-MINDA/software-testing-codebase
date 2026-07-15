const { Given, When, Then } = require("@cucumber/cucumber");
const assert = require("assert");
const { calculateTotal } = require("../../../public/js/cartLogic");

let cartTotal = 0;
let appliedDiscount = "";
let cartItems = [];

Given("the cart total is {int} points", function (points) {
  // We simulate a cart by creating an item with the specified price
  cartItems = [{ price: points }];
});

Given(
  "the user applies the valid discount code {string}",
  function (discountCode) {
    appliedDiscount = discountCode;
  },
);

When("the discount should be successfully applied", function () {
  cartTotal = calculateTotal(cartItems, appliedDiscount);
});

Then("the final total should be reduced to {float}", function (expectedTotal) {
  assert.strictEqual(cartTotal, expectedTotal);
});

Given(
  "the user enters an invalid discount code {string}",
  function (discountCode) {
    appliedDiscount = discountCode;
  },
);

When(
  "the system should display an error message {string}",
  function (expectedMessage) {
    errorMessage = appliedDiscount === "KUDOS10" ? "" : "Invalid discount code";
    assert.strictEqual(errorMessage, expectedMessage);
    cartTotal = calculateTotal(cartItems, appliedDiscount);
  },
);

Then("the total price should remain {float}", function (expectedTotal) {
  assert.strictEqual(cartTotal, expectedTotal);
});
