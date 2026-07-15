Feature: Discount Code
    
    Scenario: (Happy Path) Valid discount code application
        Given the cart total is 100 points
        And the user applies the valid discount code "KUDOS10"
        When the discount should be successfully applied
        Then the final total should be reduced to 90.00
    
     Scenario: (Edge Case) Invalid discount code application
        Given the user enters an invalid discount code "NOTREAL"
        When the system should display an error message "Invalid discount code"
        Then the total price should remain 100.00
