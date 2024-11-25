import { Calendar, dayjsLocalizer, Views, Event as CalendarEvent } from 'react-big-calendar';
import dayjs from 'dayjs'
import 'dayjs/locale/ru'
import timezone from 'dayjs/plugin/timezone'
import { useCallback, useMemo } from 'react';
import { useAppSelector } from '@/model/store.ts';
import { CalendarInterview, selectCalendarInterviews} from '@/model/employers.ts';

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

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
const locilizeDates  = (date, culture, localizer) => localizer.format(date, 'dd DD/MM', culture)


const djLocalizer = dayjsLocalizer(dayjs)

export const MyCalendar = () => {

  const interviews = useAppSelector(selectCalendarInterviews)
  const interviewsEvents = useMemo(() => interviews.map(convertInterviewToEvent), [interviews])


  const eventPropGetter = useCallback(
    (event:CalendarEvent) => ({
      ...( event.resource.status == 'pending' && {
        style: {
          backgroundColor: 'rgb(239, 246, 255)',
          color: 'rgb(37, 99, 235)',
        },
      }),
      ...(event.resource.status == 'rejected' && {
        style: {
          backgroundColor: 'rgb(254, 242, 242)',
          color: 'rgb(220, 38, 38)',
        },
      }),
      ...(event.resource.status == 'completed' && {
        style: {
          backgroundColor: 'rgb(254, 252, 232)',
          color: 'rgb(202, 138, 4)',
        },
      }),
      ...(event.resource.status == 'accepted' && {
        style: {
          backgroundColor: 'rgb(240, 253, 244)',
          color: 'rgb(254, 252, 232)',
        },
      }),
    }),
    [])



  const { formats, views,messages } = useMemo(
    () => ({
      defaultDate: new Date(2015, 3, 13),
      formats: {
        dayFormat: locilizeDates,
      },
      views: [Views.WEEK, Views.DAY, Views.AGENDA],
      messages: {
        week: 'Неделя',
        day: 'День',
        month: 'Месяц',
        previous: 'Назад',
        next: 'Вперед',
        today: 'Сегодня',
        agenda: 'План',
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
