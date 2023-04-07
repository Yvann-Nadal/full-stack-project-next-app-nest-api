import { GetStaticProps } from "next";
import { Product } from "@/type/products.type";
import { Category } from "@/type/categories.type";
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import styles from "../styles/styles.module.css";

interface Categories {
  data: Category[];
}

export const getStaticProps: GetStaticProps = async () => {
  const res = await fetch("http://localhost:8000/api/categories");
  const data = await res.json();

  return {
    props: {
      data
    }
  };
};

export default function Products({ data }: Categories) {
  console.log(data);

  return (
    <div className={styles.container}>
      <Header />
      <h1>Categories</h1>
      {data.map(category => (
        <Link href={`/category/${category.id}`} key={category.id}>
          <h3>{category.title}</h3>
          <p>{category.description}</p>
        </Link>
      ))}
      <Footer />
    </div>
  );
}
