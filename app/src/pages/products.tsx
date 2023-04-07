import { GetStaticProps } from "next";
import { Product } from "@/type/products.type";
import { Category } from "@/type/categories.type";
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import styles from "../styles/styles.module.css";

interface Products {
  data: Product[];
}

export const getStaticProps: GetStaticProps = async () => {
  const res = await fetch("http://localhost:8000/api/products");
  const data = await res.json();

  return {
    props: {
      data
    }
  };
};

export default function Products({ data }: Products) {
  console.log(data);

  return (
    <div className={styles.container}>
      <Header />
      <div className={styles.body}>
        <h1>Products</h1>
        <div className={styles.cards}>
          {data.map(product => (
            <Link href={`/product/${product.id}`} key={product.id}>
              <h3>{product.title}</h3>
              <p>{product.price} €</p>
              <Image src={product.file} width={200} height={200} alt={product.title} />
              <p> {product.category.title}</p>
            </Link>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}
