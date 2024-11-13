import React, { useState, useEffect } from 'react';
import { PlusCircle, Briefcase } from 'lucide-react';
import { Employer, Interview } from './types';
import EmployerCard from './components/EmployerCard';

function App() {
  const [employers, setEmployers] = useState<Employer[]>(() => {
    const saved = localStorage.getItem('jobSearchEmployers');
    return saved ? JSON.parse(saved) : [];
  });
  
  const [isAdding, setIsAdding] = useState(false);
  const [newEmployer, setNewEmployer] = useState({
    companyName: '',
    description: '',
    hrName: '',
    contacts: '',
  });

  useEffect(() => {
    localStorage.setItem('jobSearchEmployers', JSON.stringify(employers));
  }, [employers]);

  const handleAddEmployer = (e: React.FormEvent) => {
    e.preventDefault();
    const employer: Employer = {
      ...newEmployer,
      id: Date.now().toString(),
      interviews: [],
      createdAt: new Date().toISOString(),
    };
    setEmployers([employer, ...employers]);
    setIsAdding(false);
    setNewEmployer({ companyName: '', description: '', hrName: '', contacts: '' });
  };

  const handleAddInterview = (employerId: string, interview: Interview) => {
    setEmployers(employers.map(emp => 
      emp.id === employerId 
        ? { ...emp, interviews: [...emp.interviews, interview] }
        : emp
    ));
  };

  const handleUpdateInterview = (employerId: string, updatedInterview: Interview) => {
    setEmployers(employers.map(emp => 
      emp.id === employerId 
        ? {
            ...emp,
            interviews: emp.interviews.map(interview =>
              interview.id === updatedInterview.id ? updatedInterview : interview
            )
          }
        : emp
    ));
  };

  const handleUpdateEmployer = (updatedEmployer: Employer) => {
    setEmployers(employers.map(emp => 
      emp.id === updatedEmployer.id ? updatedEmployer : emp
    ));
  };

  const handleDeleteEmployer = (id: string) => {
    if (window.confirm('Вы уверены, что хотите удалить этого работодателя?')) {
      setEmployers(employers.filter(emp => emp.id !== id));
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-4xl mx-auto p-6">
        <header className="mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Briefcase className="text-blue-600" size={32} />
              <h1 className="text-2xl font-bold text-gray-800">Поиск работы</h1>
            </div>
            <button
              onClick={() => setIsAdding(true)}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <PlusCircle size={20} />
              Добавить работодателя
            </button>
          </div>
        </header>

        {isAdding && (
          <div className="mb-6 bg-white rounded-lg shadow-md p-6">
            <form onSubmit={handleAddEmployer} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Название компании
                </label>
                <input
                  type="text"
                  value={newEmployer.companyName}
                  onChange={(e) => setNewEmployer({ ...newEmployer, companyName: e.target.value })}
                  className="w-full px-3 py-2 border rounded-md"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Описание
                </label>
                <textarea
                  value={newEmployer.description}
                  onChange={(e) => setNewEmployer({ ...newEmployer, description: e.target.value })}
                  className="w-full px-3 py-2 border rounded-md"
                  rows={3}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Имя HR
                </label>
                <input
                  type="text"
                  value={newEmployer.hrName}
                  onChange={(e) => setNewEmployer({ ...newEmployer, hrName: e.target.value })}
                  className="w-full px-3 py-2 border rounded-md"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Контакты
                </label>
                <input
                  type="text"
                  value={newEmployer.contacts}
                  onChange={(e) => setNewEmployer({ ...newEmployer, contacts: e.target.value })}
                  className="w-full px-3 py-2 border rounded-md"
                  placeholder="Email, телефон, etc."
                />
              </div>
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsAdding(false)}
                  className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-md"
                >
                  Отмена
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  Сохранить
                </button>
              </div>
            </form>
          </div>
        )}

        <div className="space-y-4">
          {employers.map((employer) => (
            <EmployerCard
              key={employer.id}
              employer={employer}
              onAddInterview={handleAddInterview}
              onUpdateEmployer={handleUpdateEmployer}
              onDeleteEmployer={handleDeleteEmployer}
              onUpdateInterview={handleUpdateInterview}
            />
          ))}
          
          {employers.length === 0 && !isAdding && (
            <div className="text-center py-12">
              <p className="text-gray-500">Нет добавленных работодателей</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;