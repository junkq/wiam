import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { FormProvider } from './context/FormContext';
import Form1 from './components/Form1';
import Form2 from './components/Form2';
import Form3 from './components/Form3';

const App: React.FC = () => {
  return (
    <FormProvider>
      <Routes>
        <Route path="/" element={<Form1 />} />
        <Route path="/form2" element={<Form2 />} />
        <Route path="/form3" element={<Form3 />} />
      </Routes>
    </FormProvider>
  );
};

export default App;
