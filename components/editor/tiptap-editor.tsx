/* eslint-disable react-hooks/static-components */
"use client"

import React, { forwardRef, useImperativeHandle } from "react"

import { useEditor, EditorContent } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import Heading from "@tiptap/extension-heading"
import Highlight from "@tiptap/extension-highlight"
import Link from "@tiptap/extension-link"
import TextAlign from "@tiptap/extension-text-align"
import HorizontalRule from "@tiptap/extension-horizontal-rule"
import Underline from "@tiptap/extension-underline"
import Color from "@tiptap/extension-color"
import { TextStyle } from "@tiptap/extension-text-style"
import { Button } from "@/components/ui/button"
import {
  Bold,
  Italic,
  Underline as UnderlineIcon,
  List,
  ListOrdered,
  Quote,
  Code,
  Heading1,
  Heading2,
  Heading3,
  Link as LinkIcon,
  Highlighter,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Redo,
  Undo,
  Trash2,
} from "lucide-react"

import { cn } from "@/lib/utils"

interface TiptapEditorProps {
  value?: string
  onChange?: (value: string) => void
  placeholder?: string
  editable?: boolean
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const TiptapEditor = forwardRef<any, TiptapEditorProps>(
  (
    {
      value,
      onChange,
      // placeholder = "Start typing...",
      editable = true,
    },
    ref
  ) => {
    const editor = useEditor({
      immediatelyRender: false, // 👈 THIS fixes the error
      extensions: [
        StarterKit.configure({
          heading: { levels: [1, 2, 3] },
          bulletList: { HTMLAttributes: { class: "list-disc list-inside" } },
          orderedList: {
            HTMLAttributes: { class: "list-decimal list-inside" },
          },
          codeBlock: {
            HTMLAttributes: {
              class: "rounded-lg bg-slate-900 p-4 text-slate-50",
            },
          },
          blockquote: {
            HTMLAttributes: {
              class: "border-l-4 border-slate-300 pl-4 italic text-slate-600",
            },
          },
        }),
        Heading.configure({ levels: [1, 2, 3] }),
        Highlight.configure({ multicolor: true }),
        Link.configure({ openOnClick: false }),
        TextAlign.configure({ types: ["heading", "paragraph"] }),
        Underline,
        TextStyle,
        Color,
        HorizontalRule,
      ],
      content: value,
      editable,
      onUpdate: ({ editor }) => {
        // Remove automatic onChange to prevent updates on every keypress
      },
    })

    // Expose editor methods via ref
    useImperativeHandle(
      ref,
      () => ({
        getContent: () => editor?.getHTML() || "",
        setContent: (content: string) => editor?.commands.setContent(content),
        clearContent: () => editor?.commands.clearContent(),
      }),
      [editor]
    )

    if (!editor) {
      return null
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const addLink = () => {
      const url = prompt("Enter the URL:")
      if (url) {
        editor
          .chain()
          .focus()
          .extendMarkRange("link")
          .setLink({ href: url })
          .run()
      }
    }

    const setHighlight = () => {
      const color = prompt("Enter highlight color (e.g., yellow, blue, green):")
      if (color) {
        editor.chain().focus().toggleHighlight({ color }).run()
      }
    }

    const insertLink = () => {
      const url = prompt("Enter URL:")
      if (url) {
        editor.chain().focus().setLink({ href: url }).run()
      }
    }

    const ToolbarButton = ({
      onClick,
      isActive,
      icon: Icon,
      title,
    }: {
      onClick: () => void
      isActive?: boolean
      icon: React.ComponentType<{ className?: string }>
      title: string
    }) => (
      <Button
        onClick={onClick}
        size="sm"
        variant={isActive ? "default" : "outline"}
        className={cn(
          "h-8 w-8 p-0",
          isActive && "bg-slate-900 text-white hover:bg-slate-800"
        )}
        title={title}
      >
        <Icon className="h-4 w-4" />
      </Button>
    )

    return (
      <div className="w-full rounded-lg bg-white shadow-sm dark:bg-slate-950">
        {/* Toolbar */}
        <div className="flex flex-wrap items-center gap-1 border-b border-slate-200 bg-slate-50 p-3 dark:border-slate-800 dark:bg-slate-900">
          {/* Text Formatting */}
          <div className="flex gap-1">
            <ToolbarButton
              onClick={() => editor.chain().focus().toggleBold().run()}
              isActive={editor.isActive("bold")}
              icon={Bold}
              title="Bold"
            />
            <ToolbarButton
              onClick={() => editor.chain().focus().toggleItalic().run()}
              isActive={editor.isActive("italic")}
              icon={Italic}
              title="Italic"
            />
            <ToolbarButton
              onClick={() => editor.chain().focus().toggleUnderline().run()}
              isActive={editor.isActive("underline")}
              icon={UnderlineIcon}
              title="Underline"
            />
          </div>

          <div className="h-6 w-px bg-slate-300 dark:bg-slate-700" />

          {/* Headings */}
          <div className="flex gap-1">
            <ToolbarButton
              onClick={() =>
                editor.chain().focus().toggleHeading({ level: 1 }).run()
              }
              isActive={editor.isActive("heading", { level: 1 })}
              icon={Heading1}
              title="Heading 1"
            />
            <ToolbarButton
              onClick={() =>
                editor.chain().focus().toggleHeading({ level: 2 }).run()
              }
              isActive={editor.isActive("heading", { level: 2 })}
              icon={Heading2}
              title="Heading 2"
            />
            <ToolbarButton
              onClick={() =>
                editor.chain().focus().toggleHeading({ level: 3 }).run()
              }
              isActive={editor.isActive("heading", { level: 3 })}
              icon={Heading3}
              title="Heading 3"
            />
          </div>

          <div className="h-6 w-px bg-slate-300 dark:bg-slate-700" />

          {/* Lists */}
          <div className="flex gap-1">
            <ToolbarButton
              onClick={() => editor.chain().focus().toggleBulletList().run()}
              isActive={editor.isActive("bulletList")}
              icon={List}
              title="Bullet List"
            />
            <ToolbarButton
              onClick={() => editor.chain().focus().toggleOrderedList().run()}
              isActive={editor.isActive("orderedList")}
              icon={ListOrdered}
              title="Ordered List"
            />
          </div>

          <div className="h-6 w-px bg-slate-300 dark:bg-slate-700" />

          {/* Alignment */}
          <div className="flex gap-1">
            <ToolbarButton
              onClick={() => editor.chain().focus().setTextAlign("left").run()}
              isActive={editor.isActive({ textAlign: "left" })}
              icon={AlignLeft}
              title="Align Left"
            />
            <ToolbarButton
              onClick={() =>
                editor.chain().focus().setTextAlign("center").run()
              }
              isActive={editor.isActive({ textAlign: "center" })}
              icon={AlignCenter}
              title="Align Center"
            />
            <ToolbarButton
              onClick={() => editor.chain().focus().setTextAlign("right").run()}
              isActive={editor.isActive({ textAlign: "right" })}
              icon={AlignRight}
              title="Align Right"
            />
          </div>

          <div className="h-6 w-px bg-slate-300 dark:bg-slate-700" />

          {/* Advanced */}
          <div className="flex gap-1">
            <ToolbarButton
              onClick={() => editor.chain().focus().toggleBlockquote().run()}
              isActive={editor.isActive("blockquote")}
              icon={Quote}
              title="Blockquote"
            />
            <ToolbarButton
              onClick={() => editor.chain().focus().toggleCodeBlock().run()}
              isActive={editor.isActive("codeBlock")}
              icon={Code}
              title="Code Block"
            />
            <ToolbarButton
              onClick={insertLink}
              isActive={editor.isActive("link")}
              icon={LinkIcon}
              title="Insert Link"
            />
            <ToolbarButton
              onClick={setHighlight}
              isActive={editor.isActive("highlight")}
              icon={Highlighter}
              title="Highlight"
            />
          </div>

          <div className="h-6 w-px bg-slate-300 dark:bg-slate-700" />

          {/* History */}
          <div className="flex gap-1">
            <ToolbarButton
              onClick={() => editor.chain().focus().undo().run()}
              icon={Undo}
              title="Undo"
            />
            <ToolbarButton
              onClick={() => editor.chain().focus().redo().run()}
              icon={Redo}
              title="Redo"
            />
            <ToolbarButton
              onClick={() => editor.chain().focus().clearContent().run()}
              icon={Trash2}
              title="Clear All"
            />
          </div>
        </div>

        {/* Editor Content */}
        <EditorContent
          editor={editor}
          className="prose prose-sm dark:prose-invert max-w-none p-4 **:border-0 **:ring-0 [&_.ProseMirror]:border-0 [&_.ProseMirror]:ring-0 [&_.ProseMirror]:selection:bg-blue-100 [&_.ProseMirror]:focus-within:outline-none [&_.ProseMirror]:selection:dark:bg-blue-900"
          style={{
            minHeight: "400px",
          }}
        />
      </div>
    )
  }
)

TiptapEditor.displayName = "TiptapEditor"

export default TiptapEditor
