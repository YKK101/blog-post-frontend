'use client';
import { useAuthGuard } from "@/hooks/useAuthGuard";

export default function CreatePost() {
    useAuthGuard();

    return "Create Post";
}