import { Calendar, dayjsLocalizer, Views } from 'react-big-calendar';
import dayjs from 'dayjs'
import 'dayjs/locale/ru'
import timezone from 'dayjs/plugin/timezone'
import { useMemo } from 'react';
import { events } from './testEvents.ts';

dayjs.extend(timezone)
dayjs.locale('ru') // Установка русской локали

const djLocalizer = dayjsLocalizer(dayjs)

export const MyCalendar = () => {
  const { formats, views,messages } = useMemo(
    () => ({
      defaultDate: new Date(2015, 3, 13),
      formats: {
        dayFormat: (date, culture, localizer) => {
          return localizer.format(date, 'dd DD/MM', culture);
        },
      },
      views: [Views.WEEK, Views.DAY],
      messages: {
        week: 'Неделя',
        day: 'День',
        month: 'Месяц',
        previous: 'Назад',
        next: 'Вперед',
        today: 'Сегодня',
      }
    }),
    []
  )

  return (
    <Calendar
      localizer={djLocalizer}
      events={events}
      defaultView={Views.WEEK}
      views={views}
      messages={messages}
      formats={formats}
      culture="ru"
    />
  );
};
