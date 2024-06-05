// __tests__/TaskManager.test.js
import { render, screen, fireEvent } from '@testing-library/react';
import TaskManager from '../components/TaskManager';

describe('TaskManager', () => {
  it('renders the task manager', () => {
    render(<TaskManager />);
    expect(screen.getByText('Task Manager')).toBeInTheDocument();
  });

  it('adds a new task', () => {
    render(<TaskManager />);
    fireEvent.change(screen.getByPlaceholderText('Add a new task'), {
      target: { value: 'New Task' },
    });
    fireEvent.click(screen.getByText('Add Task'));
    expect(screen.getByText('New Task')).toBeInTheDocument();
  });

  it('marks a task as completed', () => {
    render(<TaskManager />);
    fireEvent.change(screen.getByPlaceholderText('Add a new task'), {
      target: { value: 'New Task' },
    });
    fireEvent.click(screen.getByText('Add Task'));
    fireEvent.click(screen.getByRole('checkbox'));
    expect(screen.getByRole('checkbox')).toBeChecked();
  });

  it('deletes a task', () => {
    render(<TaskManager />);
    fireEvent.change(screen.getByPlaceholderText('Add a new task'), {
      target: { value: 'New Task' },
    });
    fireEvent.click(screen.getByText('Add Task'));
    fireEvent.click(screen.getByText('Delete'));
    expect(screen.queryByText('New Task')).not.toBeInTheDocument();
  });

  it('filters tasks by status', () => {
    render(<TaskManager />);
    fireEvent.change(screen.getByPlaceholderText('Add a new task'), {
      target: { value: 'Task 1' },
    });
    fireEvent.click(screen.getByText('Add Task'));
    fireEvent.change(screen.getByPlaceholderText('Add a new task'), {
      target: { value: 'Task 2' },
    });
    fireEvent.click(screen.getByText('Add Task'));
    fireEvent.click(screen.getByRole('checkbox', { name: '' }));
    fireEvent.click(screen.getByText('Active'));
    expect(screen.queryByText('Task 1')).not.toBeInTheDocument();
    expect(screen.getByText('Task 2')).toBeInTheDocument();
    fireEvent.click(screen.getByText('Completed'));
    expect(screen.getByText('Task 1')).toBeInTheDocument();
    expect(screen.queryByText('Task 2')).not.toBeInTheDocument();
  });
});
