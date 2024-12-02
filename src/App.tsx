import { Toolbar } from '@/components/layout/Toolbar.tsx';
import { MyCalendar } from './components/calendar/Calendar.tsx';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs.tsx';
import { EmployersWidget } from '@/components/employer/EmployersWidget.tsx';
import { useTranslation } from 'react-i18next';
function App() {
  const { t } = useTranslation();
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="mx-auto max-w-4xl p-6">
        <Toolbar />
        <Tabs defaultValue="employers" className="full-width">
          <TabsList>
            <TabsTrigger value="employers">{t('employers')}</TabsTrigger>
            <TabsTrigger value="calendar">{t('calendar')}</TabsTrigger>
          </TabsList>
          <TabsContent value="employers">
            <EmployersWidget />
          </TabsContent>
          <TabsContent value="calendar">
            <MyCalendar />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

export default App;
