import Category from '@/components/home/Category';
import { logout } from './logout/actions';
import DemoClientComponent from '@/components/DemoClientComponent';

export default function Home() {
  return (
    <main>
      <form action={logout}>
        <button type="submit">Logout</button>
      </form>
      <DemoClientComponent />
      <Category />
    </main>
  );
}
