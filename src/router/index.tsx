import { Suspense, lazy, type JSX } from 'react';
import type { RouteObject } from 'react-router-dom';
import FullScreenLoader from '../components/FullScreenLoader';

const Loadable =
  (Component: React.ComponentType<any>) => (props: JSX.IntrinsicAttributes) =>
    (
      <Suspense fallback={<FullScreenLoader />}>
        <Component {...props} />
      </Suspense>
    );

const ListFinancePage = Loadable(lazy(() => import('../finance/crud/list.finance.page')));
const CreateFinancePage = Loadable(lazy(() => import('../finance/crud/create.finance.page')));
const EditFinancePage = Loadable(lazy(() => import('../finance/crud/edit.finance.page')));

const normalRoutes: RouteObject = {
  path: '*',
  children: [
    {
      path: 'finances',
      children: [
        {
          path: '',
          element: <ListFinancePage />,
        },
      ],
    },
    {
      path: 'finance',
      children: [
        {
          path: '',
          element: <CreateFinancePage />,
        },
        {
          path: ':id',
          element: <EditFinancePage />,
        },
      ],
    },
  ],
};

const routes: RouteObject[] = [normalRoutes];

export default routes;
