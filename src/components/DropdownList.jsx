/**
 * Composant de liste déroulante générique
 * 
 * @component
 * @param {Object} props - Les propriétés du composant
 * @param {Array} props.list - La liste des éléments à afficher dans le menu déroulant
 * @param {string} props.value - La valeur actuellement sélectionnée
 * @param {Function} props.onChange - Fonction de rappel appelée lors du changement de sélection
 * @returns {JSX.Element} Un élément select avec les options de la liste
 * 
 */
const DropdownList = ({list, value, onChange}) => {

    return (
        <select className="form-select" value={value} onChange={e => onChange(e.target.value)}>
            {list.map(el => (
                <option key={el} value={el}>{el}</option>
            ))}
        </select>
    );
}

export default DropdownList;