'use client'

import { useContext, useMemo, useState } from "react";
import { Clock, Check, Trash2, Plus, X } from "lucide-react";
import { Toggle } from "@/components/tailgrids/core/toggle";
import {
  NativeSelect,
  NativeSelectOption
} from "@/components/tailgrids/core/native-select";
import {
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRoot,
  TableRow
} from "@/components/tailgrids/core/table";
import { Pagination } from "@/components/tailgrids/core/pagination";
import { Spinner } from "@/components/tailgrids/core/spinner";
import { globalDataContext } from "@/context/globalData";

type TodoType = {
  id: number;
  title: string;
  completed: boolean;
};

export default function Page() {
  // ข้อมูล todos อยู่ที่ layout โหลดครั้งเดียว สลับแท็บแล้วไม่ต้องโหลดใหม่
  const ctx = useContext(globalDataContext)
  const todosRaw: TodoType[] = ctx.todos
  const setTodosRaw: React.Dispatch<React.SetStateAction<TodoType[]>> = ctx.setTodos
  const isLoading: boolean = ctx.todosLoading
  const [onlyWaiting, setOnlyWaiting] = useState(false);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newTitle, setNewTitle] = useState("");

  // ID อัตโนมัติ = ID สูงสุดที่มี + 1
  const nextId = todosRaw.reduce((max, t) => Math.max(max, t.id), 0) + 1;

  const todos = useMemo(
    () => todosRaw.filter((todo) => !onlyWaiting || !todo.completed),
    [todosRaw, onlyWaiting]
  );

  const totalPages = Math.max(1, Math.ceil(todos.length / itemsPerPage));
  const safePage = Math.min(currentPage, totalPages);
  const pageItems = todos.slice(
    (safePage - 1) * itemsPerPage,
    safePage * itemsPerPage
  );

  const waitingClick = (id: number) => {
    setTodosRaw((prev) =>
      prev.map((todo) => (todo.id === id ? { ...todo, completed: true } : todo))
    );
  };

  const deleteClick = (id: number) => {
    setTodosRaw((prev) => prev.filter((todo) => todo.id !== id));
  };

  const addClick = () => {
    setNewTitle("");
    setIsModalOpen(true);
  };

  const closeModal = () => setIsModalOpen(false);

  const submitAdd = (e: React.FormEvent) => {
    e.preventDefault();
    const title = newTitle.trim();
    if (title === "") return;

    // เพิ่มท้ายตาราง (สถานะ waiting)
    setTodosRaw((prev) => [...prev, { id: nextId, title, completed: false }]);

    // พาไปหน้าสุดท้าย เพื่อให้เห็นรายการที่เพิ่งเพิ่ม
    setCurrentPage(Math.ceil((todos.length + 1) / itemsPerPage));
    setIsModalOpen(false);
  };

  return (
    // todos container
    <div className="w-[600px] mx-auto mt-4">
      {/* controller */}
      <div className="flex justify-between items-center">
        {/* toggle */}
        <div className="flex items-center gap-2">
          <Toggle
            label="Show only"
            checked={onlyWaiting}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setOnlyWaiting(e.target.checked);
              setCurrentPage(1);
            }}
          />
          <span className="inline-flex items-center gap-1.5 rounded-md bg-amber-500 px-2.5 py-1 text-sm font-medium text-white">
            Waiting
            <Clock className="size-4" />
          </span>
        </div>

        {/* dropdown */}
        <div className="w-2/5">
          <NativeSelect
            placeholder="Select an option"
            value={itemsPerPage}
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
              setItemsPerPage(Number(e.target.value));
              setCurrentPage(1);
            }}
          >
            <NativeSelectOption value="5">5 items per page</NativeSelectOption>
            <NativeSelectOption value="10">10 items per page</NativeSelectOption>
            <NativeSelectOption value="50">50 items per page</NativeSelectOption>
          </NativeSelect>
        </div>
      </div>

      {/* table */}
      <div className="mt-4">
        <TableRoot>
          <TableHeader className="bg-black">
  <TableRow className="bg-black">
    <TableHead scope="col" className="bg-black text-white">ID</TableHead>
    <TableHead scope="col" className="bg-black text-white">Title</TableHead>
    <TableHead scope="col" className="bg-black text-white">
                <div className="flex items-center justify-end gap-3">
                  <span>Completed</span>
                  {/* ปุ่มบวก: เปิด modal เพิ่ม todo */}
                  <button
                    type="button"
                    onClick={addClick}
                    aria-label="Add todo"
                    className="inline-flex size-8 items-center justify-center rounded-md bg-blue-600 text-white transition-colors hover:bg-blue-700"
                  >
                    <Plus className="size-5" />
                  </button>
                </div>
              </TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {/* show spinner while loading */}
            {isLoading && (
              <TableRow>
                <TableCell colSpan={3}>
                  <Spinner className="mx-auto" />
                </TableCell>
              </TableRow>
            )}

            {!isLoading && todos.length === 0 && (
              <TableRow>
                <TableCell colSpan={3} className="text-center text-red-500">
                  No data, maybe connection refused (reload again)
                </TableCell>
              </TableRow>
            )}

            {pageItems.map((todo) => (
              <TableRow key={todo.id}>
                <TableCell>
                  <span className="inline-block rounded-md bg-slate-600 px-2.5 py-1 text-sm font-semibold text-white">
                    {todo.id}
                  </span>
                </TableCell>
                <TableCell>{todo.title}</TableCell>
                <TableCell>
                  <div className="flex items-center justify-end gap-2">
                    {todo.completed ? (
                      <span className="inline-flex items-center gap-1.5 rounded-md bg-green-700 px-3 py-1.5 text-sm font-medium text-white">
                        Done
                        <Check className="size-4" />
                      </span>
                    ) : (
                      <button
                        type="button"
                        onClick={() => waitingClick(todo.id)}
                        className="inline-flex items-center gap-1.5 rounded-md bg-amber-500 px-3 py-1.5 text-sm font-medium text-white transition-colors hover:bg-amber-600"
                      >
                        Waiting
                        <Clock className="size-4" />
                      </button>
                    )}

                    <button
                      type="button"
                      onClick={() => deleteClick(todo.id)}
                      aria-label={`Delete todo ${todo.id}`}
                      className="inline-flex items-center justify-center rounded-md bg-red-500 px-2.5 py-1.5 text-white transition-colors hover:bg-red-700"
                    >
                      <Trash2 className="size-4" />
                    </button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </TableRoot>
      </div>

      {/* pagination */}
      {todos.length > 0 && (
        <div className="mt-4 flex justify-center">
          <Pagination
            currentPage={safePage}
            totalPages={totalPages}
            onPageChange={(p) => setCurrentPage(p)}
          />
        </div>
      )}

      {/* modal: new todo */}
      {isModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 p-4 backdrop-blur-sm"
          onClick={closeModal}
          onKeyDown={(e) => e.key === "Escape" && closeModal()}
        >
          <form
            onSubmit={submitAdd}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl"
          >
            {/* header */}
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <span className="inline-flex size-9 items-center justify-center rounded-lg bg-blue-100 text-slate-800">
                  <Plus className="size-5" />
                </span>
                <h2 className="text-xl font-bold text-slate-900">New todo</h2>
              </div>
              <button
                type="button"
                onClick={closeModal}
                aria-label="Close"
                className="text-slate-400 transition-colors hover:text-slate-600"
              >
                <X className="size-5" />
              </button>
            </div>

            {/* ID (auto) */}
            <label className="mt-5 block text-sm text-slate-600">ID (Auto)</label>
            <input
              type="text"
              value={nextId}
              readOnly
              className="mt-2 w-full rounded-lg bg-slate-100 px-4 py-2.5 text-slate-800 outline-none"
            />

            {/* Title */}
            <label className="mt-4 block text-sm text-slate-600">Title</label>
            <input
              type="text"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              placeholder="Enter todo title"
              autoFocus
              className="mt-2 w-full rounded-lg border border-blue-300 px-4 py-2.5 text-slate-800 outline-none focus:ring-2 focus:ring-blue-300"
            />

            {/* footer */}
            <div className="mt-6 flex justify-end gap-3">
              <button
                type="button"
                onClick={closeModal}
                className="rounded-lg border border-slate-300 px-5 py-2.5 font-medium text-slate-800 transition-colors hover:bg-slate-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={newTitle.trim() === ""}
                className="rounded-lg bg-blue-600 px-5 py-2.5 font-medium text-white transition-colors hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
              >
                Add todo
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}