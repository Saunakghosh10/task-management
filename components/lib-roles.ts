'use client'

import { auth, clerkClient } from "@clerk/nextjs/server";

export const ROLES = {
  ADMIN: 'admin',
  TASK_OWNER: 'task_owner',
  ASSIGNED_USER: 'assigned_user',
};

export async function getUserRole() {
  const { userId } = auth();
  if (!userId) {
    return null;
  }

  const user = await clerkClient.users.getUser(userId);
  return user.publicMetadata.role || ROLES.ASSIGNED_USER;
}

export async function setUserRole(userId: string, role: string) {
  await clerkClient.users.updateUser(userId, {
    publicMetadata: { role },
  });
}
