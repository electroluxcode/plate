import { Suspense } from "react";
import PlaygroundDemo from "./registry/examples/playground-demo";
import { cn } from "./lib/utils";

export default function App() {
  return (
    <div className={cn(
      "min-h-screen bg-background text-foreground",
      "font-sans antialiased"
    )}>
      <Suspense fallback={
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-lg">Loading...</div>
        </div>
      }>
        <PlaygroundDemo className="h-screen" />
      </Suspense>
    </div>
  );
}