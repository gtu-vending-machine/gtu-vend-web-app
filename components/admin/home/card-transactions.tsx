import { Avatar, Card, CardBody } from '@nextui-org/react';
import React from 'react';

const items = [
  {
    name: 'Jose Perez',
    picture: 'https://i.pravatar.cc/150?u=a042581f4e29026024d',
    amount: '4500 USD',
    date: '9/20/2021',
  },
  {
    name: 'Jose Perez',
    picture: 'https://i.pravatar.cc/150?u=a042581f4e29026024d',
    amount: '4500 USD',
    date: '9/20/2021',
  },
  {
    name: 'Jose Perez',
    picture: 'https://i.pravatar.cc/150?u=a042581f4e29026024d',
    amount: '4500 USD',
    date: '9/20/2021',
  },
  {
    name: 'Jose Perez',
    picture: 'https://i.pravatar.cc/150?u=a042581f4e29026024d',
    amount: '4500 USD',
    date: '9/20/2021',
  },
  {
    name: 'Jose Perez',
    picture: 'https://i.pravatar.cc/150?u=a042581f4e29026024d',
    amount: '4500 USD',
    date: '9/20/2021',
  },
];

export const CardTransactions = () => {
  return (
    <div className='flex flex-col justify-center w-full py-5 px-4 lg:px-0  max-w-[90rem] mx-auto gap-3'>
      <div className='flex'>
        <h3 className='text-center text-xl font-semibold'>Last Transactions</h3>
      </div>
      <Card className='rounded-xl px-3'>
        <CardBody className='py-5 gap-4'>
          <div className='flex flex-col gap-6 '>
            {items.map((item) => (
              <div key={item.name} className='grid grid-cols-4 w-full'>
                <div className='w-full'>
                  <Avatar
                    isBordered
                    color='secondary'
                    src='https://i.pravatar.cc/150?u=a042581f4e29026024d'
                  />
                </div>

                <span className='text-default-900  font-semibold'>
                  {item.name}
                </span>
                <div>
                  <span className='text-success text-xs'>{item.amount}</span>
                </div>
                <div>
                  <span className='text-default-500 text-xs'>{item.date}</span>
                </div>
              </div>
            ))}
          </div>
        </CardBody>
      </Card>
    </div>
  );
};
