require('dotenv').config();
const mongoose = require('mongoose');
const Category = require('./model/Category');
const Product = require('./model/Product');

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/fragranzia';

const categoryNames = ['featured', 'concentrated', 'combo'];

const BASE = 'http://localhost:5000/images';

const staticProducts = [
  {
    title: 'Autograph eau de parfum 100ml for men',
    price: 980, offerPrice: 879, category: 'featured', brand: 'Autograph',
    rating: 4.5, ratingCount: 1000,
    image: [`${BASE}/products/37dcb4eb242b0abd5729f79a8ed1bd6e8d1fa0e6.png`]
  },
  {
    title: 'Aurum Non-Alcoholic Attar 10ML for Women',
    price: 975, offerPrice: 780, category: 'concentrated', brand: 'Aurum',
    rating: 5, ratingCount: 789,
    image: [`${BASE}/products/db814c4ab5fa981813151d5f7feb813108479799.png`]
  },
  {
    title: 'Facin8 Eau De Parfum 100ml for Men',
    price: 980, offerPrice: 879, brand: 'Facin8',
    rating: 3.9, ratingCount: 655,
    image: [`${BASE}/products/4b98715dae7c344c65a0842e7a031d6561f369f7.png`]
  },
  {
    title: 'Ajmal Oud of Dubai Perfume for Men',
    price: 1099, offerPrice: 899, category: 'featured', brand: 'Ajmal Oud',
    rating: 5, ratingCount: 1213,
    image: [`${BASE}/products/c89818398a15db0798bc360f86f19e117b080035.jpg`]
  },
  {
    title: 'Silent Storm Parfum 100ml for Men',
    price: 2200, offerPrice: 1100, brand: 'Silent Storm',
    rating: 5, ratingCount: 4720,
    image: [`${BASE}/products/debc9b84cdb56d1593c4be4c332cd417e48d7206.png`]
  },
  {
    title: 'Kyros Eau De Parfum 100ml for Men',
    price: 980, offerPrice: 879,
    image: [`${BASE}/products/7bbfcc07ec3feb88aa39baff652085e82d06fe85.png`]
  },
  {
    title: 'Royal Oud Kuwaiti Non-Alcoholic Attar 10ML for Unisex',
    price: 1299, offerPrice: 999, category: 'featured', brand: 'Royal',
    rating: 4.4, ratingCount: 476,
    image: [`${BASE}/products/f8b3ea99a1a55ebc45b0789ba23a53d5eec70489.jpg`]
  },
  {
    title: 'Song of Oud Parfum 75ML for Men & Women',
    price: 9999, offerPrice: 7999, brand: 'Song',
    rating: 5, ratingCount: 55,
    image: [`${BASE}/products/8b221d36b69717e337d9b79f24354c56b4d5085b.jpg`]
  },
  {
    title: 'Nereus Eau De Parfum premium 150ml for Men',
    price: 1099, offerPrice: 899, category: 'featured', brand: 'Nereus',
    rating: 4.3, ratingCount: 852,
    image: [`${BASE}/products/7f66626667f837d0fb57dec38cef1d75653b299e.jpg`]
  },
  {
    title: 'Kyros Eau De Parfum 100ml for Men',
    price: 980, offerPrice: 879, category: 'combo',
    image: [`${BASE}/products/7e34e519fe555365cfd7fce4cf264fcd42f18236.png`]
  },
  {
    title: 'Kyros Eau De Parfum premium 150ml for Men',
    price: 1499, offerPrice: 1249, category: 'featured', brand: 'Kyros',
    rating: 4.8, ratingCount: 911,
    image: [`${BASE}/products/762231193059d13b94ccbb795aefbfa83ab144b5.jpg`]
  },
  {
    title: 'Kyros Eau De Parfum 100ml for Men',
    price: 980, offerPrice: 879,
    image: [`${BASE}/products/5a59d0411273b847b8af9755751370ea3f08ac3b.png`]
  },
  {
    title: 'Pachouli-Haze Perfume 100ml for Men & Women',
    price: 899, offerPrice: 499, category: 'featured', brand: 'Pachouli-Haze',
    rating: 4.8, ratingCount: 911,
    image: [`${BASE}/products/productEightTeen.webp`]
  },
  {
    title: 'Ahlam perfume premium 100ml for Men',
    price: 3000, offerPrice: 1500, category: 'featured', brand: 'Ahlam',
    rating: 4.8, ratingCount: 911,
    image: [`${BASE}/products/productSevenTeen.webp`]
  },
  {
    title: 'Aurum Winter Perfume 75ML for Women',
    price: 4000, offerPrice: 3200, brand: 'Aurum Winter',
    rating: 4.8,
    image: [`${BASE}/products/productNineTeen.webp`]
  },
];

async function seed() {
  await mongoose.connect(MONGODB_URI);
  console.log('Connected to MongoDB');

  await Category.deleteMany({});
  await Product.deleteMany({});
  console.log('Cleared existing data');

  const categoryDocs = await Category.insertMany(
    categoryNames.map(name => ({ name }))
  );
  const categoryMap = {};
  categoryDocs.forEach(cat => { categoryMap[cat.name] = cat._id; });
  console.log('Categories created:', Object.keys(categoryMap));

  const productsToInsert = staticProducts.map(p => ({
    title: p.title,
    price: p.price,
    offerPrice: p.offerPrice,
    brand: p.brand,
    rating: p.rating,
    ratingCount: p.ratingCount,
    image: p.image,
    stock: 100,
    category: p.category ? categoryMap[p.category] : categoryMap['featured'],
  }));

  await Product.insertMany(productsToInsert);
  console.log(`Inserted ${productsToInsert.length} products`);

  await mongoose.disconnect();
  console.log('Done!');
}

seed().catch(err => { console.error(err); process.exit(1); });
