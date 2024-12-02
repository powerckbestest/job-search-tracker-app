import { Settings } from '@/components/settings/Settings.tsx';
import { AppName } from '@/components/layout/AppName.tsx';
import { LanguageSelector } from '@/components/settings/LanguageSelector.tsx';

export const Toolbar = () => {
  return (
    <header className="mb-8">
      <div className="flex items-center justify-between">
        <AppName />
        <LanguageSelector />
        <Settings />
      </div>
    </header>
  );
};
