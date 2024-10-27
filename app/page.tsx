import Link from 'next/link';
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background text-foreground">
      <h1 className="text-4xl font-bold mb-6">Task Management App</h1>
      <p className="text-xl mb-8 text-center max-w-md">
        Streamline your workflow and boost productivity with our intuitive task management solution.
      </p>
      <Link href="/sign-up">
        <Button size="lg">Get Started</Button>
      </Link>
    </div>
  );
}
