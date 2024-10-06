import { FC, useMemo, useEffect } from 'react';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { useSelector, useDispatch } from '../../services/store';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  clearBasket,
  selectConstructorBun,
  selectConstructorIngredients
} from '../../services/burgerConstructorSlice';
import {
  orderBurger,
  resetOrderModalData,
  selectOrderModalData,
  selectOrderRequest
} from '../../services/orderSlice';
import {} from '../../services/burgerConstructorSlice';

import { selectUserIsAuth } from '../../services/userSlice';

export const BurgerConstructor: FC = () => {
  /** TODO: взять переменные constructorItems, orderRequest и orderModalData из стора */
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const orderRequest = useSelector(selectOrderRequest);
  const orderModalData = useSelector(selectOrderModalData);
  const userIsAuth = useSelector(selectUserIsAuth);
  const constructorItems = {
    bun: useSelector(selectConstructorBun),
    ingredients: useSelector(selectConstructorIngredients)
  };

  const onOrderClick = () => {
    if (!constructorItems.bun || orderRequest) return;

    const orderData = [
      constructorItems.bun._id,
      ...constructorItems.ingredients.map((ingredient) => ingredient._id)
    ];
    orderData.push(constructorItems.bun._id);

    if (userIsAuth) {
      dispatch(orderBurger(orderData));
    } else {
      navigate(`/login`);
    }
  };

  const closeOrderModal = () => {
    dispatch(resetOrderModalData());
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
