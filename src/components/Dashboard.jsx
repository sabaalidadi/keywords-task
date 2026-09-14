import { DndContext, PointerSensor, KeyboardSensor, closestCenter, useSensor, useSensors } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { DashboardProvider, useDashboardContext } from "../context/DashboardContext";
import DashboardToolbar from "./dashboard/DashboardToolbar";
import TranslationForm from "./dashboard/TranslationForm";
import TranslationList from "./dashboard/TranslationList";
import DeleteDialog from "./dashboard/DeleteDialog";

function DashboardContent() {
  const { filteredKeywords, reorderKeywords } = useDashboardContext();

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } }),
    useSensor(KeyboardSensor)
  );

  return (
    <div className="min-h-full pb-10">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-xl font-semibold text-slate-900">ترجمه‌ها</h1>
          <p className="mt-1 text-xs text-slate-400">مدیریت محتوای چندزبانه</p>
        </div>
        <DashboardToolbar />
      </div>

      <div className="mb-6">
        <TranslationForm />
      </div>

      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={({ active, over }) => reorderKeywords(active.id, over?.id)}
      >
        <SortableContext
          items={filteredKeywords.map((item) => String(item.id))}
          strategy={verticalListSortingStrategy}
        >
          <TranslationList />
        </SortableContext>
      </DndContext>

      <DeleteDialog />
    </div>
  );
}

export default function Dashboard() {
  return (
    <DashboardProvider>
      <DashboardContent />
    </DashboardProvider>
  );
}
