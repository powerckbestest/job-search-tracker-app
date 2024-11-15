import React, {FC, useState} from "react";
import {Employer} from "../types.ts";

type EditEmployerCardProps = {
    setIsAdding: React.Dispatch<React.SetStateAction<boolean>>;
    employers: Employer[];
    setEmployers: React.Dispatch<React.SetStateAction<Employer[]>>;
    editCardId: string | null;
    setEditCardId: React.Dispatch<React.SetStateAction<string|null>>
}


export const EditEmployerCard: FC<EditEmployerCardProps> = ({setIsAdding, employers, setEmployers, editCardId, setEditCardId}) => {

    const [editedEmployer, setEditedEmployer] = useState<Employer>(getEditedEmployer(employers, editCardId));


    const handleCancelEditEmployer = (e: React.FormEvent) => {
        e.preventDefault();
        setEditCardId(null);
        setIsAdding(false);
    }

    const handleEditEmployer = (e: React.FormEvent) => {
        e.preventDefault();

        if (editCardId !== null){
            const filteredEditedEmployers = employers.filter((employer:Employer)=> employer.id !== editCardId)
            setEmployers([editedEmployer, ...filteredEditedEmployers]);
            setEditCardId(null)
            setIsAdding(false);
            return
        }

        const employer: Employer = {
            ...editedEmployer,
            id: Date.now().toString(),
            interviews: [],
            createdAt: new Date().toISOString(),
        };
        setEmployers([employer, ...employers]);
        setIsAdding(false);
          return employer
    }

    return (<div className="mb-6 bg-white rounded-lg shadow-md p-6">
        <form onSubmit={handleEditEmployer} className="space-y-4">
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                    Название компании
                </label>
                <input
                    type="text"
                    value={editedEmployer?.companyName || ''}
                    onChange={(e) =>
                        setEditedEmployer({
                            ...editedEmployer,
                            companyName: e.target.value,
                        })
                    }
                    className="w-full px-3 py-2 border rounded-md"
                    required
                />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                    Описание
                </label>
                <textarea
                    value={editedEmployer?.description || ''}
                    onChange={(e) =>
                        setEditedEmployer({
                            ...editedEmployer,
                            description: e.target.value,
                        })
                    }
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
                    value={editedEmployer?.hrName || ''}
                    onChange={(e) =>
                        setEditedEmployer({...editedEmployer, hrName: e.target.value})
                    }
                    className="w-full px-3 py-2 border rounded-md"
                />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                    Контакты
                </label>
                <input
                    type="text"
                    value={editedEmployer?.contacts || ''}
                    onChange={(e) =>
                        setEditedEmployer({...editedEmployer, contacts: e.target.value})
                    }
                    className="w-full px-3 py-2 border rounded-md"
                    placeholder="Email, телефон, etc."
                />
            </div>
            <div className="flex justify-end gap-2">
                <button
                    type="button"
                    onClick={handleCancelEditEmployer}
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
    </div>)
}


const getEditedEmployer = (employers: Employer[], editCardId: string | null) => {
    const newEmployerTemp: Employer = {
        companyName: "",
        description: "",
        hrName: "",
        contacts: "",
        id: "",
        interviews: [],
        createdAt: ""
    };

    if (editCardId) {
        const foundEmployer = employers.find((emp) => emp.id === editCardId);
        if (!foundEmployer) {
            return newEmployerTemp
        }
        return foundEmployer
    }
    return newEmployerTemp

}
