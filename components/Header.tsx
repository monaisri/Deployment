    'use client'
import { Badge } from "@/components/tailgrids/core/badge";
export default function Header () {
    return (
        // header container
        <>
            <div className='mt-4 text-center'>
                
                {/* code */}
                <div className='flex justify-center gap-4'>
                    <Badge className='text-3xl rounded-lg
                    py-1 px-3 bg-red-500 text-gray-200 rotate-18'>C</Badge>
                    <Badge className='text-3xl rounded-lg
                    py-1 px-3 bg-yellow-300 text-black-200 rotate-10'>S</Badge>
                    <Badge className='text-3xl rounded-lg
                    py-1 px-3 bg-blue-300 text-red-500 rotate-0'>I</Badge>
                    <Badge className='text-3xl rounded-lg
                    py-1 px-3 bg-green-700 text-cyan-500 rotate-31'>2</Badge>
                    <Badge className='text-3xl rounded-lg
                    py-1 px-3 bg-purple-600 text-black-200 rotate-5'>0</Badge>
                    <Badge className='text-3xl rounded-lg
                    py-1 px-3 bg-orange-400 text-gray-200 rotate-18'>5</Badge>
                </div>
                    {/* name */}
                <div className='mt-4'>
                    <Badge size="lg">FRONT END SOFTWARE</Badge>
                </div>
            </div>
        </>
    )
}