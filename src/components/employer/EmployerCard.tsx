import { useState } from 'react';
import {
  Building2,
  CalendarClock,
  ChevronDown,
  ChevronUp,
  Mail,
  Phone,
  User,
} from 'lucide-react';
import { Employer } from '@/types.ts';
import InterviewList from '@/components/employer/interview/InterviewList.tsx';
import { EditCurrentEmployer } from '@/components/employer/EditCurrentEmployer.tsx';
import { DeleteCurrentEmployer } from '@/components/employer/DeleteCurrentEmployer.tsx';
import { Collapsible } from '@radix-ui/react-collapsible';
import {
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible.tsx';
import { selectInterviewsByEmployerId } from '@/model/employers.ts';
import dayjs from 'dayjs';
import { useSelector } from 'react-redux';
import { dateSorterDesc } from '@/lib/sorters.ts';

interface Props {
  employer: Employer;
}

export default function EmployerCard({ employer }: Props) {
  const [isExpanded, setIsExpanded] = useState(false);
  const lastInterview =
    useSelector(selectInterviewsByEmployerId(employer.id))
      ?.sort((a, b) => dateSorterDesc(new Date(a.date), new Date(b.date)))
      ?.at(0) || null;

  return (
    <Collapsible
      open={isExpanded}
      onOpenChange={setIsExpanded}
      data-testid="employerCard"
      className="mb-4 rounded-lg bg-white p-6 shadow-md transition-all hover:shadow-lg"
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <Building2 className="text-blue-600" size={20} />
            <h3 className="text-xl font-semibold text-gray-800">
              {employer.companyName}
            </h3>

            <DeleteCurrentEmployer employerId={employer.id} />
            <div className="ml-auto pr-3">
              <EditCurrentEmployer employerId={employer.id} />
            </div>
          </div>
          <p className="mt-2 text-gray-600">{employer.description}</p>

          <div className="mt-4 space-y-2">
            <div className="flex items-center gap-2">
              <User className="text-gray-500" size={16} />
              <span className="text-gray-700">{employer.hrName}</span>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="text-gray-500" size={16} />
              <Phone className="text-gray-500" size={16} />
              <span className="text-gray-700">{employer.contacts}</span>
            </div>

            {lastInterview && (
              <div className="flex items-center gap-2">
                <CalendarClock size={16} className="text-gray-500" />
                <span className="text-gray-700">Последнее событие</span>
                <span className="text-gray-700">
                  {dayjs(lastInterview.date).locale('ru').format('L')}
                </span>
              </div>
            )}
          </div>
        </div>
        <CollapsibleTrigger
          data-testid="expandInterviewList"
          onClick={() => setIsExpanded(!isExpanded)}
          className="hover:bg-gray-100> rounded-md p-2 transition-colors"
        >
          {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </CollapsibleTrigger>
      </div>
      <CollapsibleContent>
        <div className="mt-4 border-t pt-4">
          <InterviewList
            data-testid="interviewList"
            interviews={employer.interviews}
            employerId={employer.id}
          />
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
}
