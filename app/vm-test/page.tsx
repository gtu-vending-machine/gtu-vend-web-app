'use client';

import { ApiContext } from '@/context/api-provider';
import { Button, Input } from '@nextui-org/react';
import type { NextPage } from 'next';
import { useContext, useState } from 'react';
import toast from 'react-hot-toast';

const VMTestPage: NextPage = () => {
  const { approveTransaction } = useContext(ApiContext);
  const [code, setCode] = useState('');

  const handleApprove = async () => {
    if (!code) return;
    const data = await approveTransaction({ code });
    if (data) {
      toast.success('Transaction approved!');
    }
  };

  return (
    <div className='flex flex-col justify-center items-center gap-5 max-w-sm mx-auto'>
      <Input
        placeholder='Enter the code...'
        value={code}
        onChange={(e) => setCode(e.target.value)}
      />
      <Button onClick={handleApprove} className='w-full'>
        Approve
      </Button>
    </div>
  );
};

export default VMTestPage;
