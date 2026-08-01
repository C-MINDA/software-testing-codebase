Feature: Shipping Fee

  Scenario: An order qualifies for free shipping
    Given the shipping cart total is 200 dollars
    When the shipping fee is calculated
    Then the shipping fee should be 0 dollars