import About from './_components/sections/About';
import AboutIcons from './_components/sections/AboutIcons';
import HowEdit from './_components/sections/HowEdit';
import Data from './_components/sections/MarkerData';
import MiniMap from './_components/sections/MiniMap';
import styles from './page.module.scss';

export default function Page() {
  return (
    <main className={styles.main}>
      <About />
      <MiniMap />
      <Data />
      <AboutIcons />
      <HowEdit />
    </main>
  );
}
