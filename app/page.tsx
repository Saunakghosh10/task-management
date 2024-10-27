import { auth } from "@clerk/nextjs";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default async function Home() {
  const { userId } = await auth();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white text-black">
      <div className="text-center space-y-6 max-w-2xl px-4">
        <h1 className="text-5xl font-bold mb-4">Task Manager</h1>
        <p className="text-xl mb-8 text-gray-600">Streamline your workflow, boost productivity</p>
        {userId ? (
          <Link href="/dashboard">
            <Button variant="outline" size="lg" className="font-semibold">
              Go to Dashboard
            </Button>
          </Link>
        ) : (
          <Link href="/sign-in">
            <Button variant="default" size="lg" className="font-semibold">
              Get Started
            </Button>
          </Link>
        )}
      </div>
    </div>
  );
}
