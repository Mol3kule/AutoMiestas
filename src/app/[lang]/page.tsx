import TopBanner from './components/home/TopBanner';
import { Locale } from '@/i18n/i18n-config';
import { FilterComponent } from './components/home/Filter';

export default async function Home({ params: { lang } }: { params: { lang: Locale } }) {
  return (
    <div className={`flex flex-col`}>
      <div className={`mx-[490px] flex flex-col gap-[20px]`}>
        <TopBanner />
        <FilterComponent />
      </div>
    </div>
  );
}