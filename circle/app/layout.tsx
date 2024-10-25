// app/layout.tsx

import './globals.css';
import { ReactNode } from 'react';
import { AuthProvider } from '../providers/AuthProvider';
import NavBar from '@/components/NavBar';

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <NavBar />
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
