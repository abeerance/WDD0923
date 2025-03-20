type BookGenre = "fiction" | "non-fiction" | "science" | "fantasy";

export interface Book {
  id: string;
  title: string;
  author: string;
  year: number;
  genre: BookGenre;
  price: number;
  inStock: boolean;
}

export type Inventory = Book[];
