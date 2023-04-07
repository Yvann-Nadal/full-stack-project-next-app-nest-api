import Footer from "@/components/Footer";
import Header from "@/components/Header";
import styles from "../styles/styles.module.css";
import { GetStaticProps } from "next";
import { OrderItem } from "@/type/orderItems.type";
import { use, useEffect, useState } from "react";
import Image from "next/image";

interface OrderItems {
  data: OrderItem[];
}

export const getStaticProps: GetStaticProps = async () => {
  const res = await fetch("http://localhost:8000/api/orderItems");
  const data = await res.json();

  return {
    props: {
      data
    }
  };
};

export default function Cart({ data }: OrderItems) {
  const [orderItems, setOrderItems] = useState<OrderItem[]>(data);
  const [defaultPrice, setDefaultPrice] = useState<number>(0);

  const fetchOrderItems = async () => {
    const res = await fetch("http://localhost:8000/api/orderItems");
    const data = await res.json();
    console.log("data :", data);
  };

  useEffect(() => {
    fetchOrderItems();
    setOrderItems(data);
  }, [data]);

  const defaultPriceHandler = () => {
    if (orderItems[0]?.quantity === 1) {
      setDefaultPrice(orderItems[0].product.price);
    }
  };

  useEffect(() => {
    defaultPriceHandler();
  }, [orderItems]);

  const IncreaseQuantity = (id: number) => {
    const newOrderItems = orderItems.map(orderItem => {
      if (orderItem.id === id) {
        return {
          ...orderItem,
          quantity: orderItem.quantity + 1,
          product: {
            ...orderItem.product,
            price: orderItem.product.price + defaultPrice
          }
        };
      }

      return orderItem;
    });
    setOrderItems(newOrderItems);

    const updatedOrderItem = newOrderItems.find(orderItem => orderItem.id === id);

    fetch(`http://localhost:8000/api/orderItems/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        quantity: updatedOrderItem?.quantity
      })
    });
    fetch(`http://localhost:8000/api/products/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        price: updatedOrderItem?.product.price
      })
    });

    fetchOrderItems();
  };

  const DecreaseQuantity = (id: number) => {
    const newOrderItems = orderItems.map(orderItem => {
      if (orderItem.id === id) {
        return {
          ...orderItem,
          quantity: orderItem.quantity - 1,
          product: {
            ...orderItem.product,
            price: orderItem.product.price - defaultPrice
          }
        };
      }
      return orderItem;
    });
    setOrderItems(newOrderItems);

    if (orderItems[0].quantity === 1) {
      fetch(`http://localhost:8000/api/orderItems/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json"
        }
      });
    } else if (orderItems[0].quantity > 1) {
      fetch(`http://localhost:8000/api/orderItems/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          quantity: orderItems[0].quantity - 1,
          product: {
            price: orderItems[0].product.price - defaultPrice
          }
        })
      });
    }

    fetchOrderItems();
  };

  return (
    <div className={styles.container}>
      <Header />
      <h1>Cart</h1>
      {orderItems.map(orderItem => (
        <div key={orderItem.id}>
          <h3>{orderItem.product.title}</h3>
          <p>{orderItem.product.price} €</p>
          <Image
            src={orderItem.product.file}
            width={200}
            height={200}
            alt={orderItem.product.title}
          />
          {orderItem && <p>Quantity: {orderItem.quantity}</p>}
          <button onClick={() => IncreaseQuantity(orderItem.id)}>+</button>
          <button onClick={() => DecreaseQuantity(orderItem.id)}>-</button>
        </div>
      ))}
      <Footer />
    </div>
  );
}
