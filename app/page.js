import { Hero } from "./components/home/Hero"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function HomePage() {
  return (
    <main>
      <Hero />
      
      <section className="w-full py-12 md:py-24 flex justify-center">
        <div className="w-full max-w-6xl px-4 md:px-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 w-full">
            <Card>
              <CardHeader>
                <CardTitle>Our League</CardTitle>
                <CardDescription>Explore teams and rosters</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="mb-4">Discover our elite Dynasty Fantasy Football League.</p>
                <Link href="/about">
                  <Button>View League</Button>
                </Link>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Drafts</CardTitle>
                <CardDescription>See League History</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="mb-4">See who is elite at drafting and who is not.</p>
                <Link href="/drafts">
                  <Button>View Drafts</Button>
                </Link>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Drafts again</CardTitle>
                <CardDescription>Just because</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="mb-4">Need another page</p>
                <Link href="/drafts">
                  <Button>Read More</Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </main>
  )
}
