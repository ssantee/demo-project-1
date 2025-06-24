import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import Link from "next/link";
import { Settings } from 'lucide-react';

export default async function HomePage() {
  return (
    <div>
      <div className="flex flex-col gap-4 p-4 sm:flex-row sm:flex-wrap md:flex-nowrap">
        <Card className="w-full sm:w-1/2 md:w-1/2 flex-1">
          <CardHeader>
            <CardTitle>FizzBuzz</CardTitle>
            <CardDescription>
              Try the Fizzbuzz generator.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Generate FizzBuzz sequences with ease. Be sure to look under the <Settings className="inline-block h-4 w-4" /> icon for options.
            </p>
          </CardContent>
          <CardFooter>
            <Link href="/fizzbuzz">Go to FizzBuzz Generator</Link>
          </CardFooter>
        </Card>
        <Card className="w-full sm:w-1/2 md:w-1/2 flex-1">
          <CardHeader>
            <CardTitle>Fibonacci Generator</CardTitle>
            <CardDescription>
              It's sums of sums of sums of fun!
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Use the sidebar to navigate.
            </p>
          </CardContent>
          <CardFooter>
            <Link href="/fibonacci">Go to Fibonacci Generator</Link>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
