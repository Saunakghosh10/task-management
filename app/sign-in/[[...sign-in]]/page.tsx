'use client'

import { SignIn } from "@clerk/nextjs";
import { useAuth } from "@clerk/nextjs";
import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function SignInPage() {
  const { userId } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectUrl = searchParams.get('redirect_url') || '/dashboard';

  useEffect(() => {
    if (userId) {
      router.push(redirectUrl);
    }
  }, [userId, router, redirectUrl]);

  if (userId) {
    return null; // or a loading spinner
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-blue-500 to-purple-600">
      <SignIn afterSignInUrl={redirectUrl} signUpUrl="/sign-up" />
    </div>
  );
}
