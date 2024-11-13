import { useState, useEffect } from "react";
import { PlusCircle, Briefcase } from "lucide-react";
import { Employer, Interview } from "./types";
import EmployerCard from "./components/EmployerCard";
import {EditEmployerCard} from "./components/EditEmployerCard.tsx";

function App() {
  const [employers, setEmployers] = useState<Employer[]>(() => {
    const saved = localStorage.getItem("jobSearchEmployers");
    return saved ? JSON.parse(saved) : [];
  });

  const [isAdding, setIsAdding] = useState(false);
  const [editCardId, setEditCardId] = useState<string | null>(null);


  useEffect(() => {
    localStorage.setItem("jobSearchEmployers", JSON.stringify(employers));
  }, [employers]);



  const handleAddInterview = (employerId: string, interview: Interview) => {
    setEmployers(
      employers.map((emp) =>
        emp.id === employerId
          ? { ...emp, interviews: [...emp.interviews, interview] }
          : emp
      )
    );
  };

  const handleUpdateInterview = (
    employerId: string,
    updatedInterview: Interview
  ) => {
    setEmployers(
      employers.map((emp) =>
        emp.id === employerId
          ? {
              ...emp,
              interviews: emp.interviews.map((interview) =>
                interview.id === updatedInterview.id
                  ? updatedInterview
                  : interview
              ),
            }
          : emp
      )
    );
  };

  const handleUpdateEmployer = (updatedEmployer: Employer) => {
    setEmployers(
      employers.map((emp) =>
        emp.id === updatedEmployer.id ? updatedEmployer : emp
      )
    );
  };

  const handleDeleteEmployer = (id: string) => {
    if (window.confirm("Вы уверены, что хотите удалить этого работодателя?")) {
      setEmployers(employers.filter((emp) => emp.id !== id));
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

        {(isAdding || editCardId !== null) && (
            <EditEmployerCard setIsAdding={setIsAdding}  setEmployers={setEmployers} employers={employers} editCardId={editCardId} setEditCardId={setEditCardId}/>
        )}

        <div className="space-y-4">
          {employers.map((employer) => {
                if (editCardId === employer.id) {
                  return <></>
                }

                return (
                    <EmployerCard
                        key={employer.id}
                        employer={employer}
                        onEditCard={setEditCardId}
                        onAddInterview={handleAddInterview}
                        onUpdateEmployer={handleUpdateEmployer}
                        onDeleteEmployer={handleDeleteEmployer}
                        onUpdateInterview={handleUpdateInterview}
                    />)
              })}


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
