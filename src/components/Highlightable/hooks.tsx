import React from 'react';

export const useHighlightable = () => {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const [selection, setSelection] = React.useState<string | null>(null);
  const [rightClickedMark, setRightClickedMark] = React.useState<HTMLElement | null>(null);
  const [note, setNote] = React.useState<string>(''); // Store note content
  const [position, setPosition] = React.useState<Record<string, number>>();
  const [popoverPosition, setPopoverPosition] = React.useState<{
    top: number;
    left: number;
    maxWidth?: number;
    maxHeight?: number;
  } | null>(null);

  function onSelectStart() {
    setSelection(null);
  }

  function onSelectEnd() {
    const activeSelection = document.getSelection();
    const text = activeSelection?.toString();

    if (!activeSelection || !text) {
      setSelection(null);
      return;
    }

    setSelection(text);

    const rect = activeSelection.getRangeAt(0).getBoundingClientRect();

    setPosition({
      x: rect.left + rect.width / 2 - 80 / 2,
      y: rect.top + window.scrollY - 30,
      width: rect.width,
      height: rect.height
    });
  }

  React.useEffect(() => {
    document.addEventListener('selectstart', onSelectStart);
    document.addEventListener('mouseup', onSelectEnd);
    return () => {
      document.removeEventListener('selectstart', onSelectStart);
      document.removeEventListener('mouseup', onSelectEnd);
    };
  }, []);

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

  // Helper function to calculate optimal popover position and size
  const calculatePopoverPosition = (clientX: number, clientY: number) => {
    const defaultWidth = 256; // w-64 = 16rem = 256px
    const defaultHeight = 200; // Approximate height including padding
    const padding = 16; // Minimum distance from viewport edges

    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    // Calculate available space in each direction
    const spaceLeft = clientX - padding;
    const spaceRight = viewportWidth - clientX - padding;
    const spaceTop = clientY - padding;
    const spaceBottom = viewportHeight - clientY - padding;

    // Determine optimal width
    const maxWidth = Math.min(defaultWidth, Math.max(spaceLeft + spaceRight - padding, 200)); // Minimum 200px width

    // Determine optimal height
    const maxHeight = Math.min(defaultHeight, Math.max(spaceTop + spaceBottom - padding, 150)); // Minimum 150px height

    let left = clientX - maxWidth / 2; // Center horizontally on cursor
    let top = clientY - maxHeight - 10; // Position above cursor

    // Adjust horizontal position if it goes outside viewport
    if (left < padding) {
      left = padding;
    } else if (left + maxWidth > viewportWidth - padding) {
      left = viewportWidth - maxWidth - padding;
    }

    // Adjust vertical position if it goes outside viewport
    if (top < padding) {
      // If there's not enough space above, position below the cursor
      top = clientY + 10;

      // If positioning below would also go outside, position to fit within viewport
      if (top + maxHeight > viewportHeight - padding) {
        top = viewportHeight - maxHeight - padding;
      }
    }

    // Ensure minimum bounds
    left = Math.max(padding, Math.min(left, viewportWidth - maxWidth - padding));
    top = Math.max(padding, Math.min(top, viewportHeight - maxHeight - padding));

    return {
      left,
      top,
      maxWidth: maxWidth < defaultWidth ? maxWidth : undefined,
      maxHeight: maxHeight < defaultHeight ? maxHeight : undefined
    };
  };

  // Function to show popover with smart positioning
  const showPopover = (clientX: number, clientY: number) => {
    const position = calculatePopoverPosition(clientX, clientY);
    setPopoverPosition(position);
  };

  // Improved highlight function that properly handles text selection
  const handleHighlight = () => {
    const selection = window.getSelection();
    if (!selection || selection.toString().trim() === '') return;

    try {
      const range = selection.getRangeAt(0);

      // Handle simple case: selection within a single text node
      if (
        range.startContainer === range.endContainer &&
        range.startContainer.nodeType === Node.TEXT_NODE
      ) {
        highlightSingleTextNode(range);
      } else {
        // Handle complex case: selection spans multiple nodes
        highlightMultipleNodes(range);
      }

      // Clear selection after highlighting
      window.getSelection()?.removeAllRanges();
      setSelection(null);
    } catch (error) {
      console.error('Error highlighting selection:', error);
    }
  };

  // Highlight text within a single text node
  const highlightSingleTextNode = (range: Range) => {
    const textNode = range.startContainer as Text;
    const startOffset = range.startOffset;
    const endOffset = range.endOffset;

    // Check if the text is already inside a mark
    const existingMark = textNode.parentElement?.closest('mark');
    if (existingMark) {
      // If already highlighted, don't highlight again
      return;
    }

    // Split the text node and wrap the selected part
    const beforeText = textNode.textContent?.substring(0, startOffset) || '';
    const selectedText = textNode.textContent?.substring(startOffset, endOffset) || '';
    const afterText = textNode.textContent?.substring(endOffset) || '';

    if (selectedText.trim() === '') return;

    const parent = textNode.parentNode;
    if (!parent) return;

    // Create the mark element
    const mark = document.createElement('mark');
    mark.setAttribute('data-note', '');
    mark.textContent = selectedText;

    // Replace the original text node with the new structure
    const fragment = document.createDocumentFragment();

    if (beforeText) {
      fragment.appendChild(document.createTextNode(beforeText));
    }

    fragment.appendChild(mark);

    if (afterText) {
      fragment.appendChild(document.createTextNode(afterText));
    }

    parent.replaceChild(fragment, textNode);
  };

  // Highlight text that spans multiple nodes
  const highlightMultipleNodes = (range: Range) => {
    // Get all text nodes that intersect with the selection
    const textNodesToHighlight: { node: Text; startOffset: number; endOffset: number }[] = [];

    // Create a tree walker to find all text nodes in the range
    const walker = document.createTreeWalker(
      range.commonAncestorContainer,
      NodeFilter.SHOW_TEXT,
      null
    );

    let currentNode = walker.nextNode() as Text;

    while (currentNode) {
      // Skip if already inside a mark
      if (currentNode.parentElement?.closest('mark')) {
        currentNode = walker.nextNode() as Text;
        continue;
      }

      // Check if this text node is part of the selection
      let startOffset = 0;
      let endOffset = currentNode.textContent?.length || 0;
      let isInSelection = false;

      try {
        // Check if this is the start container
        if (currentNode === range.startContainer) {
          startOffset = range.startOffset;
          isInSelection = true;
        }
        // Check if this is the end container
        else if (currentNode === range.endContainer) {
          endOffset = range.endOffset;
          isInSelection = true;
        }
        // Check if this node is completely within the selection
        else {
          // Create a range for this text node
          const nodeRange = document.createRange();
          nodeRange.selectNodeContents(currentNode);

          // Check if the node is after the start of selection
          const afterStart = range.compareBoundaryPoints(Range.START_TO_START, nodeRange) <= 0;
          // Check if the node is before the end of selection
          const beforeEnd = range.compareBoundaryPoints(Range.END_TO_END, nodeRange) >= 0;

          if (afterStart && beforeEnd) {
            isInSelection = true;
          }
        }

        // If this text node is part of the selection, add it to our list
        if (isInSelection && startOffset < endOffset) {
          const textContent = currentNode.textContent?.substring(startOffset, endOffset) || '';
          if (textContent.trim()) {
            textNodesToHighlight.push({
              node: currentNode,
              startOffset,
              endOffset
            });
          }
        }
      } catch (error) {
        console.error('Error processing text node:', error);
      }

      currentNode = walker.nextNode() as Text;
    }

    // Process text nodes in reverse order to avoid DOM position issues
    textNodesToHighlight.reverse().forEach(({ node, startOffset, endOffset }) => {
      highlightTextNodePortion(node, startOffset, endOffset);
    });
  };

  // Helper function to highlight a portion of a text node
  const highlightTextNodePortion = (textNode: Text, startOffset: number, endOffset: number) => {
    const beforeText = textNode.textContent?.substring(0, startOffset) || '';
    const selectedText = textNode.textContent?.substring(startOffset, endOffset) || '';
    const afterText = textNode.textContent?.substring(endOffset) || '';

    if (selectedText.trim() === '') return;

    const parent = textNode.parentNode;
    if (!parent) return;

    const mark = document.createElement('mark');
    mark.setAttribute('data-note', '');
    mark.textContent = selectedText;

    const fragment = document.createDocumentFragment();

    if (beforeText) {
      fragment.appendChild(document.createTextNode(beforeText));
    }

    fragment.appendChild(mark);

    if (afterText) {
      fragment.appendChild(document.createTextNode(afterText));
    }

    parent.replaceChild(fragment, textNode);
  };

  // Remove the specific highlighted text on right-click
  const handleClearHighlight = () => {
    if (rightClickedMark) {
      const parent = rightClickedMark.parentNode;
      if (parent) {
        // Replace the mark with its text content
        const textNode = document.createTextNode(rightClickedMark.textContent || '');
        parent.replaceChild(textNode, rightClickedMark);

        // Normalize the parent to merge adjacent text nodes
        parent.normalize();
      }
      setRightClickedMark(null);
    }
  };

  // Remove all highlights inside the container
  const handleClearAllHighlights = () => {
    if (containerRef.current) {
      containerRef.current.querySelectorAll('mark').forEach((mark) => {
        const parent = mark.parentNode;
        if (parent) {
          const textNode = document.createTextNode(mark.textContent || '');
          parent.replaceChild(textNode, mark);
        }
      });

      // Normalize the container to merge adjacent text nodes
      containerRef.current.normalize();
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

  return {
    state: {
      containerRef,
      selection,
      rightClickedMark,
      note,
      position,
      popoverPosition
    },
    functions: {
      handleContextMenu,
      handleHighlight,
      handleClearHighlight,
      handleClearAllHighlights,
      handleSaveNote,
      setNote,
      setPopoverPosition,
      showPopover
    }
  };
};
