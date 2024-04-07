'use client';
import { GithubIcon } from '@/components/icons';
import { useContext, useEffect } from 'react';
import { AuthContext } from '@/context/auth-provider';
import { useRouter } from 'next/navigation';
import { NextPage } from 'next';

export default function Home() {
  return (
    <section className='flex flex-col items-center justify-center gap-4 py-8 md:py-10'>
      <h1 className='text-3xl font-bold text-center'>Welcome to GTUVend</h1>
      <p className='text-center text-gray-500'>
        GTUVend is a vending machine project developed by Yusuf Arslan.
      </p>
    </section>
  );
}
