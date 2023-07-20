import { faker } from "@faker-js/faker";

it(
  "Create Quick Post  Monitored Conditions Reading with Required fields",
  { tags: "@smoke" },
  () => {
    cy.login(Cypress.env("user1"));
    cy.visit("/#!/QPCMReading/Create/Identity");
    cy.xpath("//tmadatetime[@name='Date']//input[@type='text']")
      .eq(0)
      .type(faker.date.recent().toLocaleDateString("en-US"));
    cy.get("select[aria-label='Item Type']").select("Biomed");
    cy.get("input[aria-label='Item Tag Number']")
      .eq(0)
      .type("15")
      .wait(500)
      .type("{enter}");
    cy.get("input[aria-label='Technician Name']")
      .eq(0)
      .type("Auto Test Technician")
      .wait(500)
      .type("{enter}");
    cy.get("textarea[ng-model='vm.ngModel']")
      .eq(0)
      .clear()
      .type(faker.datatype.number(100));
    cy.get("textarea[ng-model='vm.ngModel']")
      .eq(1)
      .clear()
      .type(faker.random.words(1));
    cy.get("textarea[ng-model='vm.ngModel']")
      .eq(2)
      .clear()
      .type(`WO${faker.datatype.number(1000)}`);
    cy.getButton("Save").click();
  }
);
