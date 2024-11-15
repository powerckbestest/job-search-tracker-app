import React, {FC, useState} from "react";
import {Employer} from "../types.ts";
import {RootState, useAppDispatch} from "../model/store.ts";
import {selectValueEditingEmployerId, valuesSlice} from "../model/values.ts";
import {employersSelectors, employersSlice} from "../model/employers.ts";
import {useSelector} from "react-redux";

const newEmployerTemp: Employer = {
    companyName: "",
    description: "",
    hrName: "",
    contacts: "",
    id: "",
    interviews: [],
    createdAt: ""
};

export const EditEmployerCard: FC = () => {

const dispatch = useAppDispatch();

const foundEmployerId = useSelector(selectValueEditingEmployerId);

const foundEmployerById =  useSelector((state:RootState)=>employersSelectors.selectById(state,foundEmployerId))

    const [currentEmployer,setCurrentEmployer] = useState<Employer>(foundEmployerById || newEmployerTemp);

    const handleCancelEditEmployer = (e: React.FormEvent) => {
        e.preventDefault();
        dispatch(valuesSlice.actions.resetEditingEmployerId());
        dispatch(valuesSlice.actions.setIsAdding(false));
    }

    const handleSubmitEmployer = (e: React.FormEvent) => {
        e.preventDefault();

        if (foundEmployerId){
            dispatch(employersSlice.actions.upsertEmployer(currentEmployer));
            dispatch(valuesSlice.actions.resetEditingEmployerId());
            dispatch(valuesSlice.actions.setIsAdding(false));
            return
        }

        const employer: Employer = {
            ...currentEmployer,
            id: Date.now().toString(),
            interviews: [],
            createdAt: new Date().toISOString(),
        };
        dispatch(employersSlice.actions.upsertEmployer(employer));
        dispatch(valuesSlice.actions.setIsAdding(false));
          return employer
    }

    return (<div className="mb-6 bg-white rounded-lg shadow-md p-6">
        <form onSubmit={handleSubmitEmployer} className="space-y-4">
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                    Название компании
                </label>
                <input
                    type="text"
                    data-testid="companyName"
                    value={currentEmployer?.companyName || ''}
                    onChange={(e) =>
                        setCurrentEmployer({
                            ...currentEmployer,
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
                    data-testid="description"
                    value={currentEmployer?.description || ''}
                    onChange={(e) =>
                        setCurrentEmployer({
                            ...currentEmployer,
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
                    data-testid="hrName"
                    type="text"
                    value={currentEmployer?.hrName || ''}
                    onChange={(e) =>
                        setCurrentEmployer({...currentEmployer, hrName: e.target.value})
                    }
                    className="w-full px-3 py-2 border rounded-md"
                />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                    Контакты
                </label>
                <input
                    data-testid="contacts"
                    type="text"
                    value={currentEmployer?.contacts || ''}
                    onChange={(e) =>
                        setCurrentEmployer({...currentEmployer, contacts: e.target.value})
                    }
                    className="w-full px-3 py-2 border rounded-md"
                    placeholder="Email, телефон, etc."
                />
            </div>
            <div className="flex justify-end gap-2">
                <button
                    data-testid="cancel"
                    type="button"
                    onClick={handleCancelEditEmployer}
                    className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-md"
                >
                    Отмена
                </button>
                <button
                    data-testid="save"
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                    Сохранить
                </button>
            </div>
        </form>
    </div>)
}


