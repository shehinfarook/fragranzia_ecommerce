import React, { useEffect, useState } from 'react'
import { assets } from '../../assets/assets'
import { IoPerson } from "react-icons/io5";
import ProfileSidebar from '../../components/ProfileSidebar';
import { UserContext } from '../../context/UserContext';
import { useContext } from 'react';


const ProfilePage = () => {
  const {user} = useContext(UserContext)
  const [editing, setEditing] = useState(false)
  // const [form, setForm] = useState(initial)
  const [form, setForm] = useState(null)
  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  useEffect(() => {
if(user) {
  setForm({
    name: user.name || '',
    email: user.email || '',
    phone: user.phone || '',
    dob: user.dob || '',
    gender: user.gender || ''
  });
}
}, [user])
if (!form)
  return <p>Loading profile...</p>


  return (
    <div className='flex gap-8 py-8'>
      <ProfileSidebar />
      
      <div className='flex-1'>
        <h1 className='text-3xl font-bold mb-2'>Profile</h1>
        <p className='text-sm text-gray-500 mb-6'>Home › Profile</p>

        <div className='flex items-center gap-4 mb-6'>
          <button className={`px-6 py-2 rounded-lg ${!editing ? 'bg-[#063b46] text-white' : 'bg-white border'}`} onClick={() => setEditing(false)}>Profile</button>
          <a href='/profile/address' className='px-6 py-2 rounded-lg bg-white border'>Address</a>
          <a href='/profile/orders' className='px-6 py-2 rounded-lg bg-white border'>My Orders</a>
        </div>

        <div className='rounded-2xl p-8 shadow-[0_0_0_1px_#2424243c]'>
          <div className='flex gap-6 items-center'>
            <div className='w-24 h-24 rounded-full bg-gray-100 flex items-center justify-center shadow-[0_0_0_1px_#2424243c]'>
              <IoPerson className='text-2xl text-gray-500' />
            </div>

            <div className='flex-1'>
              <div className='flex items-center gap-3'>
                <h2 className='text-xl font-semibold'>{form.name}</h2>
                <p>{form.email}</p>
                <img src={assets.editIcon} alt="edit" className='w-6 h-6' />
              </div>
              <p className='text-gray-500 mt-2'>{form.email}</p>
            </div>

            <div>
              {!editing ? (
                <button className='px-6 py-2 border rounded-lg text-[#063b46]' onClick={() => setEditing(true)}>Edit</button>
              ) : (
                <div className='flex gap-2'>
                  <button className='px-4 py-2 bg-[#063b46] text-white rounded-lg' onClick={() => setEditing(false)}>Save</button>
                  <button className='px-4 py-2 border rounded-lg' onClick={() => { setForm(initial); setEditing(false); }}>Cancel</button>
                </div>
              )}
            </div>
          </div>

          <form className='grid grid-cols-3 gap-6 mt-8'>
            <div>
              <label className='block text-sm font-medium text-gray-700'>Full Name</label>
              <input name='name' value={form.name} onChange={handleChange} disabled={!editing} className='mt-2 w-full rounded-lg p-3 bg-gray-100 disabled:opacity-80' />
            </div>

            <div>
              <label className='block text-sm font-medium text-gray-700'>Email</label>
              <input name='email' value={form.email} onChange={handleChange} disabled className='mt-2 w-full rounded-lg p-3 bg-gray-100' />
            </div>

            <div>
              <label className='block text-sm font-medium text-gray-700'>Phone Number</label>
              <input name='phone' value={form.phone} onChange={handleChange} disabled={!editing} className='mt-2 w-full rounded-lg p-3 bg-gray-100 disabled:opacity-80' />
            </div>

            <div>
              <label className='block text-sm font-medium text-gray-700'>Date of Birth</label>
              <input name='dob' value={form.dob} onChange={handleChange} disabled={!editing} type='date' className='mt-2 w-full rounded-lg p-3 bg-gray-100 disabled:opacity-80' />
            </div>

            <div>
              <label className='block text-sm font-medium text-gray-700'>Gender</label>
              <input name='gender' value={form.gender} onChange={handleChange} disabled={!editing} className='mt-2 w-full rounded-lg p-3 bg-gray-100 disabled:opacity-80' />
            </div>

            <div>
              <label className='block text-sm font-medium text-gray-700'>Password</label>
              <input name='password' value={form.password} onChange={handleChange} disabled={!editing} type='password' className='mt-2 w-full rounded-lg p-3 bg-gray-100 disabled:opacity-80' />
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default ProfilePage
