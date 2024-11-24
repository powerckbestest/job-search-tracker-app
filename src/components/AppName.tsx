import { Briefcase } from 'lucide-react';

export const AppName = () => {
  return (
    <div className="flex items-center gap-2">
      <Briefcase className="text-blue-600" size={32} />
      <h1 className="text-2xl font-bold text-gray-800">Поиск работы</h1>
    </div>
  );
};
