"use strict";
// Erstelle ein Array von Produkten
const products = [
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
function filterByCategory(products, category) {
    return products.filter((product) => product.category === category);
}
// Teste die Funktion
const elektronikProdukte = filterByCategory(products, "Wasser");
console.log(elektronikProdukte);
// Sollte die Laptop- und Kopfhörer-Objekte ausgeben
