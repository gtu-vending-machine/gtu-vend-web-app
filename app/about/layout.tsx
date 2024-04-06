export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className='flex flex-col items-center gap-4'>{children}</section>
  );
}
