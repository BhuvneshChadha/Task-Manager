import { useCallback, useState } from 'react'
import { FiPlus } from 'react-icons/fi'
import { useTaskContext } from '../hooks/useTaskContext'

const TaskInput = () => {
  const { addTask } = useTaskContext()
  const [value, setValue] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = useCallback(
    (event) => {
      event.preventDefault()
      try {
        addTask(value)
        setValue('')
        setError('')
      } catch (submitError) {
        setError(submitError.message)
      }
    },
    [addTask, value],
  )

  return (
    <form className="task-input-form" onSubmit={handleSubmit}>
      <div className="task-input-shell">
        <input
          aria-label="Task title"
          className={`task-input ${error ? 'invalid' : ''}`}
          placeholder="Plan product launch checklist..."
          value={value}
          onChange={(event) => setValue(event.target.value)}
        />
        <button className="btn btn-primary" type="submit">
          <FiPlus />
          <span>Add Task</span>
        </button>
      </div>
      {error ? <p className="field-error">{error}</p> : null}
    </form>
  )
}

export default TaskInput
