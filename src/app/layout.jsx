// app/layout.jsx
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Toaster} from 'react-hot-toast';
import '@/app/globals.css';

export const metadata = {
  title: 'Gym Mate',
  description: 'The ultimate fitness tracking platform for everyone.',
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
