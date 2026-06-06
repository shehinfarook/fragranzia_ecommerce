import React, { useContext, useEffect } from 'react'
import { AppContext } from '../../context/AppContext'
import "./Customer.css"

const Customers = () => {

  const { allUsers, fetchAllUsers } = useContext(AppContext);

  useEffect(() => {
    fetchAllUsers()
  }, [])

  return (
    <div className='customer-bg'>
      <h3><b>User List</b></h3>
      <div className='customer-table'>
        {allUsers && allUsers.length > 0 ? (
          <div className='customer-items'>
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Phone</th>
                  <th>Email</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {allUsers.map(user => (
                  <tr key={user._id}>
                    <td>{user.name}</td>
                    <td>{user.phone || 'N/A'}</td>
                    <td>{user.email}</td>
                    <td><span className='status active'>Active</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="cus-empty">No User Found</p>
        )}
      </div>
    </div>
  )
}

export default Customers