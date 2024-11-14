import React, { useState } from "react";
import {
  Building2,
  ChevronDown,
  ChevronUp,
  Mail,
  Phone,
  User,
} from "lucide-react";
import { Employer, Interview } from "../types";
import InterviewList from "./InterviewList";



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
    <div className="bg-white rounded-lg shadow-md p-6 mb-4 transition-all hover:shadow-lg">
      <div className="flex justify-between items-start">
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <Building2 className="text-blue-600" size={20} />
            <h3 className="text-xl font-semibold text-gray-800">
              {employer.companyName}
            </h3>
          </div>
          <p className="text-gray-600 mt-2">{employer.description}</p>

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
          onClick={() => setIsExpanded(!isExpanded)}
          className="p-2 hover:bg-gray-100 rounded-full transition-colors"
        >
          {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </button>
      </div>

      {isExpanded && (
        <div className="mt-4 pt-4 border-t">
          <InterviewList
            interviews={employer.interviews}
            employerId={employer.id}
            onAddInterview={onAddInterview}
            onUpdateInterview={onUpdateInterview}
          />

          <div className="mt-4 flex justify-end gap-2">

            <button
                onClick={() => {
                  onEditCard(employer.id)
                }}
                className="px-3 py-1 text-sm text-blue-600 hover:bg-blue-50 rounded-md transition-colors"
            >
              Редактировать
            </button>
            <button
                onClick={() => onDeleteEmployer(employer.id)}
                className="px-3 py-1 text-sm text-red-600 hover:bg-red-50 rounded-md transition-colors"
            >
              Удалить
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
