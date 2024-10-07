import Link from "next/link";

export default function NotFound() {
    return(
        <div className="relative md:flex w-[95%] m-auto justify-between p-10 px-8 bg-white">
            <div className="space-y-8">
            <h1 className="text-2xl">The page you are looking for does not exist, or may have been moved.</h1>
            <h2 className="xl">Return <Link href="/" className="font-semibold hover:underline">home</Link>?</h2>
            </div>
        </div>
    )
}