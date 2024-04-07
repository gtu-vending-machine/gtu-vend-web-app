'use client';

import React from 'react';
import Link from 'next/link';
import Logo from '@/components/icons/admin-logo';

interface Company {
  name: string;
  description: string;
  logo: React.ReactNode;
  href: string;
}

export const CompaniesDropdown = () => {
  const company: Company = {
    name: 'GTUVend',
    description: 'Admin Dashboard',
    logo: <Logo />,
    href: '/',
  };
  return (
    <div className='flex items-center gap-2'>
      <Link href={company.href} color='primary' className='cursor-pointer'>
        {company.logo}
      </Link>
      <div className='flex flex-col gap-4'>
        <h3 className='text-xl font-medium m-0 text-default-900 -mb-4 whitespace-nowrap'>
          {company.name}
        </h3>
        <span className='text-xs font-medium text-default-500'>
          {company.description}
        </span>
      </div>
    </div>
  );
};
