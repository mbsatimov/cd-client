import React from 'react';

export const useHighlightable = () => {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const [selection, setSelection] = React.useState<Selection | null>(null);
  const [rightClickedMark, setRightClickedMark] = React.useState<HTMLElement | null>(null);
  const [note, setNote] = React.useState<string>(''); // Store note content
  const [popoverPosition, setPopoverPosition] = React.useState<{
    top: number;
    left: number;
  } | null>(null);

  // Update selection when mouse is released
  const handleMouseUp = () => {
    const sel = window.getSelection();
    if (sel && sel.toString().trim() !== '') {
      setSelection(sel);
    } else {
      setSelection(null);
    }
  };

  // Detect right-click on a <mark> and set popover position
  const handleContextMenu = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement;
    const markElement = target.closest('mark') as HTMLElement | null;

    if (markElement) {
      setRightClickedMark(markElement);
      setNote(markElement.getAttribute('data-note') || '');
    } else {
      setRightClickedMark(null);
      setPopoverPosition(null);
      const sel = window.getSelection();
      if (sel && sel.toString().trim() === '') {
        e.preventDefault();
      }
    }
  };

  // Wrap selected text in a <mark> with Tailwind styling
  const handleHighlight = () => {
    if (!selection || selection.toString().trim() === '') return;

    const range = selection.getRangeAt(0);

    try {
      // Extract contents while preserving inner text but removing <mark> tags
      const selectedContents = range.cloneContents();

      // Remove any existing <mark> tags inside the selection
      selectedContents.querySelectorAll('mark').forEach((mark) => {
        const parent = mark.parentNode;
        while (mark.firstChild) {
          parent?.insertBefore(mark.firstChild, mark);
        }
        parent?.removeChild(mark);
      });

      // Wrap cleaned text inside a new <mark>
      const mark = document.createElement('mark');
      mark.className = 'bg-yellow-200'; // Tailwind highlight class
      mark.setAttribute('data-note', ''); // Initialize with empty note
      mark.appendChild(selectedContents);

      range.deleteContents(); // Remove original selection
      range.insertNode(mark); // Insert the cleaned and highlighted version

      // Clear selection after highlighting
      window.getSelection()?.removeAllRanges();
      setSelection(null);
    } catch (error) {
      console.error('Error highlighting selection:', error);
    }
  };

  // Remove the specific highlighted text on right-click
  const handleClearHighlight = () => {
    if (rightClickedMark) {
      const parent = rightClickedMark.parentNode;
      while (rightClickedMark.firstChild) {
        parent?.insertBefore(rightClickedMark.firstChild, rightClickedMark);
      }
      parent?.removeChild(rightClickedMark);
      setRightClickedMark(null);
    }
  };

  // Remove all highlights inside the container
  const handleClearAllHighlights = () => {
    if (containerRef.current) {
      containerRef.current.querySelectorAll('mark').forEach((mark) => {
        const parent = mark.parentNode;
        while (mark.firstChild) {
          parent?.insertBefore(mark.firstChild, mark);
        }
        parent?.removeChild(mark);
      });
      setRightClickedMark(null);
    }
  };

  // Save note for the specific highlight
  const handleSaveNote = () => {
    if (rightClickedMark) {
      rightClickedMark.setAttribute('data-note', note);
      setPopoverPosition(null);
    }
  };

  // Attach mouseup event to update selection state
  React.useEffect(() => {
    const container = containerRef.current;
    if (container) {
      container.addEventListener('mouseup', handleMouseUp);
    }
    return () => {
      if (container) {
        container.removeEventListener('mouseup', handleMouseUp);
      }
    };
  }, []);

  return {
    state: {
      containerRef,
      selection,
      rightClickedMark,
      note,
      popoverPosition
    },
    functions: {
      handleContextMenu,
      handleHighlight,
      handleClearHighlight,
      handleClearAllHighlights,
      handleSaveNote,
      setNote,
      setPopoverPosition
    }
  };
};
