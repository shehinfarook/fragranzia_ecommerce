import React from 'react'
import ProfileSidebar from '../../components/ProfileSidebar'
import { MdPayment } from "react-icons/md";

const PaymentMethodsPage = () => {
  return (
    <div className='flex gap-8 py-8'>
      <ProfileSidebar />
      
      <div className='flex-1'>
        <div className='rounded-2xl p-10 shadow-[0_0_0_1px_#2424243c]'>
          <h2 className='text-2xl font-semibold mb-6 text-[#00354B]'>Payment Methods</h2>
          
          <div className='space-y-4'>
            <div className='text-center py-12'>
              <div className='text-6xl mb-4 flex justify-center'><MdPayment /></div>
              <h3 className='text-xl font-semibold mb-2'>No payment methods saved</h3>
              <p className='text-gray-600 mb-6'>Add a payment method for faster checkout</p>
              <button className='bg-[#00354B] text-white px-6 py-2 rounded-full hover:bg-[#004a66] transition-colors'>
                Add Payment Method
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PaymentMethodsPage