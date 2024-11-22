import { Calendar, dayjsLocalizer, Views,Event as CalendarEvent } from 'react-big-calendar';
import dayjs from 'dayjs'
import 'dayjs/locale/ru'
import timezone from 'dayjs/plugin/timezone'
import { useCallback, useMemo } from 'react';
import { useAppSelector } from '../../model/store.ts';
import { CalendarInterview, selectCalendarInterviews} from '../../model/employers.ts';

dayjs.extend(timezone)
dayjs.locale('ru') // Установка русской локали

const convertInterviewToEvent = (interview:CalendarInterview ): CalendarEvent => {
  return {
    start: dayjs(interview.date).toDate(),
    end: dayjs(interview.date).add(1,'hour').toDate() ,
    title: interview.companyName,
    resource: {
      status: interview.status,
    }
  }
}

const djLocalizer = dayjsLocalizer(dayjs)



export const MyCalendar = () => {

  const interviews = useAppSelector(selectCalendarInterviews)
  const interviewsEvents = useMemo(() => interviews.map(convertInterviewToEvent), [interviews])


  const eventPropGetter = useCallback(
    (event, start, end, isSelected) => ({
      ...(event.resource.status == 'rejected' && {
        style: {
          backgroundColor: 'red',
        },
      }),
      ...(event.resource.status == 'completed' && {
        style: {
          backgroundColor: 'yellow',
          color: 'black',
        },
      }),
    }),
    [])

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
      events={interviewsEvents}
      defaultView={Views.WEEK}
      views={views}
      eventPropGetter={eventPropGetter}
      messages={messages}
      formats={formats}
      culture="ru"
    />
  );
};
