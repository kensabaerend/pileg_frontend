import { lazy, Suspense } from 'react';
import { useRecoilValue } from 'recoil';
import { Outlet, Navigate, useRoutes } from 'react-router-dom';

import userAtom from 'src/atoms/userAtom';
import DashboardLayout from 'src/layouts/dashboard';

export const IndexPage = lazy(() => import('src/pages/app'));
export const KecamatanPage = lazy(() => import('src/pages/kecamatan'));
export const KelurahanPage = lazy(() => import('src/pages/kelurahan'));
export const suaraCaleg = Lazy(() => import('src/pages/suaraCaleg'))
export const UserPage = lazy(() => import('src/pages/user'));
export const LoginPage = lazy(() => import('src/pages/login'));
export const PengisianSuaraPage = lazy(() => import('src/pages/pengisian_suara'));
export const Page404 = lazy(() => import('src/pages/page-not-found'));

// ----------------------------------------------------------------------

export default function Router() {
  const user = useRecoilValue(userAtom);
  const routes = useRoutes([
    {
      element: user ? (
        <DashboardLayout>
          <Suspense>
            <Outlet />
          </Suspense>
        </DashboardLayout>
      ) : (
        <Navigate to="/login" replace />
      ),
      children: [
        { element: <IndexPage />, index: true },
        { path: 'user', element: <UserPage /> },
        { path: 'pengisian-suara', element: <PengisianSuaraPage /> },
        { path: 'kecamatan', element: <KecamatanPage /> },
        { path: 'kelurahan', element: <KelurahanPage /> },
        { path: 'suaraCaleg', elment: <SuaraCalegPage />},
      ],
    },
    {
      path: 'login',
      element: <LoginPage />,
    },
    {
      path: '404',
      element: <Page404 />,
    },
    {
      path: '*',
      element: <Navigate to="/404" replace />,
    },
  ]);

  return routes;
}
