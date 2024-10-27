'use client'

import { useAuth, useUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { Dashboard } from "@/components/Dashboard";
import { User } from "@clerk/nextjs/server";

export default function AuthenticatedDashboard() {
  const { userId } = useAuth();
  const { user } = useUser();

  if (!userId || !user) {
    redirect("/sign-in");
  }

  // Convert UserResource to User type
  const userForDashboard: Partial<User> = {
    id: user.id,
    firstName: user.firstName || null,
    lastName: user.lastName || null,
    username: user.username || null,
    primaryEmailAddressId: user.primaryEmailAddressId || null,
    primaryPhoneNumberId: user.primaryPhoneNumberId || null,
    imageUrl: user.imageUrl,
    createdAt: user.createdAt ? new Date(user.createdAt).getTime() : undefined,
    updatedAt: user.updatedAt ? new Date(user.updatedAt).getTime() : undefined,
    publicMetadata: user.publicMetadata,
  };

  return <Dashboard user={userForDashboard as User} />;
}
