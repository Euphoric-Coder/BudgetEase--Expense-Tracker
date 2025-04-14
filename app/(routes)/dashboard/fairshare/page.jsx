import FairShare from '@/components/FairShare/Fair'
import React from 'react'

const page = () => {
  const initialFriends = [
    {
      id: "1",
      name: "John Doe",
      email: "john@example.com",
      avatar: "https://randomuser.me/api/portraits/men/1.jpg",
    },
    {
      id: "2",
      name: "Jane Smith",
      email: "jane@example.com",
      avatar: "https://randomuser.me/api/portraits/women/2.jpg",
    },
    {
      id: "3",
      name: "Mike Johnson",
      email: "mike@example.com",
      avatar: "https://randomuser.me/api/portraits/men/3.jpg",
    },
    {
      id: "4",
      name: "Emily Davis",
      email: "emily@example.com",
      avatar: "https://randomuser.me/api/portraits/women/4.jpg",
    },
    {
      id: "5",
      name: "Chris Brown",
      email: "chris@example.com",
      avatar: "https://randomuser.me/api/portraits/men/5.jpg",
    },
  ];
  
  return (
    <div>
      {/* <div className='text-center text-2xl font-bold text-gray-600 mt-10 animate-pulse'>
        This feature is still in development....
      </div> */}
      <FairShare />
    </div>
  )
}

export default page