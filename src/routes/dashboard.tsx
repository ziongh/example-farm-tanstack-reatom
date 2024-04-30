import { DashBoardLayout } from '@/layouts/Dashboard';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/dashboard')({
	component: () => <DashBoardLayout />,
});
