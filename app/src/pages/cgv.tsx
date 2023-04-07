import Header from "@/components/Header";
import styles from "../styles/styles.module.css";
import Footer from "@/components/Footer";

export default function Cgv() {
  return (
    <div className={styles.container}>
      <Header />
      <h1>Conditions générales de vente</h1>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed tincidunt, nisl eget aliquam
        tincidunt, nisl nisl aliquam nisl, et lacinia nisl nisl eget nisl. Donec euismod, nisl eget
        aliquam tincidunt, nisl nisl aliquam nisl, et lacinia nisl nisl eget nisl. Donec euismod,
        nisl eget aliquam tincidunt, nisl nisl aliquam nisl, et lacinia nisl nisl eget nisl. Donec
        euismod, nisl eget aliquam tincidunt, nisl nisl aliquam nisl, et lacinia nisl nisl eget
        nisl. Donec euismod, nisl eget aliquam tincidunt, nisl nisl aliquam nisl, et lacinia nisl
        nisl eget nisl. Donec euismod, nisl eget aliquam tincidunt, nisl nisl aliquam nisl, et
        lacinia nisl nisl eget nisl.
      </p>
      <Footer />
    </div>
  );
}
