import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Outlet } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

export function Layout() {
  return (
    <div className="min-h-screen bg-[var(--acit-bg)] text-[var(--acit-text)] flex flex-col">
      <Navbar />
      <main className="flex-grow pt-16">
        <Outlet />
      </main>
      <Footer />
      <Toaster
        position="bottom-right"
        toastOptions={{
          style: {
            background: 'var(--acit-surface)',
            color: 'var(--acit-text)',
            border: '1px solid var(--acit-border)',
          }
        }}
      />
    </div>
  );
}