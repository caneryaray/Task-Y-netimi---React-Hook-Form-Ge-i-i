import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './app.css';

// Başlangıç verileri
const initialTasks = [
  { id: 2, title: 'Task 1', description: 'Description 1', assignedTo: ['Ali'], status: 'yapılacak' },
  { id: 3, title: 'Task 2', description: 'Description 2', assignedTo: ['Veli'], status: 'yapılacak' },
  { id: 4, title: 'Task 3', description: 'Description 3', assignedTo: ['Ali', 'Veli'], status: 'yapılacak' },
];
const initialTeam = [
  { id: 1, name: 'Ali' },
  { id: 2, name: 'Veli' },
];

// Task component
function Task({ taskObj, onComplete }) {
  return (
    <div className="task-card">
      <h4>{taskObj.title}</h4>
      <p>{taskObj.description}</p>
      <p><b>Atanan:</b> {taskObj.assignedTo.join(', ')}</p>
      {taskObj.status === 'yapılacak' && (
        <button onClick={() => onComplete(taskObj.id)}>Tamamlandı</button>
      )}
    </div>
  );
}

// TaskHookForm component
function TaskHookForm({ kisiler, submitFn }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm({ mode: 'onChange' });

  const onSubmit = (data) => {
    const yeniTask = {
      id: Date.now(),
      title: data.title,
      description: data.description,
      assignedTo: data.assignedTo,
      status: 'yapılacak'
    };
    submitFn(yeniTask);
    toast.success("Yeni görev oluşturuldu.");
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label htmlFor="title">Başlık</label>
        <input
          id="title"
          name="title"
          {...register('title', { 
            required: 'Task başlığı yazmalısınız.', 
            minLength: { value: 3, message: 'Task başlığı en az 3 karakter olmalı.' } 
          })}
        />
        {errors.title && <p>{errors.title.message}</p>}
      </div>

      <div>
        <label htmlFor="description">Açıklama</label>
        <textarea
          id="description"
          name="description"
          {...register('description', { 
            required: 'Task açıklaması yazmalısınız.', 
            minLength: { value: 10, message: 'Task açıklaması en az 10 karakter olmalı.' } 
          })}
        />
        {errors.description && <p>{errors.description.message}</p>}
      </div>

      <div>
        <label>İsim</label>
        {kisiler?.map((kisi) => (
          <div key={kisi.id}>
            <label>
              <input
                type="checkbox"
                {...register('assignedTo', {
                  validate: (value) => {
                    if (!value || value.length < 1) return 'Lütfen en az bir kişi seçin.';
                    if (value.length > 3) return 'En fazla 3 kişi seçebilirsiniz.';
                    return true;
                  }
                })}
                value={kisi.name}
              />
              {kisi.name}
            </label>
          </div>
        ))}
        {errors.assignedTo && <p>{errors.assignedTo.message}</p>}
      </div>

      <button type="submit">Kaydet</button>
    </form>
  );
}

// PeopleForm component
function PeopleForm({ submitFn }) {
  const [name, setName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) return;
    const yeniKisi = { id: Date.now(), name };
    submitFn(yeniKisi);
    toast.success("Yeni kişi oluşturuldu.");
    setName('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="personName">İsim</label>
      <input
        id="personName"
        name="personName"
        type="text"
        placeholder="Yeni kişi adı"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <button type="submit">Ekle</button>
    </form>
  );
}

// App component
export default function App() {
  const [tasks, setTasks] = useState(initialTasks);
  const [team, setTeam] = useState(initialTeam);

  const handleTaskSubmit = (yeniTask) => {
    setTasks([yeniTask, ...tasks]);
  };

  const handlePeopleSubmit = (yeniKisi) => {
    setTeam([...team, yeniKisi]);
  };

  const handleComplete = (id) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, status: 'yapıldı' } : t))
    );
    toast.success(`${id} idli görev tamamlandı.`);
  };

  return (
    <div className="app">
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        closeOnClick
        pauseOnHover
        draggable
        newestOnTop={false}
      />

      <div className="formColumn">
        <div className="form-container">
          <h2>Yeni Task</h2>
          <TaskHookForm kisiler={team} submitFn={handleTaskSubmit} />
        </div>

        <div className="form-container">
          <h2>Yeni Kişi</h2>
          <PeopleForm submitFn={handlePeopleSubmit} />
        </div>
      </div>

      <div className="columns">
        <div className="column">
          <h2 className="column-title">Yapılacaklar</h2>
          <div className="column-list">
            {tasks
              .filter((t) => t.status === 'yapılacak')
              .map((t) => (
                <Task key={t.id} taskObj={t} onComplete={handleComplete} />
              ))}
          </div>
        </div>

        <div className="column">
          <h2 className="column-title">Tamamlananlar</h2>
          <div className="column-list">
            {tasks
              .filter((t) => t.status === 'yapıldı')
              .map((t) => (
                <Task key={t.id} taskObj={t} />
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}