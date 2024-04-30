import { ToDoList } from '@/pages/Dashboard/TodoList';
import { createFileRoute, createLazyFileRoute } from '@tanstack/react-router';


const About = () => {
	return <div>About</div>;
}

export const Route = createLazyFileRoute('/dashboard/about')({
	component: About,
});
