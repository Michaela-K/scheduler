
describe("Navigation", () => {
  it("should navigate to Tuesday", () => {
    cy.visit("/");
    cy.contains("[data-testid=day]", "Tuesday")
    .click()
    .should("have.class", "day-list__item--selected", "rgb(242, 242, 242)");
  });
});