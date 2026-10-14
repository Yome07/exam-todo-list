/**
 * Composant qui affiche la liste filtrée ou non des tâches
 * 
 * @component
 * @param {Object} props - Les propriétés du composant
 * @param {Array} props.tasks - Tableau contenant toutes les tâches
 * @param {string} props.filterCategory - Catégorie sélectionnée pour filtrer les tâches
 * @param {Function} props.toggleTaskCompleted - Fonction pour basculer l'état de complétion d'une tâche
 * @param {Function} props.removeTask - Fonction pour supprimer une tâche
 * @returns {JSX.Element} Liste des tâches filtrées ou message si aucune tâche
 */
import TaskItem from './TaskItem';

const TasksList = ({tasks, filterCategory, toggleTaskCompleted, removeTask}) => {

    
    const filteredTasks = filterCategory === 'Toutes les catégories' 
        ? tasks 
        : tasks.filter(task => task.category === filterCategory);

    return (
        <div className="tasks-list">
            <h5 className="mb-3">Liste des tâches</h5>
            {filteredTasks.length === 0 && (
                <div className="alert alert-info text-center" role="alert">
                    Aucune tâche à afficher.
                </div>
            )}
            {filteredTasks.length > 0 && filteredTasks.map((task, index) => (
                <TaskItem 
                    key={index}
                    task={task}
                    toggleTaskCompleted={toggleTaskCompleted}
                    removeTask={removeTask}
                />
            ))}    
        </div>
    );
}

export default TasksList