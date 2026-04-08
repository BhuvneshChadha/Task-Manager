import { useCallback } from 'react'
import { useTaskContext } from '../hooks/useTaskContext'

const filterOptions = [
  { id: 'all', label: 'All' },
  { id: 'completed', label: 'Completed' },
  { id: 'pending', label: 'Pending' },
]

const FilterBar = () => {
  const { filter, filterTasks, stats } = useTaskContext()

  const handleSelect = useCallback(
    (nextFilter) => {
      filterTasks(nextFilter)
    },
    [filterTasks],
  )

  return (
    <section className="filter-wrap">
      <div className="filter-buttons">
        <span
          aria-hidden="true"
          className={`filter-indicator ${filter}`}
        />
        {filterOptions.map((option) => (
          <button
            key={option.id}
            className={`btn btn-filter ${filter === option.id ? 'active' : ''}`}
            onClick={() => handleSelect(option.id)}
            type="button"
          >
            {option.label}
          </button>
        ))}
      </div>
      <p className="task-stats">
        <strong>{stats.completed}</strong> of <strong>{stats.total}</strong> done
      </p>
    </section>
  )
}

export default FilterBar
