const { CYCLIC_KEY } = require("@storybook/addon-actions");

describe("Appointments", () => {
  beforeEach(() => {

    //db reset
    cy.request("GET","/api/debug/reset")

    // Visits the root of our web server
    cy.visit("/")
    cy.contains("Monday");
  });
  //Creating
  it("should book an interview", () => {
 
    // Clicks on the "Add" button in the second appointment
    cy.contains("article","1pm","[alt=add]")
      .click();

      // Enters their name
    cy.get("[data-testid=student-name-input]")
      .type("Lydia Miller-Jones");

      // Chooses an interviewer
    cy.get("[alt='Sylvia Palmer']")
      .click()

      // Clicks the save button
    cy.contains("Save")
      .click();

      // Sees the booked appointment
    cy.contains(".appointment__card--show", "Lydia Miller-Jones");
    cy.contains(".appointment__card--show", "Sylvia Palmer");
  });

  //Editing 
  it("should edit an interview", () => {

    // Clicks the edit button for the existing appointment
    cy.get("[Alt=Edit]")
      .first()
      .click({force: true});

      // Changes the name and interviewer
    cy.get("[data-testid=student-name-input]")
      .clear()
      .type("bob urUncle");

      // Chooses an interviewer
    cy.get("[alt='Tori Malcolm']")
      .click();      

      // Clicks the save button
    cy.contains("Save")
      .click();

      // Sees the edit to the appointment
    cy.contains(".appointment__card--show", "Tori Malcolm");
    cy.contains(".appointment__card--show", "bob urUncle");
  });
//Canceling
  it("should cancel an interview", () => {

    // Clicks the delete button for the existing appointment
    cy.get("[Alt=Delete]")
      .first()
      .click({force: true});

      // Clicks the confirm button
    cy.contains("Confirm")
      .click();

      //check for deleteing
    cy.contains("Deleting").should("exist");
    cy.contains("Deleting").should("not.exist");

    // Sees that the appointment slot is empty
    cy.contains("article","12pm","[alt=add]");
    cy.contains(".appointment__card--show", "Archie Cohen")
    .should("not.exist");
  });
});