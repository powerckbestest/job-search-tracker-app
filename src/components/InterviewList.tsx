import React, { useState } from 'react';
import { CalendarDays, Plus, Edit2, Save, X } from 'lucide-react';
import { Interview } from '../types';

interface Props {
  interviews: Interview[];
  employerId: string;
  onAddInterview: (employerId: string, interview: Interview) => void;
  onUpdateInterview: (employerId: string, interview: Interview) => void;
}

export default function InterviewList({
  interviews,
  employerId,
  onAddInterview,
  onUpdateInterview,
}: Props) {
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingInterview, setEditingInterview] = useState<Interview | null>(
    null
  );
  const [newInterview, setNewInterview] = useState({
    date: '',
    notes: '',
    status: 'pending' as const,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAddInterview(employerId, {
      ...newInterview,
      id: Date.now().toString(),
    });
    setIsAdding(false);
    setNewInterview({ date: '', notes: '', status: 'pending' });
  };

  const handleEdit = (interview: Interview) => {
    setEditingId(interview.id);
    setEditingInterview({ ...interview });
  };

  const handleSaveEdit = () => {
    if (editingInterview) {
      onUpdateInterview(employerId, editingInterview);
      setEditingId(null);
      setEditingInterview(null);
    }
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditingInterview(null);
  };

  const getStatusColor = (status: Interview['status']) => {
    switch (status) {
      case 'completed':
        return 'text-yellow-600 bg-yellow-50';
      case 'accepted':
        return 'text-green-600 bg-green-50';
      case 'rejected':
        return 'text-red-600 bg-red-50';
      default:
        return 'text-blue-600 bg-blue-50';
    }
  };

  const getStatusText = (status: Interview['status']) => {
    switch (status) {
      case 'pending':
        return 'В ожидании';
      case 'completed':
        return 'Завершено';
      case 'accepted':
        return 'Принят';
      case 'rejected':
        return 'Отказ';
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h4 className="font-medium text-gray-700">Собеседования</h4>
        <button
          data-testid="addInterview"
          onClick={() => setIsAdding(true)}
          className="flex items-center gap-1 text-sm text-blue-600 hover:text-blue-700"
        >
          <Plus size={16} />
          Добавить
        </button>
      </div>

      {isAdding && (
        <form
          onSubmit={handleSubmit}
          className="space-y-3 rounded-md bg-gray-50 p-3"
        >
          <div>
            <input
              data-testid="interviewDate"
              type="datetime-local"
              value={newInterview.date}
              onChange={(e) =>
                setNewInterview({ ...newInterview, date: e.target.value })
              }
              className="w-full rounded-md border px-3 py-2"
              required
            />
          </div>
          <div>
            <textarea
              data-testid="interviewDescription"
              value={newInterview.notes}
              onChange={(e) =>
                setNewInterview({ ...newInterview, notes: e.target.value })
              }
              placeholder="Заметки о собеседовании, результаты, впечатления..."
              className="w-full rounded-md border px-3 py-2"
              rows={3}
            />
          </div>
          <div>
            <select
              data-testid="selectInterviewStatus"
              value={newInterview.status}
              onChange={(e) =>
                setNewInterview({
                  ...newInterview,
                  status: e.target.value as Interview['status'],
                })
              }
              className="w-full rounded-md border px-3 py-2"
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
              onClick={() => setIsAdding(false)}
              className="rounded-md px-3 py-1 text-sm text-gray-600 hover:bg-gray-100"
            >
              Отмена
            </button>
            <button
              data-testid="saveInterviewEdit"
              type="submit"
              className="rounded-md bg-blue-600 px-3 py-1 text-sm text-white hover:bg-blue-700"
            >
              Сохранить
            </button>
          </div>
        </form>
      )}

      <div className="space-y-2">
        {interviews.map((interview) => (
          <div key={interview.id} className="rounded-md bg-gray-50 p-3">
            {editingId === interview.id && editingInterview ? (
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <input
                    type="datetime-local"
                    value={editingInterview.date}
                    onChange={(e) =>
                      setEditingInterview({
                        ...editingInterview,
                        date: e.target.value,
                      })
                    }
                    className="flex-1 rounded-md border px-3 py-2 text-sm"
                  />
                  <select
                    value={editingInterview.status}
                    onChange={(e) =>
                      setEditingInterview({
                        ...editingInterview,
                        status: e.target.value as Interview['status'],
                      })
                    }
                    className="rounded-md border px-3 py-2 text-sm"
                  >
                    <option value="pending">В ожидании</option>
                    <option value="completed">Завершено</option>
                    <option value="accepted">Принят</option>
                    <option value="rejected">Отказ</option>
                  </select>
                </div>
                <textarea
                  value={editingInterview.notes}
                  onChange={(e) =>
                    setEditingInterview({
                      ...editingInterview,
                      notes: e.target.value,
                    })
                  }
                  className="w-full rounded-md border px-3 py-2 text-sm"
                  rows={4}
                  placeholder="Заметки о собеседовании, результаты, впечатления..."
                />
                <div className="flex justify-end gap-2">
                  <button
                    onClick={handleCancelEdit}
                    className="flex items-center gap-1 rounded-md px-3 py-1 text-sm text-gray-600 hover:bg-gray-200"
                  >
                    <X size={14} />
                    Отмена
                  </button>
                  <button
                    onClick={handleSaveEdit}
                    className="flex items-center gap-1 rounded-md bg-blue-600 px-3 py-1 text-sm text-white hover:bg-blue-700"
                  >
                    <Save size={14} />
                    Сохранить
                  </button>
                </div>
              </div>
            ) : (
              <div>
                <div className="mb-2 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <CalendarDays className="text-gray-400" size={16} />
                    <span className="text-sm text-gray-600">
                      {new Date(interview.date).toLocaleString('ru-RU')}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span
                      className={`rounded-full px-2 py-1 text-xs ${getStatusColor(
                        interview.status
                      )}`}
                    >
                      {getStatusText(interview.status)}
                    </span>
                    <button
                      onClick={() => handleEdit(interview)}
                      className="rounded-full p-1 transition-colors hover:bg-gray-200"
                      title="Редактировать"
                    >
                      <Edit2 size={14} className="text-gray-500" />
                    </button>
                  </div>
                </div>
                {interview.notes && (
                  <div className="mt-2 whitespace-pre-wrap text-sm text-gray-700">
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
