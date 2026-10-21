    'use client'

import Link from "next/link";
import { Badge } from "@/components/tailgrids/core/badge";
import { Facebook } from "@tailgrids/icons"; 
export default function Footer () {
    return (
        // footer container
        <div className='mt-4 text-center'>
            {/* student */}
            <div>
                <Badge className="text-2xl text-black rounded-lg">68100663 นาย โมไนย ศรีนวล</Badge>
            </div>
            {/* contacts */}
            <div className='mt-4 flex justify-center gap-6'>
                <Link href={'https://www.facebook.com/monai.srinual'} target="_blank" className='text-blue-700'>
                    <Facebook />
                </Link>
            </div>
        </div>
    )
}