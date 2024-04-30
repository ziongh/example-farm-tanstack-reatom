import { globalCtx } from '@/features/ctx';
import { Checkbox } from '@mantine/core';
import { type AtomMut, type Ctx, action, atom } from '@reatom/framework';
import { useAction, useAtom } from '@reatom/npm-react';
import { memo, useRef } from 'preact/compat';

type ITodo = { text: string; completed: AtomMut<boolean> };

const todosAtom2 = atom<ITodo[]>([
	{ text: 'Write my first post', completed: atom(true) },
	{ text: 'Buy new groceries', completed: atom(false) },
	{ text: 'Walk the dog', completed: atom(false) },
]);

const completedCountAtom2 = atom((ctx) =>
	ctx
		.spy(todosAtom2)
		.reduce((acc, { completed }) => acc + (ctx.spy(completed) ? 1 : 0), 0),
);

const addTodoAction = action((ctx, text: string) => {
	todosAtom2(ctx, [...ctx.get(todosAtom2), { text, completed: atom(false) }]);
}, 'addTodo');

const removeTodoAction = action((ctx, index: number) => {
	todosAtom2(
		ctx,
		ctx.get(todosAtom2).filter((_, i) => i !== index),
	);
}, 'removeTodoAction');

function areEqual(
	prevProps: { completed: AtomMut<boolean>; text: string; index: any },
	nextProps: {
		completed: AtomMut<boolean>;
		text: string;
		index: any;
		ctx: Ctx;
	},
) {
	if (prevProps.text !== nextProps.text) {
		return false;
	}

	if (prevProps.index !== nextProps.index) {
		return false;
	}

	if (
		nextProps.ctx.get(prevProps.completed) !==
		nextProps.ctx.get(nextProps.completed)
	) {
		return false;
	}

	return true;
}

const TodoItem = memo(({ text, completed, index, ctx }) => {
	const [done] = useAtom(completed);
	const removeTodo = useAction(removeTodoAction);
	const onCheckboxChange = (event: { currentTarget: { checked: boolean } }) => {
		completed(ctx, event.currentTarget.checked);
	};
	return (
		<div class='mb-2 flex-row items-center'>
			<Checkbox
				onChange={onCheckboxChange}
				defaultChecked={done}
			/>
			{done ? <s>{text}</s> : text}{' '}
			<button
				type={'button'}
				onClick={() => removeTodo(index)}>
				X
			</button>
		</div>
	);
}, areEqual);

export function ChangePassword() {
	const inputRef = useRef<HTMLInputElement>(null);
	const addTodo = useAction(addTodoAction);
	return (
		<div class='p-2'>
			<div class='flex-row'>
				<input
					type={'text'}
					class='grow'
					ref={inputRef}
				/>
				<button
					type={'button'}
					class='shrink'
					onClick={() => addTodo(inputRef.current?.value ?? '')}>
					Add
				</button>
			</div>
			<div class='p-2'>
				<TodoListInner />
				<TodoCounter />
			</div>
		</div>
	);
}

function TodoCounter() {
	const [completedCount] = useAtom(completedCountAtom2);
	return <p>Completed count: {completedCount}</p>;
}

function TodoListInner() {
	const [todos] = useAtom(todosAtom2);
	const elements = todos.map((todo, index) => (
		<TodoItem
			key={todo.text}
			text={todo.text}
			completed={todo.completed}
			index={index}
			ctx={globalCtx}
		/>
	));
	return <ul>{elements}</ul>;
}
