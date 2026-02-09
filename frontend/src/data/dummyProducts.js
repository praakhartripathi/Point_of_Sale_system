const categories = ["Shirt", "Watch", "Saree", "Jeans", "Shoes", "Accessories", "Electronics", "Home", "Beauty", "Toys"];

const images = [
    "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=300&q=80",
    "https://images.unsplash.com/photo-1524592094714-0f0654e20314?auto=format&fit=crop&w=300&q=80",
    "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=300&q=80",
    "https://images.unsplash.com/photo-1542272617-08f08630329f?auto=format&fit=crop&w=300&q=80",
    "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=300&q=80",
    "https://images.unsplash.com/photo-1627123424574-181ce5171c98?auto=format&fit=crop&w=300&q=80",
    "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=300&q=80",
    "https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&w=300&q=80"
];

const dummyProducts = Array.from({length: 2000}, (_, i) => ({
    id: i + 1,
    name: `Product Item ${i + 1}`,
    category: categories[Math.floor(Math.random() * categories.length)],
    price: Math.floor(Math.random() * 4900) + 100, // Random price between 100 and 5000
    image: images[i % images.length],
    sku: `SKU-${(i + 1).toString().padStart(5, '0')}`
}));

export default dummyProducts;
