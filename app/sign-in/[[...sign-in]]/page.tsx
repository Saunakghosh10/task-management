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
    return null;
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-black">
      <div className="w-full max-w-md p-8">
        <SignIn 
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
          afterSignInUrl={redirectUrl} 
          signUpUrl="/sign-up" 
        />
      </div>
    </div>
  );
}
