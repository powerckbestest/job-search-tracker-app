import { Briefcase } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export const AppName = () => {
  const { t } = useTranslation();
  return (
    <div className="flex items-center gap-2">
      <Briefcase className="text-blue-600" size={32} />
      <h1 className="text-2xl font-bold text-gray-800">{t('appName')}</h1>
    </div>
  );
};
