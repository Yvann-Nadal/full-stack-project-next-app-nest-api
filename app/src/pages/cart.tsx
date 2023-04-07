import Footer from "@/components/Footer";
import Header from "@/components/Header";
import styles from "../styles/styles.module.css";
import { GetServerSideProps } from "next";
import { OrderItem } from "@/type/orderItems.type";
import { useEffect, useState } from "react";

interface OrderItems {
  data: OrderItem[];
}

export const getServersideProps: GetServerSideProps = async () => {
  const res = await fetch("http://localhost:8000/api/orderItems");
  const data = await res.json();
  const orderItems = data;

  return {
    props: {
      data: orderItems
    }
  };
};

export default function Cart({ data }: OrderItems) {
  const [orderItems, setOrderItems] = useState<OrderItem[]>(data);

  useEffect(() => {
    setOrderItems(data);
  }, [data]);
  console.log("orderItems :", orderItems);

  return (
    <div className={styles.container}>
      <Header />
      <h1>Cart</h1>
      {orderItems && (
        <div>
          {orderItems.map(orderItem => (
            <div key={orderItem.id}>
              <p>{orderItem.quantity}</p>
            </div>
          ))}
        </div>
      )}
      <Footer />
    </div>
  );
}
