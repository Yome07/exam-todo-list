import { cleanup, render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { afterEach, describe, expect, it } from 'vitest'
import App from './App'

afterEach(cleanup)

describe('To-Do List', () => {
  it('affiche un message quand aucune tâche n’existe', () => {
    render(<App />)

    expect(screen.getByRole('alert').textContent).toContain('Aucune tâche à afficher.')
  })

  it('ajoute des catégories et des tâches, puis filtre par catégorie', async () => {
    const user = userEvent.setup()
    render(<App />)

    await user.type(screen.getByPlaceholderText('Nouvelle catégorie'), 'Travail')
    await user.click(screen.getByRole('button', { name: 'Ajouter catégorie' }))
    await user.type(screen.getByPlaceholderText('Nouvelle catégorie'), 'Personnel')
    await user.click(screen.getByRole('button', { name: 'Ajouter catégorie' }))

    const [categoryFilter, taskCategory] = screen.getAllByRole('combobox')
    await user.selectOptions(taskCategory, 'Travail')
    await user.type(screen.getByPlaceholderText('Nouvelle tâche'), 'Préparer le rapport')
    await user.click(screen.getByRole('button', { name: 'Ajouter', exact: true }))

    await user.selectOptions(taskCategory, 'Personnel')
    await user.type(screen.getByPlaceholderText('Nouvelle tâche'), 'Lire un livre')
    await user.click(screen.getByRole('button', { name: 'Ajouter', exact: true }))

    expect(screen.getByText('Préparer le rapport (Travail)')).not.toBeNull()
    expect(screen.getByText('Lire un livre (Personnel)')).not.toBeNull()

    await user.selectOptions(categoryFilter, 'Travail')

    expect(screen.getByText('Préparer le rapport (Travail)')).not.toBeNull()
    expect(screen.queryByText('Lire un livre (Personnel)')).toBeNull()
  })

  it('permet de marquer une tâche comme terminée et de la supprimer', async () => {
    const user = userEvent.setup()
    render(<App />)

    await user.type(screen.getByPlaceholderText('Nouvelle catégorie'), 'Maison')
    await user.click(screen.getByRole('button', { name: 'Ajouter catégorie' }))
    await user.type(screen.getByPlaceholderText('Nouvelle tâche'), 'Ranger le bureau')
    await user.click(screen.getByRole('button', { name: 'Ajouter', exact: true }))

    const task = screen.getByText('Ranger le bureau (Maison)')
    const taskCard = task.closest('.card')
    const checkbox = within(taskCard).getByRole('checkbox')

    await user.click(checkbox)
    expect(checkbox.checked).toBe(true)
    expect(task.classList.contains('text-decoration-line-through')).toBe(true)

    await user.click(within(taskCard).getByRole('button', { name: 'Supprimer' }))
    expect(screen.queryByText('Ranger le bureau (Maison)')).toBeNull()
    expect(screen.getByRole('alert').textContent).toContain('Aucune tâche à afficher.')
  })
})
