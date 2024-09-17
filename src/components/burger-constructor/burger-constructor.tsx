import { FC, useMemo } from 'react';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { useSelector, useDispatch } from '../../services/store';
import { useNavigate } from 'react-router-dom';
import {
  selectConstructor,
  clearBasket
} from '../../services/burgerConstructorSlice';
import { orderBurgerApi } from '@api';
import {
  setOrderRequest,
  setOrderModalData,
  selectOrderModalData,
  selectOrderRequest,
  clearOrderModalData
} from '../../services/orderSlice';

import { selectUserIsAuth } from '../..//services/userSlice';

export const BurgerConstructor: FC = () => {
  /** TODO: взять переменные constructorItems, orderRequest и orderModalData из стора */
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const constructorItems = useSelector(selectConstructor);
  const orderRequest = useSelector(selectOrderRequest);
  const orderModalData = useSelector(selectOrderModalData);

  const userIsAuth = useSelector(selectUserIsAuth);

  const onOrderClick = () => {
    if (!constructorItems.bun || orderRequest) return;
    const order = constructorItems.ingredients.map(
      (ingredient) => ingredient._id
    );
    order.push(constructorItems.bun._id);
    order.unshift(constructorItems.bun._id);

    if (!userIsAuth) {
      navigate(`/login`);
      return;
    }
    dispatch(setOrderRequest(true));
    orderBurgerApi(order)
      .then((orderData) => {
        dispatch(setOrderModalData(orderData));
      })
      .finally(() => {
        dispatch(setOrderRequest(false));
      });
  };

  const closeOrderModal = () => {
    dispatch(clearOrderModalData());
    dispatch(clearBasket());
  };

  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
      (constructorItems.ingredients
        ? constructorItems.ingredients.reduce(
            (s: number, v: TConstructorIngredient) => s + v.price,
            0
          )
        : 0),
    [constructorItems]
  );

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
