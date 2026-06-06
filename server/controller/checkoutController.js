const Product = require('../models/Product')
const Order = require('../models/Order')
const razorpay = require("../utils/razorpay.js"); // Import Razorpay instance


exports.checkout = async (req, res) => {

  try {

    const { items, address, paymentMethod = "UPI", currency = "INR" } = req.body

    log("Checkout Request Body: ", req.body);

    for (const item of items) {

      const product = await Product.findById(item._id)

      if (!product) {
        return res.status(404).json({
          message: "Product not found"
        })
      }

      if (product.stock < item.quantity) {
        return res.status(400).json({
          message: `${product.title} out of stock`
        })
      }
    }

    for (const item of items) {

      await Product.findByIdAndUpdate(
        item._id,
        {
          $inc: {
            stock: -item.quantity
          }
        }
      )
    }

    const order = await Order.create({
      items,
      address
    })

let razorpayOrder = null;
        if (paymentMethod !== "COD") {
          const options = {
            // amount: totalAmount * 100, // in paise
            amount: 500 * 100, // in paise
            currency,
            receipt: `receipt_${order._id}`,
          };
    
    
          razorpayOrder = await razorpay.orders.create(options);
    
    
          if (!razorpayOrder) {
            return res
              .status(500)
              .json({ message: "Razorpay order creation failed" });
          }
    
          // Save razorpay ID to all orders
    
        }

    res.json({
      success: true,
      order,
      razorpayOrder: razorpayOrder || null,
      paymentMethod
    })

  } catch (error) {

    res.status(500).json({
      message: error.message
    })
  }
}