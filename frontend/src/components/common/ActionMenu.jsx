import { useEffect, useRef, useState } from "react";
import { FaEllipsisV, FaEdit, FaTrash } from "react-icons/fa";
import useEscapeKey from "../../hooks/useEscapeKey";
import "./ActionMenu.css";

function ActionMenu({ onEdit, onDelete, label = "row" }) {
  const [open, setOpen] = useState(false);

  const menuRef = useRef(null);
  const triggerRef = useRef(null);
  const menuItemsRef = useRef([]);

  useEscapeKey(open, () => {
    setOpen(false);

    requestAnimationFrame(() => {
      triggerRef.current?.focus();
    });
  });

  useEffect(() => {
    if (!open) return;

    // Focus the first menu item when opened
    requestAnimationFrame(() => {
      menuItemsRef.current[0]?.focus();
    });

    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open]);

  const handleMenuKeyDown = (e) => {
    const items = menuItemsRef.current.filter(Boolean);

    if (!items.length) return;

    const currentIndex = items.indexOf(document.activeElement);

    if (e.key === "ArrowDown") {
      e.preventDefault();

      const nextIndex =
        currentIndex === -1
          ? 0
          : (currentIndex + 1) % items.length;

      items[nextIndex]?.focus();
    }

    if (e.key === "ArrowUp") {
      e.preventDefault();

      const previousIndex =
        currentIndex === -1
          ? items.length - 1
          : (currentIndex - 1 + items.length) % items.length;

      items[previousIndex]?.focus();
    }

    if (e.key === "Escape") {
      e.preventDefault();

      setOpen(false);

      requestAnimationFrame(() => {
        triggerRef.current?.focus();
      });
    }
  };

  const closeAndEdit = () => {
    setOpen(false);
    onEdit();
  };

  const closeAndDelete = () => {
    setOpen(false);
    onDelete();
  };

  return (
    <div className="action-menu" ref={menuRef}>
      <button
        ref={triggerRef}
        type="button"
        className="action-menu-trigger"
        onClick={() => setOpen((prev) => !prev)}
        aria-label={`Actions for ${label}`}
        aria-haspopup="menu"
        aria-expanded={open}
      >
        <FaEllipsisV />
      </button>

      {open && (
        <div
          className="action-menu-dropdown"
          role="menu"
          onKeyDown={handleMenuKeyDown}
        >
          <button
            ref={(element) => {
              menuItemsRef.current[0] = element;
            }}
            type="button"
            className="action-menu-item"
            role="menuitem"
            onClick={closeAndEdit}
          >
            <FaEdit />
            Edit
          </button>

          <button
            ref={(element) => {
              menuItemsRef.current[1] = element;
            }}
            type="button"
            className="action-menu-item danger"
            role="menuitem"
            onClick={closeAndDelete}
          >
            <FaTrash />
            Delete
          </button>
        </div>
      )}
    </div>
  );
}

export default ActionMenu;