Cypress.Commands.add('setAuth', () => {
  cy.setCookie('accessToken', 'fake-token');
  localStorage.setItem('refreshToken', 'fake-refresh-token');
});

Cypress.Commands.add('clearAuth', () => {
  cy.clearCookie('accessToken');
  localStorage.removeItem('refreshToken');
});