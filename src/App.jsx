import React, { useEffect, useMemo, useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import { getTodos, createTodo, updateTodo, deleteTodo } from "./api";
import Modal from "./components/Modal";
import TodoCard from "./components/TodoCard";

export default function App() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);

  // Top bar input (matches your layout: one big input + Add button)
  const [quickTitle, setQuickTitle] = useState("");

  // Add/Edit modal state
  const [isAddOpen, setAddOpen] = useState(false);
  const [isEditOpen, setEditOpen] = useState(false);
  const [draft, setDraft] = useState({ id: null, title: "", description: "" });

  // Delete confirm dialog
  const [isDeleteOpen, setDeleteOpen] = useState(false);
  const [toDelete, setToDelete] = useState(null);

  const reload = async () => {
    setLoading(true);
    try {
      const { data } = await getTodos();
      setTodos(data);
    } catch (e) {
      toast.error("Failed to fetch todos");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { reload(); }, []);

  // Open Add modal, prefill title from the big input
  const openAdd = () => {
    setDraft({ id: null, title: quickTitle.trim(), description: "" });
    setAddOpen(true);
  };

  const submitAdd = async (e) => {
    e.preventDefault();
    const payload = {
      title: draft.title.trim(),
      description: draft.description.trim()
    };
    if (!payload.title) return toast.error("Title is required");
    try {
      await createTodo(payload);
      toast.success("Todo created");
      setAddOpen(false);
      setQuickTitle("");
      await reload();
    } catch {
      toast.error("Create failed");
    }
  };

  const openEdit = (todo) => {
    setDraft({ id: todo.id, title: todo.title, description: todo.description || "" });
    setEditOpen(true);
  };

  const submitEdit = async (e) => {
    e.preventDefault();
    const { id, title, description } = draft;
    if (!title.trim()) return toast.error("Title is required");
    try {
      await updateTodo(id, { title: title.trim(), description: (description || "").trim() });
      toast.success("Todo updated");
      setEditOpen(false);
      await reload();
    } catch {
      toast.error("Update failed");
    }
  };

  const askDelete = (todo) => {
    setToDelete(todo);
    setDeleteOpen(true);
  };

  const confirmDelete = async () => {
    try {
      await deleteTodo(toDelete.id);
      toast.success("Todo deleted");
      setDeleteOpen(false);
      setToDelete(null);
      await reload();
    } catch {
      toast.error("Delete failed");
    }
  };

  const gridItems = useMemo(() => todos, [todos]);

  return (
    <div className="page">
      <Toaster position="top-right" />

      {/* Container box like in your screenshot */}
      <div className="panel">
        {/* Top bar: big input + Add button on right */}
        <div className="topbar">
          <input
            className="top-input"
            placeholder="Todo List"
            value={quickTitle}
            onChange={(e) => setQuickTitle(e.target.value)}
          />
          <button className="btn add" onClick={openAdd}>Add</button>
        </div>

        {/* Cards grid (4 per row) */}
        <div className="grid">
          {loading && <div className="empty">Loading…</div>}
          {!loading && gridItems.length === 0 && <div className="empty">No todos yet</div>}
          {!loading && gridItems.map((t) => (
            <TodoCard key={t.id} todo={t} onEdit={openEdit} onDelete={askDelete} />
          ))}
        </div>
      </div>

      {/* Add Modal */}
      <Modal open={isAddOpen} title="Add Todo" onClose={()=>setAddOpen(false)}>
        <form className="form" onSubmit={submitAdd}>
          <label>
            <span>Title</span>
            <input
              value={draft.title}
              onChange={(e)=>setDraft(d=>({...d, title: e.target.value}))}
              autoFocus
            />
          </label>
          <label>
            <span>Description</span>
            <textarea
              rows={4}
              value={draft.description}
              onChange={(e)=>setDraft(d=>({...d, description: e.target.value}))}
            />
          </label>
          <div className="form-actions">
            <button type="button" className="btn ghost" onClick={()=>setAddOpen(false)}>Cancel</button>
            <button className="btn">Save</button>
          </div>
        </form>
      </Modal>

      {/* Edit Modal */}
      <Modal open={isEditOpen} title="Edit Todo" onClose={()=>setEditOpen(false)}>
        <form className="form" onSubmit={submitEdit}>
          <label>
            <span>Title</span>
            <input
              value={draft.title}
              onChange={(e)=>setDraft(d=>({...d, title: e.target.value}))}
              autoFocus
            />
          </label>
          <label>
            <span>Description</span>
            <textarea
              rows={4}
              value={draft.description}
              onChange={(e)=>setDraft(d=>({...d, description: e.target.value}))}
            />
          </label>
          <div className="form-actions">
            <button type="button" className="btn ghost" onClick={()=>setEditOpen(false)}>Cancel</button>
            <button className="btn">Update</button>
          </div>
        </form>
      </Modal>

      {/* Delete Confirm Modal (Yes / No) */}
      <Modal
        open={isDeleteOpen}
        title="Delete Todo?"
        onClose={()=>setDeleteOpen(false)}
      >
        <div className="confirm">
          <p>Are you sure you want to delete <b>{toDelete?.title}</b>?</p>
          <div className="form-actions">
            <button className="btn ghost" onClick={()=>setDeleteOpen(false)}>No</button>
            <button className="btn danger" onClick={confirmDelete}>Yes, delete</button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
