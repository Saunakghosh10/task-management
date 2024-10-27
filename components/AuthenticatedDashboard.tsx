'use client'

import { useAuth, useUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { Dashboard } from "@/components/Dashboard";
import { User } from "@clerk/nextjs/server";
import { UserResource } from "@clerk/types";

export default function AuthenticatedDashboard() {
  const { userId } = useAuth();
  const { user } = useUser();

  if (!userId || !user) {
    redirect("/sign-in");
  }

  // Convert UserResource to User type
  const userForDashboard: User = {
    id: user.id,
    firstName: user.firstName,
    lastName: user.lastName,
    emailAddresses: user.emailAddresses.map(email => ({
      ...email,
      verification: {
        ...email.verification,
        status: email.verification?.status || 'unverified',
        strategy: email.verification?.strategy || 'email_code',
        expireAt: email.verification?.expireAt ? new Date(email.verification.expireAt).getTime() : null
      }
    })),
    primaryEmailAddressId: user.primaryEmailAddressId,
    banned: false,
    locked: false,
    privateMetadata: {},
    createdAt: user.createdAt ? new Date(user.createdAt).getTime() : Date.now(),
    updatedAt: user.updatedAt ? new Date(user.updatedAt).getTime() : Date.now(),
    imageUrl: user.imageUrl,
    // Add other required properties from the User type
    lastActiveAt: Date.now(), 
    legalAcceptedAt: Date.now(), 
  };
  return <Dashboard user={userForDashboard} />;
}
