import TopBanner from './components/home/TopBanner';
import { Locale } from '@/i18n/i18n-config';
import { FilterComponent } from './components/home/Filter';
import { VehicleTypeSelector } from './components/home/TypeSelector';
import { DisplayPosts } from './components/posts/DisplayPosts';

export default async function Home({ params: { lang } }: { params: { lang: Locale } }) {
  return (
    <div className={`flex flex-col gap-[20px]`}>
      <VehicleTypeSelector />
      <div className={`px-[20px] md:px-[490px] flex flex-col gap-[20px]`}>
        {/* <TopBanner /> */}
        <FilterComponent />
        <DisplayPosts />
      </div>
    </div>
  );
}