import React, { useState } from 'react';
import {
  Building2,
  ChevronDown,
  ChevronUp,
  Mail,
  Phone,
  User,
} from 'lucide-react';
import { Employer, Interview } from '../types';
import InterviewList from './InterviewList';

interface Props {
  employer: Employer;
  onAddInterview: (employerId: string, interview: Interview) => void;
  onUpdateEmployer: (employer: Employer) => void;
  onDeleteEmployer: (id: string) => void;
  onUpdateInterview: (employerId: string, interview: Interview) => void;
  onEditCard: React.Dispatch<React.SetStateAction<string | null>>;
}

export default function EmployerCard({
  employer,
  onAddInterview,
  onDeleteEmployer,
  onUpdateInterview,
  onEditCard,
}: Props) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div
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

        <button
          data-testid="expandInterviewList"
          onClick={() => setIsExpanded(!isExpanded)}
          className="rounded-full p-2 transition-colors hover:bg-gray-100"
        >
          {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </button>
      </div>

      {isExpanded && (
        <div className="mt-4 border-t pt-4">
          <InterviewList
            data-testid="interviewList"
            interviews={employer.interviews}
            employerId={employer.id}
            onAddInterview={onAddInterview}
            onUpdateInterview={onUpdateInterview}
          />

          <div className="mt-4 flex justify-end gap-2">
            <button
              data-testid="editEmployer"
              onClick={() => {
                onEditCard(employer.id);
              }}
              className="rounded-md px-3 py-1 text-sm text-blue-600 transition-colors hover:bg-blue-50"
            >
              Редактировать
            </button>
            <button
              data-testid="deleteEmployer"
              onClick={() => onDeleteEmployer(employer.id)}
              className="rounded-md px-3 py-1 text-sm text-red-600 transition-colors hover:bg-red-50"
            >
              Удалить
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
