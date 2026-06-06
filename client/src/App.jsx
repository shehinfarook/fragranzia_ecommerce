import { Route, Routes } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import Register from './pages/user/Register'
import Homepage from './pages/user/Homepage'
import ProductPage from './pages/user/ProductPage'
import AboutPage from './pages/user/AboutPage'
import Cart from './pages/user/Cart'
import Login from './pages/user/Login'
import ProductView from './pages/user/ProductView'
import PaymentPage from './pages/user/PaymentPage'
import CheckoutPage from './pages/user/CheckoutPage'
import GiftingPage from './pages/user/GiftingPage'
import Notification from './pages/user/Notification'
import ProfilePage from './pages/profilepages/ProfilePage'
import AddressPage from './pages/profilepages/AddressPage'
import WishlistPage from './pages/profilepages/WishlistPage'
import OrdersPage from './pages/profilepages/OrdersPage'
import PaymentMethodsPage from './pages/profilepages/PaymentMethodsPage'
import Navbar from './components/Navbar'
import Banner from './components/Banner'
import Footer from './components/Footer'
import AdminLayout from './admin/layout/AdminLayout'
import Dashboard from './admin/pages/Dashboard'
import ProductList from './admin/pages/products/Productlist'
import AddProduct from './admin/pages/products/AddProduct'
import Categories from './admin/pages/Categories'
import Offers from './admin/pages/Offers'
import AdminOrders from './admin/pages/Orders'
import AdminLogin from './admin/pages/AdminLogin'
import OrderSuccess from './pages/user/OrderSuccess'
import AdminProtectedRoute from './admin/Routes/AdminProtectedRoute'

const App = () => {
  return (
    <Routes>
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route path="/admin" element={<AdminProtectedRoute />}>
        <Route element={<AdminLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="products" element={<ProductList />} />
          <Route path="products/add" element={<AddProduct />} />
          <Route path="categories" element={<Categories />} />
          <Route path="offers" element={<Offers />} />
          <Route path="orders" element={<AdminOrders />} />
        </Route>
      </Route>

      <Route path="/*" element={
        <>
          <Navbar />
          <Banner />
          <Toaster position="top-center" reverseOrder={false} />
          <div className='px-6 md:px-16 lg:px-20 xl:px-32'>
            <Routes>
              <Route path="/" element={<Homepage />} />
              <Route path="/register" element={<Register />} />
              <Route path="/products" element={<ProductPage />} />
              <Route path='/products/quick/:id' element={<PaymentPage />} />
              <Route path='/products/:id' element={<ProductView />} />
              <Route path='/about' element={<AboutPage />} />
              <Route path='/gifting' element={<GiftingPage />} />
              <Route path='/cart' element={<Cart />} />
              <Route path='/checkout' element={<CheckoutPage />} />
              <Route path='/login' element={<Login />} />
              <Route path='/profile' element={<ProfilePage />} />
              <Route path='/profile/address' element={<AddressPage />} />
              <Route path='/profile/wishlist' element={<WishlistPage />} />
              <Route path='/wishlist' element={<WishlistPage />} />
              <Route path='/profile/orders' element={<OrdersPage />} />
              <Route path='/profile/payment' element={<PaymentMethodsPage />} />
              <Route path='/notifications' element={<Notification />} />
              <Route path="*" element={<h1 className='text-3xl font-bold text-center mt-20'>404 - Page Not Found</h1>} />
              <Route path="/order-success" element={<OrderSuccess />} />
            </Routes>
          </div>
          <Footer />
        </>
      } />
    </Routes>
  )
}

export default App
