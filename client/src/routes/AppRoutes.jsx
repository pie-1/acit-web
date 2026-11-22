// src/routes/AppRoutes.jsx
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { Home } from '@/pages/Home';
import { Events } from '@/pages/Events';
import { Team } from '@/pages/Team';
import { Projects } from '@/pages/Projects';
import { Resources } from '@/pages/Resources';
import { FunZone } from '@/pages/FunZone';
import { Login } from '@/pages/Login';
import { Register } from '@/pages/Register';

const router = createBrowserRouter([
  { path: '/login', element: <Login /> },
  { path: '/register', element: <Register /> },
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: 'events', element: <Events /> },
      { path: 'team', element: <Team /> },
      { path: 'projects', element: <Projects /> },
      { path: 'resources', element: <Resources /> },
      { path: 'funzone', element: <FunZone /> },
    ],
  },
]);

export function AppRoutes() {
  return <RouterProvider router={router} />;
}