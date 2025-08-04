// app/layout.jsx
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Toaster} from 'react-hot-toast';
import '@/app/globals.css';

export const metadata = {
  title: 'My App',
  description: 'This is a sample Next.js App',
};


export default function RootLayout({ children }) {
  return (
      <html lang="en">
      <body>
      <Toaster position="top-right" />
      <header>
          <Header />
      </header>

      <main>{children}</main>
      <footer>
          <Footer />
      </footer>

      </body>
      </html>
  );
}
