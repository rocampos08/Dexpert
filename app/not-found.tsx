import { Button } from '@/components/ui/button'
import Link from 'next/link'


export default function NotFound() {
  return (
    <div className='flex flex-col items-center justify-center h-screen text-center'>
        <h1 className='text-4xl font-bold text-[#2196F3]'>404</h1>
        <p className='text-lg mt-2 text-[#0A2342]'>Page not found</p>
        <Button asChild>
            <Link href="/" className='mt-4'>Go home</Link>
        </Button>
        </div>
  )
}
