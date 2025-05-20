"use client";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import ToDoCard from "@/components/ToDoCard";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/store";

export default function Home() {
  const todos = useSelector((state: RootState) => state.todo);
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  return (
    <section className="flex w-full  flex-col  items-center bg-gradient-to-b from--500 to-blue-500 ">
      <ToDoCard />
    </section>
  );
}
