'use client'
import React, { useContext, useEffect, useState } from 'react'
import { Button, Modal, Stack, Table, TextInput } from '@mantine/core';
import { PeslacContext } from '@/contexts/PeslacContext';
import { useRouter } from 'next/navigation';
import UpdateModal from './UpdatedModal';

const UserTable = ({elements, token}) => {
    const router = useRouter();
    const ctx = useContext(PeslacContext);
    // console.log(ctx.user?.user.roles)
    const [canEdit, setCanEdit] = useState(false)
    const [selectedUser, setSelectedUser] = useState(null)
    const [updateError, setUpdateError] = useState(null)
    
    useEffect(() => {
      // Check if ctx.user and ctx.user.user are defined before accessing roles
      if (ctx.user && ctx.user.user && (ctx.user.user.roles.includes('Admin') || ctx.user.user.roles.includes('SuperAdmin'))) {
          setCanEdit(true);
      } else {
          setCanEdit(false);
      }
  }, [ctx.user]);
  

    const rows = elements.map((element) => (
        <Table.Tr onClick={
            () => {
                setSelectedUser(element)
            }
        
        } key={element._id}>
          <Table.Td>{element.firstName}</Table.Td>
          <Table.Td>{element.lastName}</Table.Td>
          <Table.Td>{element.email}</Table.Td>
          <Table.Td>{element.phoneNumber}</Table.Td>
          <Table.Td>{element.active ? 'Yes' : 'No'}</Table.Td>
        </Table.Tr>
      ));

      const updateUser = async (user) => {
        const userID = await selectedUser._id;
        try {
            const response = await fetch(
                process.env.NEXT_PUBLIC_API_URL + `/user/${userID}`,
                {
                  method: 'PUT',
                  headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                  },
                    body: JSON.stringify(user), 
                  credentials: 'include', // Include credentials (cookies) with the request
                }
              );
                const data = await response.json();
                console.log(data)
                if(data) {
                    setSelectedUser(null)
                }
        } catch (error) {
            console.log(error)
            setUpdateError(error)
        } finally {
            ctx.setIsLoading(false)
            router.replace('/users')
        }
      }
      const selectedNull = () => {
        setSelectedUser(null)
      }
  return (
<div>
{selectedUser && (
    <UpdateModal user={selectedUser} canEdit={canEdit} updateUser={updateUser} selectedNull={selectedNull}/>
)}
    <Table stickyHeader stickyHeaderOffset={60} striped highlightOnHover withTableBorder
    className='cursor-pointer'
    >
      <Table.Thead>
        <Table.Tr>
          <Table.Th>First Name</Table.Th>
          <Table.Th>Last Name</Table.Th>
          <Table.Th>Email</Table.Th>
          <Table.Th>Phone Number</Table.Th>
          <Table.Th>Active</Table.Th>
          
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>{rows}</Table.Tbody>
    </Table>
</div>

  )
}

export default UserTable