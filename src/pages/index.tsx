import { PrivateRoute } from 'src/components/private-route/PrivateRoute';

export default function HomePage(): JSX.Element | null {
  return <PrivateRoute isIndex />;
}
