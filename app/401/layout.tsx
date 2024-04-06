import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '401 Unauthorized',
};

export default function UnauthorizedLayout({
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
