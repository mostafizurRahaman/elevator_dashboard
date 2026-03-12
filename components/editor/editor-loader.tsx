const EditorLoader = () => {
  return (
    <div className="overflow-hidden rounded-lg border border-border bg-card">
      {/* Toolbar */}
      <div className="flex flex-wrap gap-2 border-b border-[#e5e7eb] bg-[#f3f4f6]/30 p-3">
        {/* Format buttons skeleton */}
        {[...Array(12)].map((_, i) => (
          <div key={i} className="h-8 w-8 animate-pulse rounded bg-[#f3f4f6]" />
        ))}
      </div>

      {/* Editor area */}
      <div className="space-y-4 p-6">
        {/* Title line */}
        <div className="h-8 w-1/3 animate-pulse rounded bg-[#f3f4f6]" />

        {/* Content lines */}
        <div className="space-y-3 pt-4">
          <div className="h-4 w-full animate-pulse rounded bg-[#f3f4f6]" />
          <div className="h-4 w-5/6 animate-pulse rounded bg-[#f3f4f6]" />
          <div className="h-4 w-4/5 animate-pulse rounded bg-[#f3f4f6]" />
        </div>

        {/* Another paragraph */}
        <div className="space-y-3 pt-6">
          <div className="h-4 w-full animate-pulse rounded bg-[#f3f4f6]" />
          <div className="h-4 w-full animate-pulse rounded bg-[#f3f4f6]" />
          <div className="h-4 w-3/5 animate-pulse rounded bg-[#f3f4f6]" />
        </div>
      </div>

      {/* Footer info */}
      <div className="flex justify-end gap-4 border-t border-border bg-[#f3f4f6]/30 p-3">
        <div className="h-4 w-24 animate-pulse rounded bg-[#f3f4f6]" />
        <div className="h-4 w-24 animate-pulse rounded bg-[#f3f4f6]" />
        <div className="h-4 w-32 animate-pulse rounded bg-[#f3f4f6]" />
      </div>
    </div>
  )
}

export default EditorLoader
