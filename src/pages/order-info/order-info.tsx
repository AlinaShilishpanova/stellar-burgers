import { FC, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from '../../services/store';
import { OrderInfoUI } from '@ui';
import { getOrderByNumberApi } from '../../utils/burger-api';
import { TOrder, TIngredient } from '../../utils/types';
import { fetchIngredients } from '../../services/slices/ingredientsSlice';

export const OrderInfoPage: FC = () => {
  const { number } = useParams<{ number: string }>();
  const dispatch = useDispatch();
  const [order, setOrder] = useState<TOrder | null>(null);
  const [loading, setLoading] = useState(true);
  const { ingredients } = useSelector((state) => state.ingredients);

  useEffect(() => {
    if (ingredients.length === 0) {
      dispatch(fetchIngredients());
    }
  }, [dispatch, ingredients.length]);

  useEffect(() => {
    if (number) {
      getOrderByNumberApi(Number(number))
        .then((res) => {
          setOrder(res.orders[0]);
          setLoading(false);
        })
        .catch(() => setLoading(false));
    }
  }, [number]);

  if (loading || ingredients.length === 0) {
    return <div>Загрузка...</div>;
  }

  if (!order) {
    return <div>Заказ не найден</div>;
  }

  const ingredientsInfo: { [key: string]: TIngredient & { count: number } } =
    {};

  order.ingredients.forEach((id) => {
    const ingredient = ingredients.find((item) => item._id === id);
    if (ingredient) {
      if (ingredientsInfo[id]) {
        ingredientsInfo[id].count += 1;
      } else {
        ingredientsInfo[id] = { ...ingredient, count: 1 };
      }
    }
  });

  const total = Object.values(ingredientsInfo).reduce(
    (sum, item) => sum + item.price * item.count,
    0
  );

  const orderInfo = {
    ...order,
    ingredientsInfo,
    date: new Date(order.createdAt),
    total
  };

  return <OrderInfoUI orderInfo={orderInfo} />;
};
