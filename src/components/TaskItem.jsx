import { memo, useCallback } from 'react'
import { FiMenu, FiTrash2 } from 'react-icons/fi'
import { useTaskContext } from '../hooks/useTaskContext'

const TaskItem = ({ task, dragHandleProps, draggableProps, innerRef, isDragging }) => {
  const { toggleTask, deleteTask, removeDeletedTask } = useTaskContext()

  const handleToggle = useCallback(() => {
    toggleTask(task.id)
  }, [task.id, toggleTask])

  const handleDelete = useCallback(() => {
    deleteTask(task.id)
  }, [deleteTask, task.id])

  const handleTransitionEnd = useCallback(
    (event) => {
      if (event.propertyName !== 'max-height' || !task.deleting) {
        return
      }
      removeDeletedTask(task.id)
    },
    [removeDeletedTask, task.deleting, task.id],
  )

  return (
    <article
      className={`task-card ${task.completed ? 'completed' : ''} ${task.deleting ? 'deleting' : ''} ${isDragging ? 'dragging' : ''}`}
      ref={innerRef}
      onTransitionEnd={handleTransitionEnd}
      {...draggableProps}
    >
      <button
        aria-label={`Drag ${task.text}`}
        className="btn drag-handle"
        type="button"
        {...dragHandleProps}
      >
        <FiMenu />
      </button>

      <label className="checkbox-wrap">
        <input checked={task.completed} onChange={handleToggle} type="checkbox" />
        <span className="checkbox-custom" />
      </label>

      <p className="task-text">{task.text}</p>

      <button
        aria-label={`Delete ${task.text}`}
        className="btn btn-icon"
        onClick={handleDelete}
        type="button"
      >
        <FiTrash2 />
      </button>
    </article>
  )
}

export default memo(TaskItem)
