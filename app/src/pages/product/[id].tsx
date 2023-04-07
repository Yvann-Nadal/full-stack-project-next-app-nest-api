import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { Product } from "@/type/products.type";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import styles from "../../styles/styles.module.css";
import { GetStaticProps } from "next";
import Link from "next/link";
import { OrderItem } from "@/type/orderItems.type";

export const getStaticProps: GetStaticProps = async () => {
  const res = await fetch("http://localhost:8000/api/products");
  const data = await res.json();

  return {
    props: {
      data
    }
  };
};

export async function getStaticPaths() {
  const res = await fetch("http://localhost:8000/api/products");
  const data = await res.json();

  const paths = data.map((product: Product) => ({
    params: { id: product.id.toString() }
  }));

  return { paths, fallback: false };
}

export default function ProductDetails() {
  const { id } = useRouter().query;
  const [product, setProduct] = useState<Product | null>(null);
  const [orderItem, setOrderItem] = useState<OrderItem | null>(null);

  useEffect(() => {
    if (id) {
      fetch(`http://localhost:8000/api/products/${id}`)
        .then(res => res.json())
        .then(data => setProduct(data));
    }
  }, [id]);

  const fetchOrderItems = async () => {
    const res = await fetch("http://localhost:8000/api/orderItems");
    const data = await res.json();
    console.log("data :", data);
  };

  const AddToCart = () => {
    fetch("http://localhost:8000/api/orderItems", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        product: product,
        quantity: 1
      })
    })
      .then(res => res.json())
      .then(data => setOrderItem(data));
  };

  fetchOrderItems();

  console.log("orderItem :", orderItem);

  return (
    <div className={styles.container}>
      <Header />
      <div className={styles.body}>
        <h1>Product Details</h1>

        {product && (
          <div>
            <h2>{product.title}</h2>
            <p>{product.price} €</p>
            <Image src={product.file} width={200} height={200} alt={product.title} />
            <Link href={"/cart"}>
              <button onClick={() => AddToCart()}>add to cart</button>
            </Link>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}
