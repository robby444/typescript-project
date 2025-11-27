"use strict";
// Створення типів товарів
Object.defineProperty(exports, "__esModule", { value: true });
// Функції для пошуку товарів
/**
 * Знаходить товар за id
 * @param products Масив товарів типу T
 * @param id Id товару
 * @returns Товар або undefined, якщо не знайдено
 */
const findProduct = (products, id) => {
    return products.find((p) => p.id === id);
};
/**
 * Фільтрує товари за максимальною ціною
 * @param products Масив товарів типу T
 * @param maxPrice Максимальна ціна
 * @returns Масив товарів з ціною <= maxPrice
 */
const filterByPrice = (products, maxPrice) => {
    return products.filter((p) => p.price <= maxPrice);
};
/**
 * Додає товар до кошика
 * @param cart Масив елементів кошика
 * @param product Товар
 * @param quantity Кількість
 * @returns Новий масив кошика
 */
const addToCart = (cart, product, quantity) => {
    if (!product)
        return cart; // перевірка на undefined
    const existing = cart.find((item) => item.product.id === product.id);
    if (existing) {
        existing.quantity += quantity;
        return [...cart];
    }
    return [...cart, { product, quantity }];
};
/**
 * Підраховує загальну вартість кошика
 * @param cart Масив елементів кошика
 * @returns Сума вартості
 */
const calculateTotal = (cart) => {
    return cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
};
// Тестові дані та використання
const electronics = [
    { id: 1, name: "Телефон", price: 10000, category: "electronics", warrantyMonths: 24 },
    { id: 2, name: "Ноутбук", price: 35000, category: "electronics", warrantyMonths: 12 },
];
const clothes = [
    { id: 3, name: "Футболка", price: 500, category: "clothing", size: "M", material: "cotton" },
    { id: 4, name: "Джинси", price: 1200, category: "clothing", size: "L", material: "denim" },
];
const books = [
    { id: 5, name: "TypeScript Handbook", price: 800, category: "books", author: "TS Team", pages: 250 },
];
// Знаходимо продукт
const phone = findProduct(electronics, 1);
// Створюємо кошик та додаємо товари
let cart = [];
cart = addToCart(cart, phone, 1);
cart = addToCart(cart, findProduct(clothes, 3), 2);
cart = addToCart(cart, findProduct(books, 5), 1);
// Підрахунок загальної вартості
const total = calculateTotal(cart);
console.log("Кошик:", cart);
console.log("Загальна сума:", total);
// Фільтрація товарів за ціною
const affordableElectronics = filterByPrice(electronics, 20000);
console.log("Доступна електроніка до 20000:", affordableElectronics);
//# sourceMappingURL=index.js.map