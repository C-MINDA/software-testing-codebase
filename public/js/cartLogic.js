/**
 * UNIT TEST: Testing logic in isolation without a database
 * Calculates total price of items in cart and applies discount if valid.
 * @param {Array} cartItems - Array of objects with price property
 * @param {string} discountCode - Optional discount code
 * @returns {number} - Total price
 */
function calculateTotal(cartItems, discountCode) {
  // STUDENT: Implement your solution below
  // requirements:
  // 1. Sum up the 'price' of all items in cartItems
  // 2. If discountCode is "KUDOS10", apply 10% discount
  // 3. Return the total as a number with 2 decimal places

  // ANSWER BEGIN
  let total = cartItems.reduce((sum, item) => sum + (item.price ?? 0), 0);

  if (discountCode === "KUDOS10") {
    total *= 0.9; // Apply 10% discount
  }

  return parseFloat(total.toFixed(2));
  // END OF ANSWER
}

// Exercise 1; Question 4
let result;
result = calculateTotal([{ price: 10 }, { price: 2.5 }], "");
// console.log(result); // Should print out "12.5"
result = calculateTotal([{ price: 3 }, { price: 2 }], "KUDOS10");
// console.log(result); // Should print out "4.5"
result = calculateTotal([{ price: 999999.99 }, { price: 1000000.01 }], "");
// console.log(result);

/**
 * Removes the first instance of an item with the given id from the cart.
 * @param {Array} cartItems
 * @param {number} itemId
 * @returns {Array} New cart array
 */
function removeItem(cartItems, itemId) {
  // STUDENT: Implement removeItem below
  // requirements:
  // 1. Find the index of the first item with 'id' === itemId
  // 2. If found, remove it from the array (splice or filter)
  // 3. Return the modified array/new array

  // ANSWER BEGIN
  return cartItems;
  // END OF ANSWER
}

/**
 * Validates a discount code.
 * @param {string} code
 * @returns {boolean} True if valid
 */
function isValidDiscount(code) {
  // STUDENT: Implement isValidDiscount below
  // requirements:
  // 1. Return true if code is "KUDOS10"
  // 2. Return false otherwise

  // ANSWER BEGIN
  return false;
  // END OF ANSWER
}

// UMD Wrapper for both Node.js and Browser compatibility
if (typeof module !== "undefined" && module.exports) {
  module.exports = { calculateTotal, removeItem, isValidDiscount };
} else {
  window.calculateTotal = calculateTotal;
  window.removeItem = removeItem;
  window.isValidDiscount = isValidDiscount;
}
