import { useMemo, useRef, useState } from "react";
import toast from "react-hot-toast";
import { useAppContext } from "../context/AppContext";

import {
  DndContext,
  PointerSensor,
  KeyboardSensor,
  closestCenter,
  useSensor,
  useSensors,
} from "@dnd-kit/core";

import {
  SortableContext,
  verticalListSortingStrategy,
  arrayMove,
} from "@dnd-kit/sortable";

import DashboardToolbar from "./dashboard/DashboardToolbar";
import TranslationForm from "./dashboard/TranslationForm";
import TranslationList from "./dashboard/TranslationList";
import DeleteDialog from "./dashboard/DeleteDialog";

function Dashboard() {
  const { keywords, setKeywords } = useAppContext();

  const [editingId, setEditingId] = useState(null);

  const [editFormData, setEditFormData] = useState({
    key: "",
    fa: "",
    en: "",
    fr: "",
  });

  const [searchQuery, setSearchQuery] = useState("");

  const [deleteDialog, setDeleteDialog] = useState({
    open: false,
    id: null,
    keyName: "",
  });

  const fileInputRef = useRef(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(KeyboardSensor),
  );

  const filteredKeywords = useMemo(() => {
    const query = searchQuery.toLowerCase().trim();

    if (!query) {
      return keywords;
    }

    return keywords.filter((item) => {
      return (
        item.key?.toLowerCase().includes(query) ||
        item.fa?.toLowerCase().includes(query) ||
        item.en?.toLowerCase().includes(query) ||
        item.fr?.toLowerCase().includes(query)
      );
    });
  }, [keywords, searchQuery]);

  const handleDragEnd = ({ active, over }) => {
    if (!over || active.id === over.id) {
      return;
    }

    setKeywords((current) => {
      const oldIndex = current.findIndex(
        (item) => String(item.id) === String(active.id),
      );

      const newIndex = current.findIndex(
        (item) => String(item.id) === String(over.id),
      );

      if (oldIndex === -1 || newIndex === -1) {
        return current;
      }

      return arrayMove(current, oldIndex, newIndex);
    });
  };

  const handleStartEdit = (item) => {
    setEditingId(item.id);

    setEditFormData({
      key: item.key || "",
      fa: item.fa || "",
      en: item.en || "",
      fr: item.fr || "",
    });
  };

  const handleSaveEdit = (id) => {
    setKeywords((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              ...editFormData,
            }
          : item,
      ),
    );

    setEditingId(null);

    toast.success("ترجمه با موفقیت به‌روزرسانی شد");
  };

  const handleCancelEdit = () => {
    setEditingId(null);
  };

  const handleEditFieldChange = (field, value) => {
    setEditFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleDeleteClick = (id) => {
    const item = keywords.find((item) => item.id === id);

    if (!item) {
      return;
    }

    const translation =
      item.fa?.trim() || item.en?.trim() || item.fr?.trim() || "ترجمه بدون متن";

    setDeleteDialog({
      open: true,
      id,
      keyName: translation,
    });
  };

  const handleConfirmDelete = () => {
    const { id } = deleteDialog;

    setKeywords((prev) => prev.filter((item) => item.id !== id));

    setDeleteDialog({
      open: false,
      id: null,
      keyName: "",
    });

    toast.success("ترجمه با موفقیت حذف شد");
  };

  const handleCancelDelete = () => {
    setDeleteDialog({
      open: false,
      id: null,
      keyName: "",
    });
  };

  const handleExportJSON = () => {
    if (!keywords.length) {
      toast.error("داده‌ای برای خروجی گرفتن وجود ندارد");
      return;
    }

    const exportData = keywords.map((item) => ({
      key: item.key || "",
      fa: item.fa || "",
      en: item.en || "",
      fr: item.fr || "",
    }));

    const jsonString = JSON.stringify(exportData, null, 2);

    const blob = new Blob([jsonString], {
      type: "application/json;charset=utf-8",
    });

    const url = URL.createObjectURL(blob);

    const downloadAnchor = document.createElement("a");

    downloadAnchor.href = url;
    downloadAnchor.download = "translations.json";

    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    document.body.removeChild(downloadAnchor);

    URL.revokeObjectURL(url);

    toast.success("خروجی JSON با موفقیت ایجاد شد");
  };

  const handleImportJSON = (event) => {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    const reader = new FileReader();

    reader.onload = (loadEvent) => {
      try {
        const data = JSON.parse(loadEvent.target.result);

        if (!Array.isArray(data)) {
          throw new Error("Invalid JSON structure");
        }

        const importedItems = data
          .filter(
            (item) =>
              item && typeof item === "object" && typeof item.key === "string",
          )
          .map((item, index) => ({
            id: Date.now() + index,

            key: item.key.trim(),

            fa: typeof item.fa === "string" ? item.fa : "",

            en: typeof item.en === "string" ? item.en : "",

            fr: typeof item.fr === "string" ? item.fr : "",
          }));

        if (importedItems.length === 0) {
          toast.error("داده معتبری در فایل JSON پیدا نشد");
          return;
        }

        setKeywords((prev) => [...prev, ...importedItems]);

        toast.success(`${importedItems.length} ترجمه با موفقیت اضافه شد`);
      } catch {
        toast.error("ساختار فایل JSON معتبر نیست");
      }
    };

    reader.readAsText(file);

    event.target.value = "";
  };

  const handleAddTranslation = (values) => {
    const newEntry = {
      id: Date.now(),
      key: `word_${Date.now()}`,
      en: values.en || "",
      fa: values.fa || "",
      fr: values.fr || "",
    };

    setKeywords((prev) => [newEntry, ...prev]);

    toast.success("ترجمه جدید با موفقیت اضافه شد");
  };

  return (
    <div className="min-h-full pb-10">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-xl font-semibold text-slate-900">ترجمه‌ها</h1>

          <p className="mt-1 text-xs text-slate-400">مدیریت محتوای چندزبانه</p>
        </div>

        {/* Toolbar */}
        <div className="mb-5">
          <DashboardToolbar
            fileInputRef={fileInputRef}
            onExport={handleExportJSON}
            onImport={handleImportJSON}
          />
        </div>
      </div>

      {/* Add Translation */}
      <div className="mb-6">
        <TranslationForm onSubmit={handleAddTranslation} />
      </div>

      {/* Translation List */}
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={filteredKeywords.map((item) => String(item.id))}
          strategy={verticalListSortingStrategy}
        >
          <TranslationList
            items={filteredKeywords}
            totalCount={keywords.length}
            searchQuery={searchQuery}
            onSearch={setSearchQuery}
            editingId={editingId}
            editFormData={editFormData}
            onStartEdit={handleStartEdit}
            onSaveEdit={handleSaveEdit}
            onCancelEdit={handleCancelEdit}
            onEditFieldChange={handleEditFieldChange}
            onDelete={handleDeleteClick}
          />
        </SortableContext>
      </DndContext>

      {/* Delete Confirmation */}
      <DeleteDialog
        open={deleteDialog.open}
        keyName={deleteDialog.keyName}
        onCancel={handleCancelDelete}
        onConfirm={handleConfirmDelete}
      />
    </div>
  );
}

export default Dashboard;
