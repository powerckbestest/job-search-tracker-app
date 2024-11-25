import { Settings } from '@/components/settings/Settings.tsx';
import { AddEmployer } from '@/components/employer/AddEmployer.tsx';
import { AppName } from '@/components/layout/AppName.tsx';

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
