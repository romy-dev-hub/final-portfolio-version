// app/not-found.tsx
import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center">
        <h2 className="text-4xl font-bold text-primary mb-4">Page Not Found</h2>
        <p className="text-primary/70 mb-8">Could not find requested resource</p>
        <Link 
          href="/" 
          className="bg-primary text-background px-6 py-3 rounded-full font-semibold hover:bg-primary/90 transition-colors"
        >
          Return Home
        </Link>
      </div>
    </div>
  )
}