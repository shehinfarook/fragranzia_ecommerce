import React from 'react'
import ProfileSidebar from '../../components/ProfileSidebar'

const notifications = [
  { id: 1, icon: '📦', title: 'Order Shipped', message: 'Your order #1023 has been shipped and is on its way.', time: '2 hours ago', read: false },
  { id: 2, icon: '✅', title: 'Order Delivered', message: 'Your order #1018 has been delivered successfully.', time: '1 day ago', read: false },
  { id: 3, icon: '🎁', title: 'Special Offer', message: 'Get 20% off on all fragrances this weekend only!', time: '3 days ago', read: true },
  { id: 4, icon: '🔔', title: 'Back in Stock', message: 'An item from your wishlist is back in stock.', time: '5 days ago', read: true },
]

const Notification = () => {
  return (
    <div className='flex gap-8 py-8'>
      <ProfileSidebar />

      <div className='flex-1'>
        <div className='rounded-2xl p-10 shadow-[0_0_0_1px_#2424243c]'>
          <h2 className='text-2xl font-semibold mb-6 text-[#00354B]'>Notifications</h2>

          {notifications.length === 0 ? (
            <div className='text-center py-12'>
              <div className='text-6xl mb-4'>🔔</div>
              <h3 className='text-xl font-semibold mb-2'>No notifications</h3>
              <p className='text-gray-600'>You're all caught up!</p>
            </div>
          ) : (
            <div className='space-y-3'>
              {notifications.map((n) => (
                <div
                  key={n.id}
                  className={`flex items-start gap-4 p-4 rounded-xl border transition-colors ${
                    n.read ? 'bg-white border-gray-100' : 'bg-[#f0f8fb] border-[#c8e6ef]'
                  }`}
                >
                  <div className='text-2xl mt-1'>{n.icon}</div>
                  <div className='flex-1'>
                    <div className='flex items-center justify-between'>
                      <h4 className={`font-semibold ${n.read ? 'text-gray-700' : 'text-[#00354B]'}`}>{n.title}</h4>
                      <span className='text-xs text-gray-400'>{n.time}</span>
                    </div>
                    <p className='text-sm text-gray-600 mt-1'>{n.message}</p>
                  </div>
                  {!n.read && <div className='w-2 h-2 rounded-full bg-[#00354B] mt-2 shrink-0' />}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Notification
