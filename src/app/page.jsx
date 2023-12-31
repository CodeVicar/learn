'use client'
import { ColorSchemeToggle } from '@/components/ColorSchemeToggle/ColorSchemeToggle'
import { PeslacContext } from '@/contexts/PeslacContext'
import React from 'react'

const page = () => {
  const ctx = React.useContext(PeslacContext)
  return (
    <div>
      <button onClick={() => {
        ctx.login({
          username: 'admin',
          refresh_token: 'refresh_token_test',
        })
      
      }}>
        Login
      </button>
    </div>
  )
}

export default page