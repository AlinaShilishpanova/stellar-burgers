import { FC, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from '../../services/store';
import { IngredientDetailsUI } from '@ui';
import { fetchIngredients } from '../../services/slices/ingredientsSlice';

export const IngredientDetailsPage: FC = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch();
  const { ingredients } = useSelector((state) => state.ingredients);

  useEffect(() => {
    if (ingredients.length === 0) {
      dispatch(fetchIngredients());
    }
  }, [dispatch, ingredients.length]);

  const ingredient = ingredients.find((item) => item._id === id);

  if (!ingredient) {
    return <div>Ингредиент не найден</div>;
  }

  return <IngredientDetailsUI ingredientData={ingredient} />;
};
