import { ChangePassword } from '@/pages/Dashboard/TodoList';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/dashboard/todo')({
	component: ChangePassword,
});
