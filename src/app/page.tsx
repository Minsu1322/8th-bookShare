import Category from '@/components/home/Category';
import Slider from '@/components/home/Slider';
import { logout } from './logout/actions';
import DemoClientComponent from '@/components/DemoClientComponent';

export default function Home() {
  return (
    <main>
      <Slider />
      <form action={logout}>
        <button type="submit">Logout</button>
      </form>
      <DemoClientComponent />
      <Category />
    </main>
  );
}
