import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../../context/UserContext'
import { assets } from '../../assets/assets'
import { useNavigate } from 'react-router-dom'
import { createRazorpayOrder, verifyRazorpayPayment, getAddresses, createOrder } from '../../services/user-api-services/UserService'
import toast from 'react-hot-toast'

const PAYMENT_METHODS = [
  { id: 'upi', label: 'UPI / Card / Net Banking (Razorpay)', icon: assets.upiIcon },
  { id: 'cod', label: 'Cash on Delivery', icon: assets.codIcon },
]

const EditAddressModal = ({ open, onClose, address, onSave }) => {
  const [form, setForm] = useState(address)
  useEffect(() => setForm(address), [address])
  if (!open) return null
  const handle = (e) => setForm({ ...form, [e.target.name]: e.target.value })
  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center'>
      <div className='absolute inset-0 bg-black opacity-30' onClick={onClose} />
      <div className='bg-white rounded-2xl p-6 max-w-2xl w-full z-10 shadow-lg'>
        <h3 className='text-lg font-semibold mb-4'>Edit Address</h3>
        <div className='grid grid-cols-2 gap-4'>
          <div>
            <label className='block text-sm text-gray-700'>Full Name</label>
            <input name='fullName' value={form.fullName} onChange={handle} className='mt-2 p-2 w-full border rounded' />
          </div>
          <div>
            <label className='block text-sm text-gray-700'>Phone Number</label>
            <input name='phone' value={form.phone} onChange={handle} className='mt-2 p-2 w-full border rounded' />
          </div>
          <div className='col-span-2'>
            <label className='block text-sm text-gray-700'>Street</label>
            <input name='street' value={form.street} onChange={handle} className='mt-2 p-2 w-full border rounded' />
          </div>
          <div>
            <label className='block text-sm text-gray-700'>City</label>
            <input name='city' value={form.city} onChange={handle} className='mt-2 p-2 w-full border rounded' />
          </div>
          <div>
            <label className='block text-sm text-gray-700'>State</label>
            <input name='state' value={form.state} onChange={handle} className='mt-2 p-2 w-full border rounded' />
          </div>
          <div>
            <label className='block text-sm text-gray-700'>Zip</label>
            <input name='zip' value={form.zip} onChange={handle} className='mt-2 p-2 w-full border rounded' />
          </div>
          <div>
            <label className='block text-sm text-gray-700'>Country</label>
            <input name='country' value={form.country} onChange={handle} className='mt-2 p-2 w-full border rounded' />
          </div>
        </div>
        <div className='flex justify-end gap-3 mt-6'>
          <button className='px-5 py-2 border rounded' onClick={onClose}>Cancel</button>
          <button className='px-5 py-2 bg-primary text-white rounded' onClick={() => { onSave(form); onClose() }}>Save</button>
        </div>
      </div>
    </div>
  )
}

