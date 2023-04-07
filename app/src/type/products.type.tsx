import { Category } from "./categories.type";

export interface Product {
  id: number;
  title: string;
  file: string;
  price: number;
  category: Category;
}
