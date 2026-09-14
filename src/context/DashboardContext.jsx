/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useMemo, useRef, useState } from "react";
import toast from "react-hot-toast";
import { useAppContext } from "./AppContext";
import { exportKeywordsToJSON, parseKeywordsJSON } from "../utils/jsonTransfer";

const DashboardContext = createContext(null);

export function DashboardProvider({ children }) {
  const {
    keywords,
    addKeyword,
    updateKeyword,
    deleteKeyword,
    reorderKeywords,
    appendKeywords,
  } = useAppContext();

  const fileInputRef = useRef(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editFormData, setEditFormData] = useState({
    key: "",
    fa: "",
    en: "",
    fr: "",
  });
  const [deleteDialog, setDeleteDialog] = useState({
    open: false,
    id: null,
    keyName: "",
  });

  const filteredKeywords = useMemo(() => {
    const query = searchQuery.toLowerCase().trim();
    if (!query) return keywords;
    return keywords.filter((item) =>
      [item.key, item.fa, item.en, item.fr].some((val) =>
        val?.toLowerCase().includes(query),
      ),
    );
  }, [keywords, searchQuery]);

  const startEdit = (item) => {
    setEditingId(item.id);
    setEditFormData({
      key: item.key || "",
      fa: item.fa || "",
      en: item.en || "",
      fr: item.fr || "",
    });
  };

  const saveEdit = (id) => {
    updateKeyword(id, editFormData);
    setEditingId(null);
  };

  const cancelEdit = () => setEditingId(null);

  const updateEditField = (field, value) => {
    setEditFormData((prev) => ({ ...prev, [field]: value }));
  };

  const requestDelete = (id) => {
    const item = keywords.find((k) => k.id === id);
    if (!item) return;
    setDeleteDialog({
      open: true,
      id,
      keyName:
        item.fa?.trim() ||
        item.en?.trim() ||
        item.fr?.trim() ||
        "ترجمه بدون متن",
    });
  };

  const confirmDelete = () => {
    if (deleteDialog.id) {
      deleteKeyword(deleteDialog.id);
      closeDeleteDialog();
    }
  };

  const closeDeleteDialog = () =>
    setDeleteDialog({ open: false, id: null, keyName: "" });

  const handleExport = () => {
    try {
      exportKeywordsToJSON(keywords);
      toast.success("خروجی JSON با موفقیت ایجاد شد");
    } catch (err) {
      toast.error(err.message);
    }
  };

  const handleImport = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const items = await parseKeywordsJSON(file);
      appendKeywords(items);
    } catch (err) {
      toast.error(err.message);
    } finally {
      e.target.value = "";
    }
  };

  const value = {
    keywords,
    filteredKeywords,
    searchQuery,
    setSearchQuery,
    fileInputRef,
    editingId,
    editFormData,
    deleteDialog,
    startEdit,
    saveEdit,
    cancelEdit,
    updateEditField,
    requestDelete,
    confirmDelete,
    closeDeleteDialog,
    handleExport,
    handleImport,
    addKeyword,
    reorderKeywords,
    handleStartEdit: startEdit,
    handleSaveEdit: saveEdit,
    handleCancelEdit: cancelEdit,
    handleEditFieldChange: updateEditField,
    handleDeleteClick: requestDelete,
    handleConfirmDelete: confirmDelete,
    handleCancelDelete: closeDeleteDialog,
    handleExportJSON: handleExport,
    handleImportJSON: handleImport,
    handleAddTranslation: addKeyword,
  };

  return (
    <DashboardContext.Provider value={value}>
      {children}
    </DashboardContext.Provider>
  );
}

export function useDashboardContext() {
  const context = useContext(DashboardContext);
  if (!context)
    throw new Error(
      "useDashboardContext باید داخل DashboardProvider استفاده شود.",
    );
  return context;
}
