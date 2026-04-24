import { FC, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from '../../services/store';
import { Preloader } from '../ui/preloader';
import { OrderInfoUI } from '../ui/order-info';
import { getOrderByNumberApi } from '../../utils/burger-api';
import { fetchIngredients } from '../../services/slices/ingredientsSlice';
import { TIngredient } from '@utils-types';

export const OrderInfo: FC = () => {
  const { number } = useParams<{ number: string }>();
  const dispatch = useDispatch();
  const [orderData, setOrderData] = useState<any>(null);
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
          setOrderData(res.orders[0]);
          setLoading(false);
        })
        .catch(() => setLoading(false));
    }
  }, [number]);

  if (loading || ingredients.length === 0) {
    return <Preloader />;
  }

  if (!orderData) {
    return <div>Заказ не найден</div>;
  }

  const ingredientsInfo: { [key: string]: TIngredient & { count: number } } =
    {};

  orderData.ingredients.forEach((id: string) => {
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
    ...orderData,
    ingredientsInfo,
    date: new Date(orderData.createdAt),
    total
  };

  return <OrderInfoUI orderInfo={orderInfo} />;
};