const CheckoutPage = () => {
  const { products, cartItems, updateCartItem, getCartCount, checkoutCart, setCartItems } = useContext(UserContext)
  const navigate = useNavigate()
  const [cartArray, setCartArray] = useState([])
  const [editOpen, setEditOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [paymentMethod, setPaymentMethod] = useState('cod')
  const [address, setAddress] = useState({
    fullName: '', phone: '', street: '', city: '', state: '', zip: '', country: ''
  })

  useEffect(() => {
    getAddresses().then(({ data }) => {
      const def = data.find(a => a.isDefault) || data[0]
      if (def) setAddress({ fullName: def.fullName, phone: def.phone, street: def.street, city: def.city, state: def.state, zip: def.zip, country: def.country })
    }).catch(() => {})
  }, [])

  useEffect(() => {
    const temp = []
    for (const id in cartItems) {
      const product = products.find(p => p.id === id)
      if (product) temp.push({ ...product, quantity: cartItems[id] })
    }
    setCartArray(temp)
  }, [products, cartItems])

  const shippingAddress = {
    street: address.street,
    city: address.city,
    state: address.state,
    zip: address.zip,
  }

  const loadRazorpayScript = () =>
    new Promise((resolve) => {
      if (window.Razorpay) return resolve(true)
      const script = document.createElement('script')
      script.src = 'https://checkout.razorpay.com/v1/checkout.js'
      script.onload = () => resolve(true)
      script.onerror = () => resolve(false)
      document.body.appendChild(script)
    })

  const handleRazorpayPayment = async () => {
    const loaded = await loadRazorpayScript()
    if (!loaded) return toast.error('Failed to load Razorpay. Check your connection.')

    const { data } = await createRazorpayOrder({ amount: totalOffer, shippingAddress })
    const razorpayOrder = data.razorpayOrder

    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID || razorpayOrder.key_id,
      amount: razorpayOrder.amount,
      currency: razorpayOrder.currency,
      name: 'Fragranzia',
      description: 'Order Payment',
      order_id: razorpayOrder.id,
      handler: async (response) => {
        try {
          await verifyRazorpayPayment({
            razorpay_order_id: response.razorpay_order_id,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature,
            shippingAddress,
            items: cartArray.map(i => ({ product: i.id, quantity: i.quantity, price: i.offerPrice })),
            totalAmount: totalOffer,
          })
          setCartItems({})
          navigate('/order-success')
        } catch {
          toast.error('Payment verification failed')
        }
      },
      theme: { color: '#00354B' },
    }

    const rzp = new window.Razorpay(options)
    rzp.on('payment.failed', () => toast.error('Payment failed. Please try again.'))
    rzp.open()
  }

  const handlePlaceOrder = async () => {
    if (cartArray.length === 0) return
    setIsSubmitting(true)
    try {
      if (paymentMethod === 'upi') {
        await handleRazorpayPayment()
      } else {
        await createOrder({
          items: cartArray.map(i => ({ product: i.id, quantity: i.quantity, price: i.offerPrice })),
          totalAmount: totalOffer,
          paymentMethod: 'COD',
          shippingAddress
        })
        setCartItems({})
        navigate('/order-success')
      }
    } catch {
      toast.error('Something went wrong. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const totalPrice = cartArray.reduce((a, i) => a + i.price * i.quantity, 0)
  const totalOffer = cartArray.reduce((a, i) => a + i.offerPrice * i.quantity, 0)
  const discount = totalPrice - totalOffer

  return (
    <>
      <div className="p-4 md:p-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6 items-start">
          <div className="lg:col-span-2 flex flex-col gap-6">
            {cartArray.map(item => {
              const off = Math.round(((item.price - item.offerPrice) / item.price) * 100)
              return (
                <div key={item.id} className="shadow-[0_0_3px_#24242453] rounded-lg p-4 flex gap-4">
                  <img src={item.image[0]} className="w-24 h-24 object-contain" alt="" />
                  <div className="flex-1">
                    <h3 className="font-medium">{item.title}</h3>
                    <div className="flex items-center gap-2 text-sm">
                      <p>{item.rating}</p>
                      <img src={assets.ratingIcon} className="w-4 h-4" alt="" />
                    </div>
                    <div className="flex items-center gap-3 mt-2">
                      <button onClick={() => updateCartItem(item.id, item.quantity - 1)} className="border px-3">−</button>
                      <span>{item.quantity}</span>
                      <button onClick={() => updateCartItem(item.id, item.quantity + 1)} className="border px-3">+</button>
                    </div>
                    <div className="flex items-center gap-3 mt-2 text-sm">
                      <p className="font-bold">₹{item.offerPrice}</p>
                      <del className="text-[#595959]">₹{item.price}</del>
                      <span className="text-green-600">{off}% off</span>
                    </div>
                    <p className="text-green-600 text-[13px]">7 day return policy</p>
                  </div>
                </div>
              )
            })}

            <div className="p-4">
              <h3 className="font-semibold mb-3">Delivery Address</h3>
              {address.street ? (
                <div className='mt-3 flex justify-between'>
                  <div className='flex flex-col gap-1 text-sm text-gray-700'>
                    <p className='font-medium'>{address.fullName}</p>
                    <p>{address.street}, {address.city}, {address.state} - {address.zip}</p>
                    <p>{address.country} | {address.phone}</p>
                  </div>
                  <button onClick={() => setEditOpen(true)} className="text-primary underline text-sm">Edit</button>
                </div>
              ) : (
                <div className='mt-3 text-sm text-gray-500'>
                  No primary address found.
                  <a href='/profile/address' className='ml-2 text-[#00354B] underline'>Add one here</a>
                </div>
              )}
            </div>
          </div>

          <div>
            <div className="shadow-[0_0_3px_#24242453] rounded-lg p-4 h-fit">
              <h3 className="font-semibold mb-3">Price Details</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Price ({getCartCount()} items)</span>
                  <span>₹{totalPrice}</span>
                </div>
                <div className="flex justify-between">
                  <span>Discount</span>
                  <span className="text-green-600">− ₹{discount}</span>
                </div>
                <div className="flex justify-between">
                  <span>Delivery</span>
                  <span className="text-green-600">Free</span>
                </div>
                <hr />
                <div className="flex justify-between font-semibold">
                  <span>Total</span>
                  <span>₹{totalOffer}</span>
                </div>
              </div>
            </div>

            <div className="mt-5 shadow-[0_0_3px_#24242453] rounded-lg p-4 h-fit">
              <h3 className='font-semibold mb-3'>Payment Method</h3>
              {PAYMENT_METHODS.map(method => (
                <div key={method.id} onClick={() => setPaymentMethod(method.id)}
                  className={`mt-3 flex items-center justify-between p-3 rounded-lg cursor-pointer border-2 transition ${paymentMethod === method.id ? 'border-[#00354B] bg-[#00354b08]' : 'border-transparent'}`}>
                  <div className='flex gap-2 items-center'>
                    <img src={method.icon} alt="" className='w-6 h-6' />
                    <p className='text-sm'>{method.label}</p>
                  </div>
                  <div className={`w-4 h-4 rounded-full border-2 ${paymentMethod === method.id ? 'bg-[#00354B] border-[#00354B]' : 'border-gray-400'}`} />
                </div>
              ))}
            </div>

            <button
              onClick={handlePlaceOrder}
              disabled={isSubmitting || cartArray.length === 0}
              className='mt-4 w-full rounded bg-[#00354B] px-6 py-3 text-white disabled:opacity-50'
            >
              {isSubmitting ? 'Processing...' : paymentMethod === 'upi' ? 'Pay with Razorpay' : 'Place Order (COD)'}
            </button>
          </div>
        </div>
      </div>

      <EditAddressModal open={editOpen} onClose={() => setEditOpen(false)} address={address} onSave={setAddress} />
    </>
  )
}

export default CheckoutPage
