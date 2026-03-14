"use client"

import { ContentLayout } from "@/components/navigation/content-layout"
import { ProfileHero } from "@/components/features/profile/profile-hero"
import { EditProfileForm } from "@/components/features/profile/edit-profile-form"
import { ChangePasswordForm } from "@/components/features/profile/change-password-form"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Toaster } from "@/components/ui/sonner"
import { cn } from "@/lib/utils"

export default function ProfilePage() {
  return (
    <ContentLayout title="Settings / Profile">
      {/* Centered container matching Figma's ~660px wide card */}
      <div className="flex w-full justify-center rounded-xl bg-[#1A2332] p-24.5">
        <div className="flex w-full flex-col gap-0">
          {/* Teal hero banner */}
          <ProfileHero name="Arif" role="Admin" />

          {/* Tabs: Edit Profile / Change Password */}
          <Tabs
            defaultValue="edit-profile"
            className="mx-auto mt-15 w-full md:max-w-md"
          >
            {/* Tab triggers — Figma shows underline variant, primary color on active */}
            <TabsList
              variant="line"
              className="w-full justify-start gap-0 rounded-none border-b border-border"
            >
              <TabsTrigger
                value="edit-profile"
                className={cn(
                  "rounded-none px-6 text-base font-semibold hover:text-primary data-[state=active]:border-b-2 data-[state=active]:border-[#4ECDC4] data-[state=active]:text-[#4ECDC4]"
                )}
              >
                Edit Profile
              </TabsTrigger>

              <TabsTrigger
                value="change-password"
                className={cn(
                  "rounded-none px-6 text-base font-semibold hover:text-primary data-[state=active]:border-b-2 data-[state=active]:border-[#4ECDC4] data-[state=active]:text-[#4ECDC4]"
                )}
              >
                Change Password
              </TabsTrigger>
            </TabsList>

            {/* Edit Profile tab */}
            <TabsContent
              value="edit-profile"
              className="mt-0 rounded-b-xl px-8 py-8"
            >
              <EditProfileForm defaultUserName="Maria" />
            </TabsContent>

            {/* Change Password tab */}
            <TabsContent
              value="change-password"
              className="mt-0 rounded-b-xl px-8 py-8"
            >
              <ChangePasswordForm />
            </TabsContent>
          </Tabs>
        </div>
      </div>
      <Toaster position="top-right" richColors closeButton />
    </ContentLayout>
  )
}
