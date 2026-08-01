const {
  calculateTotal,
  removeItem,
  isValidDiscount,
  calculateShipping,
} = require("../../public/js/cartLogic");

// UNIT TEST: Testing logic in isolation without a database
describe("Cart Logic Unit Tests", () => {
  test("calculateTotal sums item prices correctly", () => {
    const cart = [{ price: 100 }, { price: 50 }];
    expect(calculateTotal(cart)).toBe(150.0);
  });

  test("calculateTotal handles empty cart", () => {
    expect(calculateTotal([])).toBe(0.0);
  });

  test("calculateTotal handles floating point precision correctly", () => {
    const cart = [{ price: 0.1 }, { price: 0.2 }];
    expect(calculateTotal(cart)).toBe(0.3);
  });

  test("calculateTotal handles items without price safely", () => {
    const cart = [{ price: 100 }, { name: "Free Gift" }];
    expect(calculateTotal(cart)).toBe(100.0);
  });

  test('calculateTotal applies "KUDOS10" discount correctly', () => {
    const cart = [{ price: 100 }];
    // 100 * 0.9 = 90
    expect(calculateTotal(cart, "KUDOS10")).toBe(90.0);
  });

  test("calculateTotal is case sensitive for discount codes", () => {
    const cart = [{ price: 100 }];
    expect(calculateTotal(cart, "kudos10")).toBe(100.0);
  });

  test("calculateTotal ignores invalid discount codes", () => {
    const cart = [{ price: 100 }];
    expect(calculateTotal(cart, "INVALID")).toBe(100.0);
  });

  // ADD ONs
  test("calculateTotal handles a single item in cart", () => {
    const cart = [{ price: 75.5 }];
    expect(calculateTotal(cart)).toBe(75.5);
  });

  test("calculateTotal handles multiple items with a price of zero", () => {
    const cart = [{ price: 0 }, { price: 0 }, { price: 50 }];
    expect(calculateTotal(cart)).toBe(50.0);
  });

  test("calculateTotal always rounds the result to exactly 2 decimal places", () => {
    const cart = [{ price: 100.1 }, { price: 50.25 }];
    expect(calculateTotal(cart)).toBe(150.35);
    const cart2 = [{ price: 100.1 }];
    expect(calculateTotal(cart2).toFixed(2)).toBe("100.10");
  });

  test("calculateTotal handles a null discount code", () => {
    const cart = [{ price: 100 }];
    expect(calculateTotal(cart, null)).toBe(100.0);
  });

  test("calculateTotal handles an undefined discount code", () => {
    const cart = [{ price: 100 }];
    expect(calculateTotal(cart, undefined)).toBe(100.0);
  });

  test("calculateTotal handles an empty string as the discount code", () => {
    const cart = [{ price: 100 }];
    expect(calculateTotal(cart, "")).toBe(100.0);
  });

  test("calculateTotal handles very large item prices", () => {
    const cart = [{ price: 999999.99 }, { price: 1000000.01 }];
    expect(calculateTotal(cart)).toBe(2000000.0);
  });

  test("calculateTotal handles duplicate items in the cart", () => {
    const cart = [
      { id: 1, price: 50 },
      { id: 1, price: 50 },
      { id: 2, price: 25 },
    ];
    expect(calculateTotal(cart)).toBe(125.0);
  });

  test("calculateTotal returns a numeric value rather than a string", () => {
    const cart = [{ price: 100 }, { price: 50 }];
    const result = calculateTotal(cart);
    expect(typeof result).toBe("number");
    expect(result).not.toBe("150");
  });
});

describe("Remove Item Logic Unit Tests", () => {
  // STUDENT: Implement tests for removeItem
  // requirements:
  // 1. Test removing an existing item reduces array length
  // 2. Test removing a non-existing item does nothing
  // ANSWER BEGIN

  test("removes an existing item", () => {
    // ARRANGE: Set up inputs and initial state
    const cart = [
      { id: 1, price: 10 },
      { id: 2, price: 20 },
    ];

    // ACT: Execute the function under test
    const result = removeItem(cart, 1);

    // ASSERT: Verify the output matches expectations
    expect(result.length).toBe(1);
    expect(result[0].id).toBe(2);
    // END OF ANSWER
  });
});

describe("Discount Validation Unit Tests", () => {
  // STUDENT: Implement tests for isValidDiscount
  // requirements:
  // 1. Test "KUDOS10" returns true
  // 2. Test other strings return false
  // ANSWER BEGIN
  // END OF ANSWER
});

describe("Shipping Logic Unit Tests", () => {
  test("calculateShipping returns 0 for an empty cart", () => {
    // ARRANGE
    const cartTotal = 0;

    // ACT
    const shippingFee = calculateShipping(cartTotal);

    // ASSERT
    expect(shippingFee).toBe(0);
  });

  test("calculateShipping returns 10 for an order below 200", () => {
    // ARRANGE
    const cartTotal = 199;

    // ACT
    const shippingFee = calculateShipping(cartTotal);

    // ASSERT
    expect(shippingFee).toBe(10);
  });

  test("calculateShipping returns 0 for an order of 200 or more", () => {
    // ARRANGE
    const cartTotal = 200;

    // ACT
    const shippingFee = calculateShipping(cartTotal);

    // ASSERT
    expect(shippingFee).toBe(0);
  });
});
