import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import styles from "../../styles/styles.module.css";
import { Category } from "@/type/categories.type";

export default function CategoriesDetails() {
  const { id } = useRouter().query;
  const [category, setCategory] = useState<Category | null>(null);

  useEffect(() => {
    if (id) {
      fetch(`http://localhost:8000/api/categories/${id}`)
        .then(res => res.json())
        .then(data => setCategory(data));
    }
  }, [id]);

  return (
    <div className={styles.container}>
      <Header />
      <h1>Category Details</h1>
      {category && (
        <div>
          <h3>{category.title}</h3>
          <p>{category.description}</p>
          <div>
            {category.products.map(product => (
              <div key={product.id}>
                <h4>{product.title}</h4>
                <p>{product.price} €</p>
                <Image src={product.file} width={200} height={200} alt={product.title} />
              </div>
            ))}
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
}
