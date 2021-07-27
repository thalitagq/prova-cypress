///<reference types='cypress'/>

describe("TGL", () => {
  it("Fazer Login", () => {
    cy.visit("http://localhost:3000/login");
    
    const email = Cypress.env("email");
    const password = Cypress.env("password")

    cy.get('[type="email"]').type(email);

    cy.get('[type="password"]').type(password);

    cy.intercept("POST", "**/sessions").as("session");

    cy.get(".sc-jSFjdj > .sc-fujyAs").click();

    cy.wait("@session").then(({ response }) => {
      expect(response.statusCode).to.eq(200);
      expect(response.body.token).has.property("token");
      expect(response.body.token.token).is.not.null;
      expect(response.body.user_id).has.property("id");
      expect(response.body.user_id.id).is.not.null;
      expect(response.body.user_id).is.not.null;
    });
  });

  it.skip('Fazer aposta mega-sena', () => {
    cy.get(".sc-fujyAs > a").click()
    cy.get(".iTNdSJ").click()
    for (let index = 0; index < 7; index++) {
      cy.get(".sc-khIgEk > div > :nth-child(1)").click()
      cy.get(".sc-Arkif").click();
    }

    cy.intercept("POST", "http://192.168.18.9:3333/bets").as("bets");
    
    cy.get(".sc-iBzEeX").click()
    
    cy.wait("@bets").then(({ response }) => {
      cy.log(response);
      expect(response.statusCode).to.eq(200);
    });
  });

  it.skip('Resetar aposta', () => {
    cy.get(".sc-fujyAs > a").click();
    cy.get(".iTNdSJ").click();
    cy.get(".sc-khIgEk > div > :nth-child(1)").click();
    cy.get(".sc-khIgEk > div > :nth-child(2)").click()
  });

  it.skip('Apagar aposta salva', () => {
    cy.get(".sc-fujyAs > a").click();
    cy.get(".iTNdSJ").click();
    cy.get(".sc-khIgEk > div > :nth-child(1)").click();
    cy.get(".sc-Arkif").click();
    cy.get(".sc-gXfVKN > svg").click()
    cy.get('[style="margin: auto;"]').should("have.text", "Carrinho vazio");
  });

  it.skip('Salvar carrinho com total abaixo do exigido', () => {
    cy.get(".sc-fujyAs > a").click();
    cy.get(".iTNdSJ").click();
    cy.get(".sc-khIgEk > div > :nth-child(1)").click();
    cy.get(".sc-Arkif").click();
    cy.get(".sc-iBzEeX").click();
    
    cy.on("window:alert", (txt) => {
      expect(txt).to.contains("As apostas devem ser de no mínimo");
    });
  });

  it.skip('Adicionar aposta imcompleta no carrinho', () => {
    cy.get(".sc-fujyAs > a").click();
    cy.get(".sc-jJMGnK > :nth-child(1)").click()
    cy.get(".sc-Arkif").click()
    cy.on("window:alert", (txt) => {
      expect(txt).to.contains("Jogo incompleto");
    });
  });

  it.skip('Logout', () => {
    cy.get(".sc-hBMUJo > :nth-child(2)").click()
    cy.location().should((loc) => {
      expect(loc.pathname).to.eq("/login");
    })
  });
});
