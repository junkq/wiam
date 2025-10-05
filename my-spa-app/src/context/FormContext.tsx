import React, { createContext, useState, ReactNode } from 'react';

interface FormData {
  firstName: string;
  lastName: string;
  phone: string;
  gender: string;
  address: string;
  workplace: string;
  loanAmount: number;
  loanTerm: number;
}

interface FormContextType {
  formData: FormData;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
}

export const FormContext = createContext<FormContextType | undefined>(undefined);

export const FormProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    phone: '',
    gender: '',
    address: '',
    workplace: '',
    loanAmount: 200,
    loanTerm: 10,
  });

  return (
    <FormContext.Provider value={{ formData, setFormData }}>
      {children}
    </FormContext.Provider>
  );
};
