'use client';
import { GithubIcon } from '@/components/icons';
import { useContext, useEffect } from 'react';
import { AuthContext } from '@/context/authProvider';
import { useRouter } from 'next/navigation';

export default function Home() {
  return (
    <section className='flex flex-col items-center justify-center gap-4 py-8 md:py-10'></section>
  );
}
