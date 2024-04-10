export const VendingMachineLayout = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <>
      <div className='flex flex-col items-center justify-center gap-4 py-8'>
        <div className='max-w-xl w-full gap-4 flex flex-col'>{children}</div>
      </div>
    </>
  );
};
