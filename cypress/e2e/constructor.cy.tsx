/// <reference types="cypress" />

/// <reference types="cypress" />

describe('Конструктор бургера', () => {
  beforeEach(() => {
    cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients.json' });
    cy.visit('/');
  });

  it('должен открыть страницу', () => {
    cy.contains('Соберите бургер').should('be.visible');
  });

  it('добавляет булку в конструктор', () => {
    cy.get('[data-cy="constructor"] [class*="constructor-element"]').should('have.length', 0);
    cy.contains('Добавить').first().click({ force: true });
    cy.get('[data-cy="constructor"] [class*="constructor-element"]').should('have.length.at.least', 1);
  });

  it('открывает модальное окно ингредиента', () => {
    cy.get('[data-cy="modal"]').should('not.exist');
    cy.get('[data-cy="ingredient-link"]').first().click();
    cy.get('[data-cy="modal"]').should('be.visible');
  });

  it('закрывает модальное окно по крестику', () => {
    cy.get('[data-cy="ingredient-link"]').first().click();
    cy.get('[data-cy="close-icon"]').click();
    cy.get('[data-cy="modal"]').should('not.exist');
  });

  it('закрывает модальное окно по оверлею', () => {
    cy.get('[data-cy="ingredient-link"]').first().click();
    cy.get('[data-cy="overlay"]').click({ force: true });
    cy.get('[data-cy="modal"]').should('not.exist');
  });

  it('отображает правильные данные ингредиента в модалке', () => {
    cy.get('[data-cy="ingredient-link"]').first().click();
    cy.get('[data-cy="modal"]').contains('Краторная булка N-200i').should('be.visible');
  });

  it('создаёт заказ авторизованным пользователем', () => {
    cy.setCookie('accessToken', 'fake-token');
    localStorage.setItem('refreshToken', 'fake-refresh-token');

    cy.intercept('GET', 'api/auth/user', { fixture: 'user.json' });
    cy.intercept('POST', 'api/orders', { fixture: 'order.json' });

    cy.reload();
    cy.wait(2000);
    cy.get('[data-cy="ingredient"]', { timeout: 10000 }).should('exist');

    cy.contains('Добавить').first().click({ force: true });
    
    cy.get('[data-cy="constructor"] [class*="constructor-element"]').should('have.length.at.least', 1);

    cy.get('[data-cy="order-button"]').click();

    cy.get('[data-cy="modal"]', { timeout: 10000 }).should('be.visible');
    cy.contains('12345').should('be.visible');
    
    cy.get('[data-cy="close-icon"]').click();
    cy.get('[data-cy="modal"]').should('not.exist');

    cy.get('[data-cy="constructor"] [class*="constructor-element"]').should('have.length', 0);
  });
});