/**
 * Composant principal de l'application To-Do List.
 * 
 * Gère l'état global de l'application incluant les tâches, les catégories et le filtrage.
 * Permet d'ajouter des catégories, créer des tâches, filtrer les tâches par catégorie,
 * marquer les tâches comme complétées et les supprimer.
 * 
 * @component
 * @returns {JSX.Element} L'interface principale de la To-Do List avec formulaires et liste des tâches.
 */
import { useState } from 'react'
import './App.css'
import DropdownList from './components/DropdownList';
import FormCategory from './components/FormCategory';
import FormTask from './components/FormTask';
import TasksList from './components/TasksList';
import CategoryFilter from './components/CategoryFilter';

function App() {
  const [tasks, setTasks] = useState([]);
  const [categories, setCategories] = useState([]);
  const [filterCategory, setFilterCategory] = useState('Toutes les catégories');

  /**
   * Ajoute une nouvelle catégorie à la liste des catégories.
   * 
   * @param {string} newCategory - Le nom de la nouvelle catégorie à ajouter.
   * @returns {void}
   */
  const addCategory = (newCategory) => {
    setCategories([...categories, newCategory]);
  }

  /**
   * Ajoute une nouvelle tâche à la liste des tâches.
   * 
   * @param {Object} newTask - L'objet tâche à ajouter.
   * @returns {void}
   */
  const addTask = (newTask) => {
    setTasks([...tasks, newTask]);
  }

  /**
   * Supprime une tâche de la liste des tâches.
   * 
   * @param {Object} task - L'objet tâche à supprimer.
   * @returns {void}
   */
  const removeTask = (task) => {
    setTasks(prevTasks => prevTasks.filter(t => t !== task));
  }

  /**
   * Définit la catégorie à filtrer pour afficher les tâches.
   * 
   * @param {string} category - La catégorie sélectionnée pour le filtrage.
   * @returns {void}
   */
  const filterByCategory = (category) => {
    setFilterCategory(category);
  }

  /**
   * Inverse le statut 'completed' d'une tâche donnée dans l'état des tâches.
   * 
   * @param {Object} task - L'objet tâche à modifier.
   * @returns {void}
   */
  const toggleTaskCompleted = (task) => {
    setTasks(prevTasks => 
      prevTasks.map(t => 
        t === task 
          ? { ...t, completed: !t.completed }  // Créer nouvelle tâche avec completed inversé
          : t                                   // Garder les autres tâches inchangées
      )
    );
  }

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Ma To-Do List par Catégories</h1>
      
      <div className="card shadow-sm mb-4">
        <div className="card-body">
          <FormCategory 
            categories={categories} 
            addCategory={addCategory} 
          />
          
          <CategoryFilter 
            categories={categories}
            filterCategory={filterCategory}
            onFilterChange={filterByCategory}
          />
          
          <FormTask 
            categories={categories} 
            addTask={addTask} 
          />
        </div>
      </div>
      
      <TasksList 
        tasks={tasks} 
        filterCategory={filterCategory} 
        toggleTaskCompleted={toggleTaskCompleted}
        removeTask={removeTask}
      />
    </div>
  )
}

export default App
