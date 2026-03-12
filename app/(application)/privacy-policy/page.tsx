"use client"

import dynamic from "next/dynamic"
import { useState, useRef } from "react"
import { Typography } from "@/components/typography"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import EditorLoading from "@/components/editor/editor-loader"

const PrivacyPolicyPage = () => {
  const TiptapEditor = dynamic(
    () => import("@/components/editor/tiptap-editor"),
    { ssr: false, loading: () => <EditorLoading /> }
  )

  const [content] = useState("")
  const [loading] = useState(false)
  const [isUpdating] = useState(false)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const editorRef = useRef<any>(null)

  const handleSave = async () => {
    const currentContent = editorRef.current?.getContent() || ""
    console.log("Saving Privacy Policy:", currentContent)
  }

  return (
    <div className="container mx-auto max-w-5xl py-8">
      {/* Glow Border Wrapper */}
      <Card className="border-chart bg-gradient-primary rounded-xl border-2 p-0.5! py-0.5!">
        <CardContent className="rounded-xl bg-secondary p-8 md:p-12">
          {/* Header Section */}
          <div className="mb-10 flex flex-col items-center justify-center text-center">
            <Typography variant="Bold_H2" className="text-white">
              Privacy Policy
            </Typography>
            <Typography
              variant="SemiBold_H6"
              className="mt-3 max-w-2xl text-muted-foreground"
            >
              Update and manage your platform&apos;s privacy terms. Changes will be
              reflected immediately across all user interfaces.
            </Typography>
          </div>

          {/* Editor Container */}
          <div className="rounded-xl bg-background p-6 shadow-2xl">
            <div className="flex flex-col gap-4">
              <Typography
                variant="Regular_H7"
                className="ml-1 text-muted-foreground"
              >
                Policy Content
              </Typography>

              <div className="min-h-[500px] overflow-hidden rounded-lg border border-gray-800 bg-secondary/20">
                {!loading && <TiptapEditor ref={editorRef} value={content} />}
              </div>

              {/* Action Button */}
              <div className="mt-6 flex justify-center">
                <Button
                  type="button"
                  onClick={handleSave}
                  disabled={isUpdating}
                  size="lg"
                  className="w-full cursor-pointer bg-primary py-6 text-lg font-bold capitalize transition-all hover:opacity-90 md:w-1/2"
                >
                  {isUpdating ? "Saving..." : "Save Changes"}
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default PrivacyPolicyPage
