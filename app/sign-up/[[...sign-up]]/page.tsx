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
    return null;
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-black">
      <div className="w-full max-w-md p-8">
        <SignUp 
          appearance={{
            elements: {
              rootBox: "mx-auto",
              card: "bg-black border border-gray-800",
              headerTitle: "text-white",
              headerSubtitle: "text-gray-400",
              formButtonPrimary: "bg-white hover:bg-gray-200 text-black",
              formFieldInput: "bg-black border-gray-800 text-white",
              formFieldLabel: "text-gray-400",
              footerActionLink: "text-white hover:text-gray-200",
            }
          }}
          afterSignUpUrl="/dashboard" 
          signInUrl="/sign-in" 
        />
      </div>
    </div>
  );
}
