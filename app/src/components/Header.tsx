import Link from "next/link";
import styles from "../styles/styles.module.css";
import { OrderItem } from "@/type/orderItems.type";
import { useEffect, useState } from "react";

export default function Header() {
  const [isCartEmpty, setIsCartEmpty] = useState<boolean>(true);
  const [orderItems, setOrderItems] = useState<OrderItem[] | null>(null);

  const fetchOrderItems = async () => {
    const res = await fetch("http://localhost:8000/api/orderItems");
    const data = await res.json();
    setOrderItems(data);
    if (data.length > 0) {
      setIsCartEmpty(false);
    }
  };

  useEffect(() => {
    fetchOrderItems();
  }, []);

  return (
    <header className={styles.header}>
      <img src="/logo.png" height="100px" alt="logo" />
      <nav className={styles.navbar}>
        <ul className={styles.list}>
          <ol>
            <a href="/">Home</a>
          </ol>
          <ol>
            <a href="/products">Products</a>
          </ol>
          <ol>
            <a href="/categories">Categories</a>
          </ol>
        </ul>
      </nav>
      <Link href="/cart" className={styles.cart}>
        <img src="/cart.svg" height="50px" alt="cart" />
        {isCartEmpty ? null : <div className={styles.item}>{orderItems?.length}</div>}
      </Link>
    </header>
  );
}
