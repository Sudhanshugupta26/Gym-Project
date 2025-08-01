// app/layout.jsx
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import 'bootstrap/dist/css/bootstrap.min.css'

export const metadata = {
  title: 'My App',
  description: 'This is a sample Next.js App',
};

export default function RootLayout({ children }) {
  return (
      <html lang="en">
      <body>
      <Header />
      <main>{children}</main>
      <Footer />
      </body>
      </html>
  );
}
