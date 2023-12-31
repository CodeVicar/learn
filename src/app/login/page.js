'use client';
import React, { useContext, useState } from 'react';
import axios from 'axios';
import Cookies from 'universal-cookie';
import { useRouter } from 'next/navigation';
import {
  Button,
  Input,
  PasswordInput,
  Card,
  Image,
  Group,
  Text,
  Badge,
  Modal,
  TextInput,
  Stack,
  LoadingOverlay,
} from '@mantine/core';
import { IconAt, IconMailFilled } from '@tabler/icons-react';
import { useForm } from '@mantine/form';
import { PeslacContext } from '@/contexts/PeslacContext';

// Set withCredentials to true for all requests
// axios.defaults.withCredentials = true;
const page = () => {
  const ctx = useContext(PeslacContext);
  const cookies = new Cookies();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    ctx.setIsLoading(true);
    const user_email = email;
    const user_password = password;
    try {
      const res = await axios.post(
        process.env.NEXT_PUBLIC_API_URL + '/auth/login',
        {
          email: user_email,
          password: user_password,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      if (res.status === 200) {
        const data = await res.data;
        ctx.login(data);
        if (!data) {
          setError('Wrong email or password');
          return;
        }
        cookies.set('accessToken', data.accessToken, {
          path: '/',
          sameSite: 'none',
          secure: true,
          session: false,
          expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 2),
        });
      }
    } catch (error) {
      setError('Wrong email or password');
      setLoading(false);
      ctx.setIsLoading(false);
    }
  };
  return (
    <Modal
      opened={true}
      // title='Sign in to your account'
      withCloseButton={false}
      centered
      closeOnEscape={false}
      closeOnClickOutside={false}
      overlayProps={{
        backgroundOpacity: 0.55,
        blur: 3,
      }}
    >
      {/* <LoadingOverlay
        visible={loading}
        zIndex={1000}
        overlayProps={{ radius: 'sm', blur: 2 }}
      /> */}
      <Stack gap='xl'>
        <div>
          <div className='flex justify-center items-center'>
            {/* <Image className='w-8 h-8 mr-2' src='/wareflow_logo.svg' alt='logo' /> */}
            <h2 className='text-md font-bold'>WareFlow</h2>
          </div>
          <p className='text-md font-bold text-center'>
            Sign in to your account
          </p>
        </div>
        <form onSubmit={handleSubmit}>
          <div className='flex flex-col gap-6'>
            <TextInput
              size='md'
              label='Email'
              withAsterisk
              placeholder='Enter your email'
              value={email}
              onChange={(e) => setEmail(e.currentTarget.value)}
              rightSection={<IconMailFilled />}
              error={error}
              type='email'
            />
            <PasswordInput
              size='md'
              label='Password'
              withAsterisk
              placeholder='Enter your password'
              value={password}
              onChange={(e) => setPassword(e.currentTarget.value)}
              error={error}
              type='password'
            />
            <Button
              disabled={loading || !email || !password}
              type='submit'
              variant='filled'
              color='rgba(1, 99, 72, 1)'
              fullWidth
              onClick={handleSubmit}
              loading={loading}
            >
              Sign in
            </Button>
          </div>
        </form>
        <p className='text-xs text-center'>
          Please ensure that your login credentials are kept confidential and do
          not share them with others. Unauthorized use of this system is
          prohibited and may be subject to legal action.
        </p>
      </Stack>
    </Modal>
  );
};

export default page;
