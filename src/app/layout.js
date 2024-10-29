// src/app/layout.js

import './globals.css';

export const metadata = {
  title: 'Multiplication Practice',
  description: 'Fun multiplication practice app for kids',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}