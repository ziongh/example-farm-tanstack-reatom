import { DashBoardLayout } from '@/layouts/Dashboard';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/login')({
	component: () => <div>Login</div>,
});
