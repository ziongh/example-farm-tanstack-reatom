import { ToDoList } from '@/pages/Dashboard/TodoList';
import { createFileRoute, createLazyFileRoute } from '@tanstack/react-router';

export const Route = createLazyFileRoute('/dashboard/todo')({
	component: ToDoList,
});
