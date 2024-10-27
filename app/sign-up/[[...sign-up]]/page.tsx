'use client'

import { SignUp } from "@clerk/nextjs";
import { useAuth } from "@clerk/nextjs";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function SignUpPage() {
  const { userId } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (userId) {
      router.push('/dashboard');
    }
  }, [userId, router]);

  if (userId) {
    return null; // or a loading spinner
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-background">
      <SignUp afterSignUpUrl="/dashboard" signInUrl="/sign-in" />
    </div>
  );
}
