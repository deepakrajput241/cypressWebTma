import "cypress-file-upload";

// add
Cypress.Commands.add(
  "addFirstItemFromSlideOverTable",
  (openSlideOverLinkText, addItemButtonText) => {
    cy.contains(`${openSlideOverLinkText}`).click();
    // add first item in table
    cy.get("tbody input:first").check();
    cy.contains("button", `${addItemButtonText}`).click();
  }
);

Cypress.Commands.add("addRepairCenter", () => {
  cy.contains("Add Repair Center").click();
  cy.get("table input").eq(2).check();
  cy.contains("Add Selected").click();
});

// clear
Cypress.Commands.add("clearCheckbox", (ariaLabel) => {
  cy.get(`input[aria-label='${ariaLabel}'][type='checkbox']`)
    .as("input")
    .uncheck();
  cy.get("@input").should("not.be.checked");
});

Cypress.Commands.add("clearCombobox", (ariaLabel) => {
  cy.get(`input[aria-label='${ariaLabel}'][type='text']`).as("input").clear();
  cy.get("@input").should("have.value", "");
});

Cypress.Commands.add("clearDateInput", (ariaLabel) => {
  cy.get(`input[aria-label="${ariaLabel}"]`).as("input").clear();
  cy.get("@input").should("have.value", "");
});

Cypress.Commands.add("clearInput", (ariaLabel) => {
  cy.get(`input[aria-label="${ariaLabel}"]`).as("input").clear();
  cy.get("@input").should("have.value", "");
});

Cypress.Commands.add("clearNumericTextBoxInput", (ariaLabel) => {
  cy.get(`[aria-label='${ariaLabel}'] input:first`)
    .as("input")
    .clear()
    .type("{enter}", { force: true });
  cy.get("@input").should("have.value", "");
});

Cypress.Commands.add("clearSelect", (ariaLabel) => {
  cy.get(`select[aria-label='${ariaLabel}']`).as("input").select([]);
  cy.get("@input").should("have.value", null);
});

Cypress.Commands.add("clearTextarea", (ariaLabel) => {
  cy.get(`textarea[aria-label='${ariaLabel}']`).as("input").clear();
  cy.get("@input").should("have.value", "");
});

// click
Cypress.Commands.add("clickAndCheckAlert", (element, alert) => {
  const stub = cy.stub();
  cy.on("window:alert", stub);
  cy.contains(element)
    .click()
    .then(() => {
      expect(stub.getCall(0)).to.be.calledWith(alert);
    });
});

Cypress.Commands.add(
  "clickAndCheckResponse",
  (element, method, url, code, bodyKey, bodyValue) => {
    cy.intercept(method, url).as("request");
    cy.contains(element).click();
    cy.wait("@request").then(({ response }) => {
      expect(response.statusCode).to.eq(code);
      if (bodyKey) {
        expect(response.body[bodyKey]).to.eq(bodyValue);
      } else {
        expect(response.body.Id).exist;
        return response.body.Id;
      }
    });
  }
);

// we might not know in advance of attempting to delete if a record is linked so this is permissive
Cypress.Commands.add("clickDeleteAndCheckResponse", () => {
  cy.intercept("POST", "/*/Delete/*").as("request");
  cy.contains("a", "Delete").click();
  cy.wait("@request").then(({ response }) => {
    expect(response.statusCode).to.eq(200);
    if (response.body.Error) {
      expect(response.body.Error).to.eq(
        "Unable to delete record.  Connected records found."
      );
    } else {
      expect(response.body.Id).exist;
    }
  });
});

Cypress.Commands.add("clickSaveAndCheckAlert", (alert) => {
  const stub = cy.stub();
  cy.on("window:alert", stub);
  cy.contains("Save")
    .click()
    .then(() => {
      expect(stub.getCall(0)).to.be.calledWith(alert);
    });
});

Cypress.Commands.add("clickSaveAndCheckResponse", () => {
  cy.intercept("POST", "/*/*").as("request");
  cy.contains("a", "Save").click();
  cy.wait("@request").then(({ response }) => {
    expect(response.statusCode).to.eq(200);
    expect(response.body.Id).exist;
    return response.body.Id;
  });
});

