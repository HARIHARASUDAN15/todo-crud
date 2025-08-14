import { FaPen, FaTrash } from "react-icons/fa";

export default function TodoCard({ todo, onEdit, onDelete }) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        border: "1px solid #ccc",
        borderRadius: "8px",
        padding: "10px",
        marginBottom: "10px",
        height: "150px", // Fixed height for vertical centering
      }}
    >
      {/* Top row: Title + Buttons */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h3 style={{ margin: 0 }}>{todo.title}</h3>
        <div style={{ display: "flex", gap: "8px" }}>
          <button
            onClick={() => onEdit(todo)}
            style={{
              width: "36px",
              height: "36px",
              backgroundColor: "#4CAF50",
              border: "none",
              borderRadius: "6px",
              color: "white",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer"
            }}
          >
            <FaPen />
          </button>
          <button
            onClick={() => onDelete(todo)}
            style={{
              width: "36px",
              height: "36px",
              backgroundColor: "#F44336",
              border: "none",
              borderRadius: "6px",
              color: "white",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer"
            }}
          >
            <FaTrash />
          </button>
        </div>
      </div>

      {/* Description */}
      <div
        style={{
          flex: 1,
          display: "flex",
          alignItems: "center", // Vertically center
        }}
      >
        <p style={{ margin: 0 }}>
          {todo.description.split(" ").length > 15
            ? todo.description.split(" ").slice(0, 15).join(" ") + "..."
            : todo.description}
        </p>
      </div>
    </div>
  );
}
