'use client'

import Link from "next/link";
import { Badge } from "@/components/tailgrids/core/badge";
import { Facebook } from "@tailgrids/icons";

export default function Footer() {
    return (
        // footer container
        <div className='mt-4 text-center'>
            {/* student */}
            <div>
                <Badge className="text-2xl text-black rounded-lg">68100663 นาย โมไนย ศรีนวล</Badge>
            </div>
            {/* contacts */}
            <div className='mt-4 flex items-center justify-center gap-6'>
                <Link href={'https://www.facebook.com/monai.srinuan'} target="_blank" className='text-blue-700'>
                    <Facebook />
                </Link>

                {/* เส้นคั่น */}
                <span className="h-6 w-px bg-black" aria-hidden="true" />

                {/* X (เปลี่ยนลิงก์เป็นบัญชีของคุณ) */}
                <Link href={'https://x.com/ผมไม่เล่นX'} target="_blank" aria-label="X" className='text-black'>
                    <svg viewBox="0 0 24 24" className="size-6" fill="currentColor" aria-hidden="true">
                        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                    </svg>
                </Link>
            </div>
        </div>
    )
}