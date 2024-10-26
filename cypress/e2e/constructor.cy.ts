describe('проверяем доступность приложения', function () {
  beforeEach(() => {
    cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients.json' }).as(
      'getIngredients'
    );
    cy.intercept('GET', 'api/auth/user', { fixture: 'user.json' }).as(
      'getUser'
    );
    cy.intercept('POST', 'api/orders', { fixture: 'order.json' }).as(
      'orderBurger'
    );
    window.localStorage.setItem('refreshToken', JSON.stringify('111111111'));
    cy.setCookie('accessToken', JSON.stringify('222222222'));
    cy.viewport(1920, 1080);
    cy.visit('http://localhost:4000/');
  });

  afterEach(() => {
    cy.clearCookie('refreshToken');
    cy.clearCookie('accessToken');
  });

  it('Добавление ингредиента из списка в конструктор', () => {
    it('Добавление булки в конструктор', function () {
      cy.get('[data-cy="buns"]').contains('Добавить').click();
      cy.get('[data-cy="constructor-bun-top"]')
        .contains('Краторная булка N-200i')
        .should('exist');
      cy.get('[data-cy="constructor-bun-bottom"]')
        .contains('Краторная булка N-200i')
        .should('exist');
    });
  });

  it('Открытие модального окна ингредиента', () => {
    cy.get('[data-cy="modal-content"]').should('not.exist');
    cy.get('[data-cy="ingredients"]')
      .contains('Краторная булка N-200i')
      .click();
    cy.get('[data-cy="modal-content"]')
      .contains('Краторная булка N-200i')
      .should('exist');
  });

  it('Закрытие по клику на крестик', () => {
    cy.get('[data-cy="ingredients"]')
      .contains('Краторная булка N-200i')
      .click();
    cy.get('[data-cy="modal-content"]')
      .contains('Краторная булка N-200i')
      .should('exist');
    cy.get('[data-cy="modal-button-close"]').click();
    cy.get('[data-cy="modal-content"]').should('not.exist');
  });

  it('Закрытие по клику на оверлей', () => {
    cy.get('[data-cy="ingredients"]')
      .contains('Краторная булка N-200i')
      .click();
    cy.get('[data-cy="modal-content"]')
      .contains('Краторная булка N-200i')
      .should('exist');
    cy.get('[data-cy=modal-overlay-close]').click('top', { force: true });
    cy.get('[data-cy="modal-content"]').should('not.exist');
  });

  it('Подставляются моковые токены авторизации', () => {
    cy.window()
      .its('localStorage')
      .invoke('setItem', 'accessToken', 'mockedToken123');
    cy.window()
      .its('localStorage')
      .invoke('getItem', 'accessToken')
      .should('eq', 'mockedToken123');
  });

  it('Оформление заказа', () => {
    cy.get('[data-cy="ingredients"]').contains('Добавить').click();
    //Вызывается клик по кнопке «Оформить заказ»
    cy.get('[data-cy="order-button-post"]').contains('Оформить заказ').click();

    //Проверяется, что модальное окно открылось и номер заказа верный
    cy.get('[data-cy="order-number"]').contains('77771').should('exist');

    //Закрывается модальное окно и проверяется успешность закрытия
    cy.get('[data-cy="modal-button-close"]').click();
    cy.get('[data-cy="modal-content"]').should('not.exist');
  });

  it('Проверяется, что конструктор пуст', () => {
    cy.get('[data-cy="constructor"]')
      .contains('Краторная булка N-200i')
      .should('not.exist');
  });
});
