const modalContent = '[data-cy=modal-content]';
const ingredients = '[data-cy=ingredients]';
const constructorBurger = '[data-cy=constructor]';
const buns = '[data-cy=buns]';
const topBun = '[data-cy=constructor-bun-top]';
const bottomBun = '[data-cy=constructor-bun-bottom]';
const closeButton = '[data-cy=modal-button-close]';
const closeOverlay = '[data-cy=modal-overlay-close]';
const postButton = '[data-cy=order-button-post]';
const orderNumber = '[data-cy=order-number]';

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
    cy.visit('/');
  });

  afterEach(() => {
    cy.clearCookie('refreshToken');
    cy.clearCookie('accessToken');
  });

  it('Добавление ингредиента из списка в конструктор', () => {
    it('Добавление булки в конструктор', function () {
      cy.get(buns).contains('Добавить').click();
      cy.get(topBun).contains('Краторная булка N-200i').should('exist');
      cy.get(bottomBun).contains('Краторная булка N-200i').should('exist');
    });
  });

  it('Открытие модального окна ингредиента', () => {
    cy.get(modalContent).should('not.exist');
    cy.get(ingredients).contains('Краторная булка N-200i').click();
    cy.get(modalContent).contains('Краторная булка N-200i').should('exist');
  });

  it('Закрытие по клику на крестик', () => {
    cy.get(ingredients).contains('Краторная булка N-200i').click();
    cy.get(modalContent).contains('Краторная булка N-200i').should('exist');
    cy.get(closeButton).click();
    cy.get(modalContent).should('not.exist');
  });

  it('Закрытие по клику на оверлей', () => {
    cy.get(ingredients).contains('Краторная булка N-200i').click();
    cy.get(modalContent).contains('Краторная булка N-200i').should('exist');
    cy.get(closeOverlay).click('top', { force: true });
    cy.get(modalContent).should('not.exist');
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
    cy.get(ingredients).contains('Добавить').click();
    //Вызывается клик по кнопке «Оформить заказ»
    cy.get(postButton).contains('Оформить заказ').click();

    //Проверяется, что модальное окно открылось и номер заказа верный
    cy.intercept('POST', 'api/orders', { fixture: 'order.json' }).as(
      'orderBurger'
    );
    cy.get(orderNumber).contains('77771').should('exist');

    //Закрывается модальное окно и проверяется успешность закрытия
    cy.get(closeButton).click();
    cy.get(modalContent).should('not.exist');
  });

  it('Проверяется, что конструктор пуст', () => {
    cy.get(constructorBurger)
      .contains('Краторная булка N-200i')
      .should('not.exist');
  });
});
