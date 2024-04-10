import { Spinner } from '@nextui-org/react';

const LoadingFull: React.FC = () => {
  return (
    <div className='flex justify-center items-center min-h-full'>
      <Spinner size='lg' />
    </div>
  );
};

export default LoadingFull;
