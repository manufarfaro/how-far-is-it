describe('search spec', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.findByTestId("search", { timeout: 10000 }).should('be.visible');
  });

  describe('when no cities are selected', () => {
    it('should display a toast error message', () => {
      cy.findByTestId("search").click();

      const errorToast = cy.get(".chakra-toast").should('be.visible').findByText("Invalid Form");
      expect(errorToast).to.exist;
    });
  });

  describe('when all search fields are correctly filled', () => {
    it('should show results page with processed data', () => {
      cy.get("#form-city-origin").type("Marse{enter}");
      cy.findByTestId("add-intermediate").click();
      cy.get("#form-intermedate-city-0").type("Toulouse{enter}");
      cy.get("#form-city-origin").type("Nant{enter}");
      cy.get("#form-city-destination").type("Pari{enter}");
      cy.findByTestId("travel-date").click().type((new Date(2022,0,3)).toISOString().split('T')[0])
      cy.findByTestId("passenger-qty").type("{backspace}2");
      cy.findByTestId("search").click();
      cy.url().should('contain', `${Cypress.config("baseUrl")}/searchResult?origin=Nantes&destination=Paris&intermediateCities=Toulouse&passengerQty=2&date=2022-01-03`);
      cy.findByTestId("city-origin").should('contain', "Nantes")
    })
  });

  
})

export {};
