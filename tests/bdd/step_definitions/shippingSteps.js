const { Given, When, Then } = require("@cucumber/cucumber");
const assert = require("assert");
const { calculateShipping } = require("../../../public/js/cartLogic");

let cartTotal = 0;
let shippingFee = 0;

Given("the shipping cart total is {int} dollars", function (total) {
  cartTotal = total;
});

When("the shipping fee is calculated", function () {
  shippingFee = calculateShipping(cartTotal);
});

Then("the shipping fee should be {int} dollars", function (expectedFee) {
  assert.strictEqual(shippingFee, expectedFee);
});
