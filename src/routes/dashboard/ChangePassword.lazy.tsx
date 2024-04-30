import { ChangePassword } from '@/pages/Dashboard/ChangePassword';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/dashboard/ChangePassword')({
	component: ChangePassword,
});
