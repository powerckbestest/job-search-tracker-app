import React, { useState} from "react";
import { CalendarDays, Plus, Edit2, Save, X } from "lucide-react";
import { Interview } from "../types";
import { valuesSlice} from "../model/values.ts";
import {useSelector} from "react-redux";
import {RootState, useAppDispatch} from "../model/store.ts";
import {employersSelectors, employersSlice} from "../model/employers.ts";

interface Props {
  interviews: Interview[];
  employerId: string;
}

const newInterviewTemp: Interview = {
  id: "",
  date: "",
  notes: "",
  status: "pending" as const,
};

export default function InterviewList({
  interviews, employerId
}: Props) {
  const [isInterviewAdding, setIsInterviewAdding] = useState<boolean>(false);
  const [currentInterviewId, setCurrentInterviewId] = useState<string | null>(null);
  const [currentInterview, setCurrentInterview] = useState<Interview | null>(
    null
  );



  const dispatch = useAppDispatch();
  const currentEmployer = useSelector((state:RootState)=>employersSelectors.selectById(state,employerId))

  const [newInterview, setNewInterview] = useState<Interview>(newInterviewTemp);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newInterviewWithId = {...newInterview, id: Date.now().toString()};
    const updatedInterviews = [...currentEmployer?.interviews || [], newInterviewWithId];
    dispatch(employersSlice.actions.updateEmployer({id:employerId,changes:{interviews:updatedInterviews}}));

    setIsInterviewAdding(false);
    setNewInterview(newInterviewTemp);
  };

  const handleEdit = (interview: Interview) => {
    setCurrentInterviewId(interview.id);
    setCurrentInterview({ ...interview });
  };

  const handleSaveEdit = () => {
    if (currentInterview) {
      console.log('currentInterview save edit',currentInterview)
      const filteredInterviews = currentEmployer?.interviews?.filter((interview:Interview)=>interview.id !== currentInterviewId) || [];
      const newInterviews = [...filteredInterviews, currentInterview];
      dispatch(employersSlice.actions.updateEmployer({id:employerId,changes:{interviews:newInterviews}}));
      dispatch(valuesSlice.actions.resetEditingEmployerId());

      setCurrentInterview(null);
    }
  };

  const handleCancelEdit = () => {
    setCurrentInterviewId(null);
    setCurrentInterview(null);
  };

  const getStatusColor = (status: Interview["status"]) => {
    switch (status) {
      case "completed":
        return "text-yellow-600 bg-yellow-50";
      case "accepted":
        return "text-green-600 bg-green-50";
      case "rejected":
        return "text-red-600 bg-red-50";
      default:
        return "text-blue-600 bg-blue-50";
    }
  };

  const getStatusText = (status: Interview["status"]) => {
    switch (status) {
      case "pending":
        return "В ожидании";
      case "completed":
        return "Завершено";
      case "accepted":
        return "Принят";
      case "rejected":
        return "Отказ";
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h4 className="font-medium text-gray-700">Собеседования</h4>
        <button
            data-testid='addInterview'
          onClick={() => setIsInterviewAdding(true)}
          className="flex items-center gap-1 text-sm text-blue-600 hover:text-blue-700"
        >
          <Plus size={16} />
          Добавить
        </button>
      </div>

      {isInterviewAdding && (
        <form
          onSubmit={handleSubmit}
          className="space-y-3 p-3 bg-gray-50 rounded-md"
        >
          <div>
            <input
                data-testid="interviewDate"
              type="datetime-local"
              value={newInterview.date}
              onChange={(e) =>
                setNewInterview({ ...newInterview, date: e.target.value })
              }
              className="w-full px-3 py-2 border rounded-md"
              required
            />
          </div>
          <div>
            <textarea
              data-testid='interviewDescription'
              value={newInterview.notes}
              onChange={(e) =>
                setNewInterview({ ...newInterview, notes: e.target.value })
              }
              placeholder="Заметки о собеседовании, результаты, впечатления..."
              className="w-full px-3 py-2 border rounded-md"
              rows={3}
            />
          </div>
          <div>
            <select
              data-testid='selectInterviewStatus'
              value={newInterview.status}
              onChange={(e) => {
                console.log('newInterview',newInterview)
                setNewInterview({
                  ...newInterview,
                  status: e.target.value as Interview["status"],
                });
              }
              }
              className="w-full px-3 py-2 border rounded-md"
            >
              <option value="pending">В ожидании</option>
              <option value="completed">Завершено</option>
              <option value="accepted">Принят</option>
              <option value="rejected">Отказ</option>
            </select>
          </div>
          <div className="flex justify-end gap-2">
            <button
                data-testid="cancelInterviewEdit"
              type="button"
              onClick={() => setIsInterviewAdding(false)}
              className="px-3 py-1 text-sm text-gray-600 hover:bg-gray-100 rounded-md"
            >
              Отмена
            </button>
            <button
                data-testid="saveInterviewEdit"
              type="submit"
              className="px-3 py-1 text-sm text-white bg-blue-600 hover:bg-blue-700 rounded-md"
            >
              Сохранить
            </button>
          </div>
        </form>
      )}

      <div className="space-y-2">
        {interviews.map((interview) => (
          <div key={interview.id} className="p-3 bg-gray-50 rounded-md">
            {currentInterviewId === interview.id && currentInterview ? (
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <input
                    type="datetime-local"
                    value={currentInterview.date}
                    onChange={(e) =>
                      setCurrentInterview({
                        ...currentInterview,
                        date: e.target.value,
                      })
                    }
                    className="flex-1 px-3 py-2 border rounded-md text-sm"
                  />
                  <select
                      data-testid="selectInterviewStatus"
                    value={currentInterview.status}
                    onChange={(e) => {
                      console.log('currentInterview',currentInterview)
                      setCurrentInterview({
                        ...currentInterview,
                        status: e.target.value as Interview["status"],
                      });
                    }
                    }
                    className="px-3 py-2 border rounded-md text-sm"
                  >
                    <option value="pending">В ожидании</option>
                    <option value="completed">Завершено</option>
                    <option value="accepted">Принят</option>
                    <option value="rejected">Отказ</option>
                  </select>
                </div>
                <textarea
                  value={currentInterview.notes}
                  onChange={(e) =>
                    setCurrentInterview({
                      ...currentInterview,
                      notes: e.target.value,
                    })
                  }
                  className="w-full px-3 py-2 border rounded-md text-sm"
                  rows={4}
                  placeholder="Заметки о собеседовании, результаты, впечатления..."
                />
                <div className="flex justify-end gap-2">
                  <button
                      data-testid="cancelInterviewEdit"
                    onClick={handleCancelEdit}
                    className="flex items-center gap-1 px-3 py-1 text-sm text-gray-600 hover:bg-gray-200 rounded-md"
                  >
                    <X size={14} />
                    Отмена
                  </button>
                  <button
                      data-testid="saveInterviewEdit"
                    onClick={handleSaveEdit}
                    className="flex items-center gap-1 px-3 py-1 text-sm text-white bg-blue-600 hover:bg-blue-700 rounded-md"
                  >
                    <Save size={14} />
                    Сохранить
                  </button>
                </div>
              </div>
            ) : (
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <CalendarDays className="text-gray-400" size={16} />
                    <span className="text-sm text-gray-600">
                      {new Date(interview.date).toLocaleString("ru-RU")}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span
                      className={`text-xs px-2 py-1 rounded-full ${getStatusColor(
                        interview.status
                      )}`}
                    >
                      {getStatusText(interview.status)}
                    </span>
                    <button
                        data-testid="editInterview"
                      onClick={() => handleEdit(interview)}
                      className="p-1 hover:bg-gray-200 rounded-full transition-colors"
                      title="Редактировать"
                    >
                      <Edit2 size={14} className="text-gray-500" />
                    </button>
                  </div>
                </div>
                {interview.notes && (
                  <div className="mt-2 text-sm text-gray-700 whitespace-pre-wrap">
                    {interview.notes}
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
