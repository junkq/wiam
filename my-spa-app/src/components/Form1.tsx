import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FormContext } from '../context/FormContext';

const Form1: React.FC = () => {
  const { formData, setFormData } = useContext(FormContext)!;
  const navigate = useNavigate();
  const [errors, setErrors] = useState<string[]>([]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: string[] = [];

    if (!formData.phone.match(/^(\()?\d{3}(\))?(-|\s)?\d{3}(-|\s)\d{4}$/)) newErrors.push("Телефон должен быть в формате 123-456-7890");
    if (!formData.firstName) newErrors.push("Имя обязательно для заполнения");
    if (!formData.lastName) newErrors.push("Фамилия обязательна для заполнения");
    if (!formData.gender) newErrors.push("Пол обязателен для заполнения");

    if (newErrors.length > 0) {
      setErrors(newErrors);
      return;
    }

    navigate('/form2');
  };

  return (
    <div className="container">
      <h2>Личные данные</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>Телефон</label>
          <input type="tel" className="form-control" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} required />
        </div>
        <div className="mb-3">
          <label>Имя</label>
          <input type="text" className="form-control" value={formData.firstName} onChange={(e) => setFormData({ ...formData, firstName: e.target.value })} required />
        </div>
        <div className="mb-3">
          <label>Фамилия</label>
          <input type="text" className="form-control" value={formData.lastName} onChange={(e) => setFormData({ ...formData, lastName: e.target.value })} required />
        </div>
        <div className="mb-3">
          <label>Пол</label>
          <select className="form-control" value={formData.gender} onChange={(e) => setFormData({ ...formData, gender: e.target.value })} required>
            <option value="">Выберите пол</option>
            <option value="Мужской">Мужской</option>
            <option value="Женский">Женский</option>
          </select>
        </div>
        {errors.length > 0 && (
          <div className="alert alert-danger">
            {errors.map((error, index) => (
              <div key={index}>{error}</div>
            ))}
          </div>
        )}
        <button type="submit" className="btn btn-primary">Далее</button>
      </form>
    </div>
  );
};

export default Form1;
