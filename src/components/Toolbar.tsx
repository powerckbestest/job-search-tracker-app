import { Settings } from '@/components/Settings.tsx';
import { AddEmployer } from '@/components/AddEmployer.tsx';
import { AppName } from '@/components/AppName.tsx';

export const Toolbar = () => {
  return (
    <header className="mb-8">
      <div className="flex items-center justify-between">
        <AppName />
        <Settings />
        <AddEmployer />
      </div>
    </header>
  );
};
