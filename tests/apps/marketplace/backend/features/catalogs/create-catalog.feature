Feature: Create a new catalog
  In order to have catalogs in the platform
  As a user with admin permissions
  I want to create a new catalog

  Scenario: A valid unexisting catalog
    Given I send a PUT request to "/catalogs/ef8ac118-8d7f-49cc-abec-78e0d05af80a" with body:
    """
    {
      "name": "The best catalog",
    }
    """
    Then the response status code should be 201
    And the response should be empty
