"use client"

import { useRef } from "react"
import Image from "next/image"
import { Camera } from "lucide-react"
import { Typography } from "@/components/typography"

interface ProfileHeroProps {
  name?: string
  role?: string
  avatarSrc?: string
  onAvatarChange?: (file: File) => void
}

export function ProfileHero({
  name = "Arif",
  role = "Admin",
  avatarSrc,
  onAvatarChange,
}: ProfileHeroProps) {
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleCameraClick = () => {
    fileInputRef.current?.click()
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file && onAvatarChange) {
      onAvatarChange(file)
    }
  }

  return (
    <div className="w-full rounded-xl overflow-hidden bg-primary flex items-center justify-center px-8 py-6 gap-6 min-h-[120px]">
      {/* Avatar with camera overlay */}
      <div className="relative shrink-0">
        <div className="size-[88px] rounded-full overflow-hidden border-4 border-white/20 bg-muted">
          {avatarSrc ? (
            <Image
              src={avatarSrc}
              alt={`${name}'s avatar`}
              width={88}
              height={88}
              className="object-cover w-full h-full"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-secondary text-foreground text-2xl font-bold">
              {name.charAt(0).toUpperCase()}
            </div>
          )}
        </div>

        {/* Camera button overlay */}
        <button
          id="btn-change-avatar"
          type="button"
          onClick={handleCameraClick}
          aria-label="Change profile picture"
          className="absolute bottom-0 right-0 bg-background rounded-full p-1.5 shadow-md hover:bg-secondary transition-colors border border-border"
        >
          <Camera size={18} className="text-primary" />
        </button>

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleFileChange}
          aria-label="Upload avatar"
        />
      </div>

      {/* Name & role */}
      <div className="flex flex-col gap-1">
        <Typography variant="Bold_H2" className="text-primary-foreground leading-tight">
          {name}
        </Typography>
        <Typography variant="Medium_H5" className="text-primary-foreground/80">
          {role}
        </Typography>
      </div>
    </div>
  )
}
