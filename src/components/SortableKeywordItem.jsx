import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

function SortableKeywordItem({ item, children }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    setActivatorNodeRef,
    transform,
    transition,
    isDragging,
    isFocused,
  } = useSortable({
    id: String(item.id),
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 50 : "auto",
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`
        relative
        transition-all
        duration-200
        ${isDragging ? "scale-[0.99] opacity-60" : "opacity-100"}
        ${isFocused ? "rounded-xl ring-2 ring-sky-500 ring-offset-2" : ""}
      `}
    >
      {children({
        dragHandleProps: {
          ref: setActivatorNodeRef,
          ...attributes,
          ...listeners,
        },
      })}
    </div>
  );
}

export default SortableKeywordItem;
