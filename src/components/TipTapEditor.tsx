"use client";

import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { forwardRef, useImperativeHandle } from 'react';

interface TipTapEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

const TipTapEditor = forwardRef<any, TipTapEditorProps>(({
  value,
  onChange,
  placeholder = "Start writing...",
  className = ""
}, ref) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
    ],
    content: value,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class: 'prose prose-sm sm:prose lg:prose-lg xl:prose-2xl mx-auto focus:outline-none',
      },
    },
  });

  useImperativeHandle(ref, () => ({
    getEditor: () => editor,
  }));

  if (!editor) {
    return null;
  }

  return (
    <div className={className}>
      <EditorContent
        editor={editor}
        className="ProseMirror"
        data-placeholder={placeholder}
      />
    </div>
  );
});

TipTapEditor.displayName = 'TipTapEditor';

export default TipTapEditor;