// src/routes/AppRoutes.jsx
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { Home } from '@/pages/Home';

// We will uncomment these one by one as we build them:
// import { Team } from '@/pages/Team';
// import { Projects } from '@/pages/Projects';
// import { Events } from '@/pages/Events';
// import { Resources } from '@/pages/Resources';
// import { FunZone } from '@/pages/FunZone';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      // { path: 'team', element: <Team /> },
      // { path: 'projects', element: <Projects /> },
      // { path: 'events', element: <Events /> },
      // { path: 'resources', element: <Resources /> },
      // { path: 'funzone', element: <FunZone /> },
    ],
  },
]);

export function AppRoutes() {
  return <RouterProvider router={router} />;
}