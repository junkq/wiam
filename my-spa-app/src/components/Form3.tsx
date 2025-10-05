import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FormContext } from '../context/FormContext';

const Form3: React.FC = () => {
  const { formData, setFormData } = useContext(FormContext)!;
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [loanConfirmation, setLoanConfirmation] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await axios.post('https://dummyjson.com/products/add', {
        title: `${formData.firstName} ${formData.lastName}`,
      });
      setLoanConfirmation(`Поздравляем, ${formData.lastName} ${formData.firstName}. Вам одобрена ${formData.loanAmount} на ${formData.loanTerm} дней.`);
      setShowModal(true);
    } catch (error) {
      console.error('Ошибка при отправке данных:', error);
    }
  };

  return (
    <div className="container">
      <h2>Параметры займа</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>Сумма займа ($200 - $1000)</label>
          <input type="range" min="200" max="1000" step="100" value={formData.loanAmount} onChange={(e) => setFormData({ ...formData, loanAmount: +e.target.value })} required />
        </div>
        <div className="mb-3">
          <label>Срок займа (10 - 30 дней)</label>
          <input type="range" min="10" max="30" step="1" value={formData.loanTerm} onChange={(e) => setFormData({ ...formData, loanTerm: +e.target.value })} required />
        </div>
        <button type="button" className="btn btn-secondary" onClick={() => navigate('/form2')}>Назад</button>
        <button type="submit" className="btn btn-primary">Подать заявку</button>
      </form>

      {showModal && (
        <div className="modal show" style={{ display: 'block' }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Подтверждение</h5>
                <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
              </div>
              <div className="modal-body">
                <p>{loanConfirmation}</p>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>Закрыть</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Form3;
