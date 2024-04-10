import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '404 - Not Found',
};

export default function NotFoundLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  return (
    <section>
      {/* Include shared UI here e.g. a header or sidebar */}
      {children}
    </section>
  );
}
