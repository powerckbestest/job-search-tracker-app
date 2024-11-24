import { useState } from 'react';
import {
  Building2,
  ChevronDown,
  ChevronUp,
  Mail,
  Phone,
  User,
} from 'lucide-react';
import { Employer } from '../types';
import InterviewList from './InterviewList';
import { EditCurrentEmployer } from './EditCurrentEmployer.tsx';
import { DeleteCurrentEmployer } from './DeleteCurrentEmployer.tsx';
import { Button } from '@/components/ui/button.tsx';
import { Collapsible } from '@radix-ui/react-collapsible';
import {
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible.tsx';

interface Props {
  employer: Employer;
}

export default function EmployerCard({ employer }: Props) {
  const [isExpanded, setIsExpanded] = useState(false);

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
          </div>
        </div>
        <CollapsibleTrigger>
          <Button
            variant="ghost"
            data-testid="expandInterviewList"
            onClick={() => setIsExpanded(!isExpanded)}
            className="rounded-md p-2 transition-colors hover:bg-gray-100"
          >
            {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
          </Button>
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
