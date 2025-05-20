// ToDoCard.tsx
import { useEffect, useState } from "react";
import {
  DocumentCheckIcon,
  XCircleIcon,
  TrashIcon,
  PencilSquareIcon,
} from "@heroicons/react/24/outline";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import {
  addTodo,
  toggleTodo,
  deleteTodo,
  clearCompleted,
  setInitialTodos,
  updateTodo,
} from "@/lib/features/todos/todoSlice";

const ToDoCard = () => {
  const dispatch = useAppDispatch();
  const todos = useAppSelector((state) => state.todo);
  const [text, setText] = useState("");
  const [textEdit, setTextEdit] = useState("");
  const [errorCreate, setErrorCreate] = useState("");
  const [filter, setFilter] = useState<"all" | "active" | "completed">("all");
  const [editingId, setEditingId] = useState<number | null>(null);
  const filterLabels: Record<string, string> = {
    all: "Tất cả",
    active: "Chưa hoàn thành",
    completed: "Đã hoàn thành",
  };

  useEffect(() => {
    const stored = localStorage.getItem("todos");
    if (stored) {
      dispatch(setInitialTodos(JSON.parse(stored)));
    }
  }, [dispatch]);

  const handleAddTodo = () => {
    if (!text.trim()) {
      setErrorCreate("*Nội dung công việc không được để trống");
      return;
    }
    dispatch(addTodo(text));
    setText("");
    setErrorCreate("");
  };

  const filteredTodos = todos.filter((todo) => {
    if (filter === "active") return !todo.completed;
    if (filter === "completed") return todo.completed;
    return true;
  });

  return (
    <main className="min-h-screen flex items-center justify-center text-gray-800 p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-blue-600 text-3xl font-bold tracking-widest">
            TODO APP
          </h1>
        </div>

        {/* Input */}
        <div className="bg-white rounded-lg flex items-center px-4 py-3 shadow mb-4">
          <button
            onClick={handleAddTodo}
            className="text-gray-500 text-xl mr-3"
          >
            ＋
          </button>
          <input
            className="flex-1 outline-none"
            placeholder="Tạo mới công việc..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleAddTodo()}
          />
        </div>
        <span className="text-red-500 text-sm flex items-center mb-4">
          {errorCreate}
        </span>

        {/* List */}
        <div className="bg-white rounded-lg shadow max-h-96 overflow-y-auto">
          {filteredTodos.map((todo) => (
            <div key={todo.id} className="flex items-center px-4 py-4 ">
              {editingId === todo.id ? (
                <>
                  <input
                    className="flex-1 border border-0-500 px-2 py-1 rounded mr-2"
                    value={textEdit}
                    onChange={(e) => setTextEdit(e.target.value)}
                  />
                  <button
                    onClick={() => {
                      dispatch(updateTodo({ id: editingId, text: textEdit }));
                      setEditingId(null);
                    }}
                  >
                    <DocumentCheckIcon className="w-4 h-4 text-gray-400 hover:text-green-500 m-2" />
                  </button>
                  <button onClick={() => setEditingId(null)}>
                    <XCircleIcon className="w-4 h-4 text-gray-400 hover:text-red-500 m-2" />
                  </button>
                </>
              ) : (
                <>
                  <input
                    type="checkbox"
                    checked={todo.completed}
                    onChange={() => dispatch(toggleTodo(todo.id))}
                    className="mr-3 w-5 h-5"
                  />
                  <span
                    className={`flex-1 ${
                      todo.completed ? "line-through text-gray-400" : ""
                    }`}
                  >
                    {todo.text}
                  </span>
                  <button
                    onClick={() => {
                      setEditingId(todo.id);
                      setTextEdit(todo.text);
                    }}
                  >
                    <PencilSquareIcon className="w-4 h-4 text-gray-400 hover:text-green-500 m-2" />
                  </button>
                  <button onClick={() => dispatch(deleteTodo(todo.id))}>
                    <TrashIcon className="w-4 h-4 text-gray-400 hover:text-red-500" />
                  </button>
                </>
              )}
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="flex flex-wrap justify-between items-center gap-2 px-4 py-2 text-sm text-gray-500 bg-white rounded-lg shadow mt-2">
          <span>{todos.filter((t) => !t.completed).length} Còn lại</span>
          <div className="flex gap-2">
            {["all", "active", "completed"].map((f) => (
              <button
                key={f}
                className={`px-2 rounded ${
                  filter === f ? "text-blue-500 font-semibold" : ""
                } bg-amber-100 p-2`}
                onClick={() => setFilter(f as any)}
              >
                {filterLabels[f]}
              </button>
            ))}
          </div>
          <button
            className="flex-1 bg-amber-100 px-2 rounded text-red-500 font-semibold p-2 justify-center align-middle"
            onClick={() => dispatch(clearCompleted())}
          >
            Xóa công việc đã hoàn thành
          </button>
        </div>
      </div>
    </main>
  );
};

export default ToDoCard;
