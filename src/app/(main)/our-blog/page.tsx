'use client';
import { useAuthGuard } from "@/hooks/useAuthGuard";

export default function OurBlog() {
    useAuthGuard();

    return (
        <div className="background-green">
            <h1 className="text-6xl font-bold">Our Blog</h1>
        </div >
    );
}
