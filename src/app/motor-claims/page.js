'use client';
import { PeslacContext } from '@/contexts/PeslacContext';
import { Button } from '@mantine/core';
import React, { useContext } from 'react';

const page = () => {
  const ctx = useContext(PeslacContext);
  return (
    <div>
      <h1>Motor Claims</h1>
      <Button
        onClick={() => {
          ctx.logout();
        }}
        color='red'
        variant='outline'
      >
        Log Out
      </Button>
    </div>
  );
};

export default page;
