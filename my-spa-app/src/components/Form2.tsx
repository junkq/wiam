import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FormContext } from '../context/FormContext';
import useFetchCategories from '../hooks/useFetchCategories';

const Form2: React.FC = () => {
  const { formData, setFormData } = useContext(FormContext)!;
  const navigate = useNavigate();
  const [errors, setErrors] = useState<string[]>([]);
  const categories = useFetchCategories();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: string[] = [];

    if (!formData.workplace) newErrors.push("Место работы обязательно для заполнения");
    if (!formData.address) newErrors.push("Адрес проживания обязателен для заполнения");

    if (newErrors.length > 0) {
      setErrors(newErrors);
      return;
    }

    navigate('/form3');
  };

  return (
    <div className="container">
      <h2>Адрес и место работы</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>Место работы</label>
            <select className="form-control" value={formData.workplace} onChange={(e) => setFormData({ ...formData, workplace: e.target.value })} required>
              <option value="">Выберите место работы</option>
              {categories.map((category, index) => (
                <option key={index} value={category.slug}>{category.name}</option>
              ))}
            </select>
        </div>
        <div className="mb-3">
          <label>Адрес проживания</label>
          <input type="text" className="form-control" value={formData.address} onChange={(e) => setFormData({ ...formData, address: e.target.value })} required />
        </div>
        {errors.length > 0 && (
          <div className="alert alert-danger">
            {errors.map((error, index) => (
              <div key={index}>{error}</div>
            ))}
          </div>
        )}
        <button type="button" className="btn btn-secondary" onClick={() => navigate('/')}>Назад</button>
        <button type="submit" className="btn btn-primary">Далее</button>
      </form>
    </div>
  );
};

export default Form2;
