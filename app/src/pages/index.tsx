import { Product } from "@/type/products.type";
import { Category } from "@/type/categories.type";
import { GetStaticProps } from "next";
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import styles from "../styles/styles.module.css";

interface Home {
  dataProduct: Product[];
  dataCategory: Category[];
}

export const getStaticProps: GetStaticProps = async () => {
  const resProduct = await fetch("http://localhost:8000/api/products");
  const dataProduct = await resProduct.json();
  const resCategory = await fetch("http://localhost:8000/api/categories");
  const dataCategory = await resCategory.json();

  return {
    props: {
      dataProduct,
      dataCategory
    }
  };
};

export default function Home({ dataProduct, dataCategory }: Home) {
  const lastProducts: Product[] = dataProduct.slice(dataProduct.length - 3);
  const lastCategories: Category[] = dataCategory.slice(dataCategory.length - 3);

  return (
    <div className={styles.container}>
      <Header />
      <h1>Home</h1>
      <h2>Products</h2>
      {lastProducts.map(product => (
        <div key={product.id}>
          <h3>{product.title}</h3>
          <p>{product.price} €</p>
          <Image src={product.file} width={200} height={200} alt={product.title} />
        </div>
      ))}
      <Link href={"/products"}>
        <button>voir tout les produits</button>
      </Link>
      <br />
      <h2>Categories</h2>
      {lastCategories.map(category => (
        <div key={category.id}>
          <h3>{category.title}</h3>
        </div>
      ))}
      <Link href={"/categories"}>
        <button>voir toutes les catégories</button>
      </Link>
      <Footer />
    </div>
  );
}