// edit
Cypress.Commands.add("editCombobox", (ariaLabel, value) => {
  cy.clearCombobox(ariaLabel);
  cy.fillCombobox(ariaLabel, value);
});

Cypress.Commands.add("editInput", (ariaLabel, value) => {
  cy.clearInput(ariaLabel);
  cy.fillInput(ariaLabel, value);
});

Cypress.Commands.add("editNumericTextBoxInput", (ariaLabel, value) => {
  cy.clearNumericTextBoxInput(ariaLabel);
  cy.fillNumericTextBoxInput(ariaLabel, value);
});

Cypress.Commands.add("editTextarea", (ariaLabel, value) => {
  cy.clearTextarea(ariaLabel);
  cy.fillTextarea(ariaLabel, value);
});

// fill
Cypress.Commands.add("fillCheckbox", (ariaLabel) => {
  cy.get(`input[aria-label='${ariaLabel}'][type='checkbox']`)
    .as("input")
    .check();
  cy.get("@input").should("be.checked");
});

Cypress.Commands.add("fillCombobox", (ariaLabel, value) => {
  cy.get(`input[aria-label='${ariaLabel}'][type='text']`)
    .as("combobox")
    .type(value);
  cy.get("li").contains(`${value}`).click({ force: true });
  cy.get("@combobox").should("have.value", value);
});

Cypress.Commands.add("fillDateInput", (ariaLabel, value) => {
  const fillValue = value
    ? value
    : new Date().toLocaleDateString("en-US", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      });
  cy.get(`input[aria-label='${ariaLabel}'][data-role='datepicker']`)
    .as("input")
    .type(fillValue)
    .wait(500);
  cy.get("@input").should("have.value", fillValue);
});

Cypress.Commands.add("fillInput", (ariaLabel, value) => {
  cy.get(`input[aria-label="${ariaLabel}"]`).as("input").type(value);
  cy.get("@input").should("have.value", value);
});

Cypress.Commands.add("fillNumericTextBoxInput", (ariaLabel, value) => {
  cy.get(`[aria-label='${ariaLabel}'] input:first`)
    .as("input")
    .type(`${value}{enter}`);
  cy.get("@input").should("have.value", value);
});

Cypress.Commands.add("fillRadio", (name, value) => {
  cy.get(`input[name='${name}'][type='radio'][value='${value}']`)
    .as("input")
    .check();
  cy.get("@input").should("have.value", value);
});

Cypress.Commands.add("fillSelect", (ariaLabel, value) => {
  cy.get(`select[aria-label='${ariaLabel}']`).as("select").select(value);
  cy.get("@select").find("option:selected").should("have.text", value);
});

Cypress.Commands.add("fillTextarea", (ariaLabel, value) => {
  cy.get(`textarea[aria-label='${ariaLabel}']`).as("textArea").type(value);
  cy.get("@textArea").should("have.value", value);
});

Cypress.Commands.add("fillTimeInput", (ariaLabel, value) => {
  cy.get(`input[aria-label='${ariaLabel}'][data-role='timepicker']`)
    .as("input")
    .type(value)
    .wait(500);
  cy.get("@input").should("have.value", value);
});

// other
Cypress.Commands.add("apiLogin", (user) => {
  cy.session([user], () => {
    cy.request({
      method: "POST",
      url: "/platformapi/v2/Users/Authenticate",
      body: {
        userName: user.loginId,
        password: user.password,
        clientName: user.clientName,
      },
    }).then(({ body }) => {
      alert(body.token);
      window.localStorage.setItem("authToken", body.token);
    });
  });
});

Cypress.Commands.add("apiCreate", (url, body) => {
  cy.request({
    method: "POST",
    url: `/platformapi${url}`,
    body: body,
    auth: { bearer: Cypress.env("user1").bearerToken },
    failOnStatusCode: false,
  });
});

Cypress.Commands.add("login", (user) => {
  cy.session([user], () => {
    cy.visit("/Login?ReturnUrl=%2F");
    cy.get("#Username").type(user.loginId);
    cy.get("#Password").type(user.password);
    cy.get("#Client").type(user.clientName);
    cy.get("form").contains("Log in").click();
  });
});

