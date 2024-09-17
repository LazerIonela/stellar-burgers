import { FC, useEffect } from 'react';
import { Preloader } from '../ui/preloader';
import { IngredientDetailsUI } from '../ui/ingredient-details';
import { useSelector, useDispatch } from '../../services/store';
import {
  selectIngredient,
  selectIngredients,
  setSelectedIngredient
} from '../../services/ingredientsSlice';
import { useParams } from 'react-router-dom';
import { TIngredient } from '@utils-types';

export const IngredientDetails: FC = () => {
  /** TODO: взять переменную из стора */
  const dispatch = useDispatch();
  const ingredientData = useSelector(selectIngredient);
  const ingredients = useSelector(selectIngredients);
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    if (id && ingredients.length > 0) {
      const selectedIngredient = ingredients.find(
        (ingredient: TIngredient) => ingredient._id === id
      );
      if (selectedIngredient) {
        dispatch(setSelectedIngredient(selectedIngredient));
      }
    }
  }, [dispatch]);

  if (!ingredientData) {
    return <Preloader />;
  }

  return <IngredientDetailsUI ingredientData={ingredientData} />;
};
