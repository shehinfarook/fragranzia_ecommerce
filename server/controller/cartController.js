const Cart = require("../model/Cart");
const Order = require("../model/Order");

const findOrCreateCart = async (userId) => {
  let cart = await Cart.findOne({ user: userId });
  if (!cart) {
    cart = await Cart.create({ user: userId, items: [] });
  }
  return cart;
};

exports.getCart = async (req, res) => {
  try {
    const cart = await findOrCreateCart(req.user.id);
    res.json(cart);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

exports.addToCart = async (req, res) => {
  try {
    const { product, quantity = 1, price } = req.body;
    if (!product || !price) {
      return res.status(400).json({ msg: 'Product and price are required' });
    }

    const cart = await findOrCreateCart(req.user.id);
    const existingItem = cart.items.find(item => item.product.toString() === product.toString());

    if (existingItem) {
      existingItem.quantity = existingItem.quantity + quantity;
      existingItem.price = price;
    } else {
      cart.items.push({ product, quantity, price });
    }

    await cart.save();
    res.json(cart);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

exports.updateCartItem = async (req, res) => {
  try {
    const { quantity, price } = req.body;
    const { productId } = req.params;
    const cart = await findOrCreateCart(req.user.id);
    const item = cart.items.find(item => item.product.toString() === productId.toString());

    if (!item) {
      return res.status(404).json({ msg: 'Cart item not found' });
    }

    if (quantity <= 0) {
      cart.items = cart.items.filter(item => item.product.toString() !== productId.toString());
    } else {
      item.quantity = quantity;
      if (price !== undefined) item.price = price;
    }

    await cart.save();
    res.json(cart);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

exports.removeCartItem = async (req, res) => {
  try {
    const { productId } = req.params;
    const cart = await findOrCreateCart(req.user.id);

    cart.items = cart.items.filter(item => item.product.toString() !== productId.toString());
    await cart.save();

    res.json(cart);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

exports.checkout = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user.id });

    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ msg: 'Cart empty' });
    }

    const total = cart.items.reduce((acc, item) =>
      acc + item.price * item.quantity, 0
    );

    const address = req.body.shippingAddress || {};
    const order = await Order.create({
      user: req.user.id,
      items: cart.items.map(item => ({
        product: item.product,
        quantity: item.quantity,
        price: item.price,
      })),
      totalAmount: total,
      paymentMethod: req.body.paymentMethod || 'Cash on delivery',
      shippingAddress: {
        street: address.street,
        city: address.city,
        state: address.state,
        zipCode: address.zip,
      },
    });

    cart.items = [];
    await cart.save();

    res.json(order);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};