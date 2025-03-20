// Lösung für Übung 2
// Definiere den Produkt-Typ
type Product = {
  id: number;
  name: string;
  price: number;
  category: string;
  inStock: boolean;
  tags?: string[]; // the '?' tells typescript, that the tags are optional
};

// Erstelle ein Array von Produkten
const products: Product[] = [
  {
    id: 1,
    name: "Laptop",
    price: 999.99,
    category: "Elektronik",
    inStock: true,
    tags: ["computer", "gadget", "arbeit"],
  },
  {
    id: 2,
    name: "Laufschuhe",
    price: 89.99,
    category: "Sport",
    inStock: true,
  },
  {
    id: 3,
    name: "Kaffeemaschine",
    price: 49.99,
    category: "Küche",
    inStock: false,
    tags: ["gerät", "morgen"],
  },
  {
    id: 4,
    name: "Kopfhörer",
    price: 159.99,
    category: "Elektronik",
    inStock: true,
    tags: ["audio", "gadget"],
  },
];

// Funktion zum Filtern von Produkten nach Kategorie
function filterByCategory(products: Product[], category: string): Product[] {
  return products.filter((product) => product.category === category);
}

// Teste die Funktion
const elektronikProdukte = filterByCategory(products, "Wasser");
console.log(elektronikProdukte);
// Sollte die Laptop- und Kopfhörer-Objekte ausgeben
