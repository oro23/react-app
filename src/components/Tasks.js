import TodoList from "../data/Todo";
export default function Tasks() {
  return (
    <div>
      <ul>
        {TodoList.map((task) => (
          <li key={task.id}>
            {task.title} - {task.completed ? "Completed" : "Pending"}
          </li>
        ))}
      </ul>
    </div>
  );
}