Cypress.Commands.add("setWait", () => {
  cy.wait(500);
});

// old
Cypress.Commands.add("EditInputElement", (fieldName, value) => {
  cy.get(`input[name="${fieldName}"]`).clear().type(value);
  cy.get(`input[name="${fieldName}"]`).should("have.value", value);
});

Cypress.Commands.add("getButton", (buttonName) => {
  cy.get(`[buttonname='${buttonName}']`);
});

Cypress.Commands.add("clickCheckbox", (fieldName) => {
  cy.get(`input[name='${fieldName}']`, { timeout: 10000 }).click({
    force: true,
  });
});

Cypress.Commands.add("getButtonWithText", (buttonName) => {
  cy.xpath(`//button[normalize-space()='${buttonName}']`).should("be.visible");
});

Cypress.Commands.add("selectRadioBtnById", (idValue) => {
  cy.get(`[id='${idValue}']`).check();
});

//get element 3Dot button in dropdown of criteria
Cypress.Commands.add("getCriteria3DotMenu", (dropdownName) => {
  cy.xpath(
    `//option[@label="${dropdownName}"][@selected="selected"]/../following-sibling::span//button`
  );
});

Cypress.Commands.add("getCriteriaDropdown", (dropdownName) => {
  cy.xpath(`//option[@label='${dropdownName}'][@selected='selected']/..`);
});

Cypress.Commands.add("getColumnOnBrowse", (columnName) => {
  cy.xpath(`//tr/th[normalize-space()='${columnName}']`, {});
});

Cypress.Commands.add("getCriteriaCheckbox", (criteriaName) => {
  cy.xpath(
    `//option[@label='${criteriaName}'][@selected='selected']/ancestor::span/preceding-sibling::span/input[@type='checkbox']`
  );
});

Cypress.Commands.add("openFlyoutAndSelectRandomValue", (nameField) => {
  cy.get(`validation[aria-label='${nameField}'] .input-group-btn`)
    .should("be.visible")
    .click();
  cy.get(".k-button.k-button-icontext.k-grid-SelectValue").should("be.visible");
  cy.get(".k-grid-content.k-auto-scrollable")
    .find("tr")
    .then((row) =>
      cy
        .get(".k-button.k-button-icontext.k-grid-SelectValue")
        .eq(Cypress._.random(0, row.length - 1))
        .click()
    );
});

Cypress.Commands.add("EditRepairCenter", () => {
  cy.get("a[role='tab']:contains('Repair Centers')")
    .should("be.visible")
    .click();
  cy.get(".k-button.k-button-icontext.k-grid-Delete").eq(0).click();
  cy.get("#toolbarAddRepairCenter").should("be.visible").click();
  cy.get('input[ng-change="gridCtrl.AddSelectedPK(dataItem)"]').should(
    "be.visible"
  );
  cy.get(".k-grid-content.k-auto-scrollable")
    .find("tr")
    .then((row) =>
      cy
        .get("input[ng-model='dataItem.selected']")
        .eq(Cypress._.random(1, row.length))
    )
    .click();
  cy.getButtonWithText("Add Selected").click();
});

Cypress.Commands.add("selectCheckBoxFromGrid", (xpath) => {
  cy.get("input[ng-model='dataItem.selected']").should("be.visible");
  cy.get(".k-grid-content.k-auto-scrollable")
    .find("tr")
    .then((row) => {
      var text = xpath.replace(
        "tr[1]",
        `tr[${Cypress._.random(1, row.length)}]`
      );
      cy.xpath(text).click();
    });
});

Cypress.Commands.add("fillNumericTextBox", (index, value) => {
  cy.get(".k-formatted-value.k-input.ng-scope").eq(index).type(value);
});

Cypress.Commands.add("selectRandomCheckBoxFromGrid", (index, xpath) => {
  cy.get("input[ng-model='dataItem.selected']").should("be.visible");
  cy.get(".k-grid-content.k-auto-scrollable")
    .should("be.visible")
    .eq(index)
    .find("tr")
    .then((row) => {
      var text = xpath.replace(
        "tr[1]",
        `tr[${Cypress._.random(1, row.length - 1)}]`
      );
      cy.xpath(text).click();
    });
});
