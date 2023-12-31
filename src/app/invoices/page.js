'use client';
import React, { useContext, useEffect, useState } from 'react'
import { Table } from '@mantine/core';
import UserTable from '@/components/users/UserTable'
import Cookies from 'universal-cookie';
import { PeslacContext } from '@/contexts/PeslacContext';


const elements = [
  { position: 6, mass: 12.011, symbol: 'C', name: 'Carbon' },
  { position: 7, mass: 14.007, symbol: 'N', name: 'Nitrogen' },
  { position: 39, mass: 88.906, symbol: 'Y', name: 'Yttrium' },
  { position: 56, mass: 137.33, symbol: 'Ba', name: 'Barium' },
  { position: 58, mass: 140.12, symbol: 'Ce', name: 'Cerium' },
];

const page = () => {
const ctx = useContext(PeslacContext);
  const cookies = new Cookies();
  const wareflow_access_token = cookies.get('accessToken');
  const [users, setUsers] = useState([])
// console.log(users)
    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const usersData = await fetch(
                    process.env.NEXT_PUBLIC_API_URL + '/user/all',
                    {
                      method: 'GET',
                      headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${wareflow_access_token}`,
                      },
                      credentials: 'include', // Include credentials (cookies) with the request
                    }
                  );
                  const data = await usersData.json();
                  setUsers(data.users)
            } catch (error) {
                setUsers([])
            }
        }
        fetchUserData();
    }, [])
  return (
    <div>
        <h2 className='text-2xl font-bold mb-10 mt-4'>
            Total {users.length} users
        </h2>
        <UserTable elements={users} token={wareflow_access_token} />
    </div>
  )
}

export default page