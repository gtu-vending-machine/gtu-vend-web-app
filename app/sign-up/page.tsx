'use client';

import { EyeFilledIcon, EyeSlashFilledIcon, Logo } from '@/components/icons';
import { AuthContext } from '@/context/auth-provider';
import { Message } from '@/types';
import { UserCredentials } from '@/types/user';
import { Button, Card, Input, Link } from '@nextui-org/react';
import { useContext, useState } from 'react';

export default function SignUpPage() {
  const { signUp } = useContext(AuthContext);

  // password visibility
  const [isVisible, setIsVisible] = useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);

  const [userCridentials, setUserCredentials] = useState<UserCredentials>({
    name: '',
    username: '',
    password: '',
  });

  return (
    <section className='flex flex-col items-center justify-center w-full gap-4 py-8 md:py-1'>
      <Logo />
      <Card className='w-full md:w-96 p-4 gap-5 flex flex-col items-center justify-center '>
        <h1 className='text-lg mb-3'>Sign-Up</h1>
        <Input
          name='username'
          value={userCridentials.username}
          onChange={(e) =>
            setUserCredentials({ ...userCridentials, username: e.target.value })
          }
          label='Username'
          isRequired
        />
        <Input
          name='name'
          value={userCridentials.name}
          onChange={(e) =>
            setUserCredentials({ ...userCridentials, name: e.target.value })
          }
          label='Name'
          isRequired
        />

        <Input
          name='password'
          value={userCridentials.password}
          onChange={(e) =>
            setUserCredentials({ ...userCridentials, password: e.target.value })
          }
          label='Password'
          type={isVisible ? 'text' : 'password'}
          isRequired
          endContent={
            <button
              className='focus:outline-none'
              type='button'
              onClick={toggleVisibility}
            >
              {isVisible ? (
                <EyeSlashFilledIcon className='text-2xl text-default-400 pointer-events-none' />
              ) : (
                <EyeFilledIcon className='text-2xl text-default-400 pointer-events-none' />
              )}
            </button>
          }
        />

        <div className='w-full flex flex-col mt-1 gap-3'>
          <div className='w-full flex gap-1 items-center'>
            <p className='text-sm text-default-500'>Already have an account?</p>
            <Link href='/login' className='text-sm text-primary-500'>
              Login
            </Link>
          </div>
          <Button
            onClick={() => signUp(userCridentials)}
            // primary
            type='submit'
            color='primary'
          >
            Sign
          </Button>
        </div>
      </Card>
    </section>
  );
}
