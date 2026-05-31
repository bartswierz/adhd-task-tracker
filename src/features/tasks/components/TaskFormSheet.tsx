import { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import TaskForm from "./TaskForm";
import useTaskActions from "../hooks/useTaskActions";
import type { Difficulty } from "@/types";

interface TaskFormSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function TaskFormSheet({
  open,
  onOpenChange,
}: TaskFormSheetProps) {
  const [isLoading, setIsLoading] = useState(false);
  const { handleAddTask } = useTaskActions();

  const handleSubmit = async (title: string, difficulty: Difficulty) => {
    setIsLoading(true);
    handleAddTask(title, difficulty);
    setIsLoading(false);
    onOpenChange(false);
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="bottom" className="rounded-t-lg">
        <SheetHeader>
          <SheetTitle>Add a new task</SheetTitle>
          <SheetDescription>What do you want to accomplish?</SheetDescription>
        </SheetHeader>
        <div className="py-6 px-[2%]">
          <TaskForm onSubmit={handleSubmit} isLoading={isLoading} />
        </div>
      </SheetContent>
    </Sheet>
  );
}
