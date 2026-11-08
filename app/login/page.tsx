'use client'

import { useRouter } from "next/navigation"
import { Backdrop } from "@/components/tailgrids/core/overlay";
import {
    Dialog,
    DialogBody,
    DialogFooter,
    DialogHeader,
    DialogTitle
} from "@/components/tailgrids/core/dialog";
import {
    InputGroup,
    InputGroupAddon,
    InputGroupInput,
} from "@/components/tailgrids/core/input-group"
import { EyeDisabled, Keyboard } from "@tailgrids/icons";
import { login } from "@/data/credential";
import { buttonStyles } from "@/components/tailgrids/core/button";

export default function Page() {
    const router = useRouter()
    
    const handleLogin = () => {
        const userDom = document.getElementById('user') as HTMLInputElement;
        const passDom = document.getElementById('pass') as HTMLInputElement;
        
        if (!userDom || !passDom) return;

        const user = userDom.value.trim();
        const pass = passDom.value.trim();
        
        if (user === '') {
            userDom.focus();
            alert('error : user is required');
            return;
        }
        if (pass === '') {
            passDom.focus();
            alert('error : password is required');
            return;
        }

        // ส่งอีเมลเต็ม (`admin@company.com`) และรหัสผ่าน (`pass`) ไปตรวจสอบ
        login(`${user}@company.com`, pass)
            .then((credential) => {
                localStorage.setItem('credential', JSON.stringify(credential));
                const returnPath = localStorage.getItem('returnPath') || '/';
                router.replace(returnPath);
                router.refresh();
            })
            .catch(error => {
                userDom.value = '';
                passDom.value = '';
                userDom.focus();
                alert(`error : ${error}`);
            });
    }

    return (
        <Backdrop isOpen={true}>
            <Dialog showCloseButton={false} className='w-md p-6'>
                <DialogHeader>
                    <DialogTitle className='text-center text-xl font-bold'>Who are you?</DialogTitle>
                </DialogHeader>

                <DialogBody className="space-y-4 mt-2">
                    {/* ช่อง Email / User (มี @company.com ต่อท้าย) */}
                    <InputGroup>
                        <InputGroupAddon>
                            <Keyboard className="w-4 h-4 text-gray-500" />
                        </InputGroupAddon>
                        <InputGroupInput id="user" placeholder="admin" />
                        <InputGroupAddon className="text-gray-400 text-sm font-medium pr-3">
                            @company.com
                        </InputGroupAddon>
                    </InputGroup>

                    {/* ช่อง Password (ไม่มี @company.com ต่อท้าย เพราะรหัสผ่านคือ pass เฉยๆ) */}
                    <InputGroup>
                        <InputGroupAddon>
                            <EyeDisabled className="w-4 h-4 text-gray-500" />
                        </InputGroupAddon>
                        <InputGroupInput id="pass" type='password' placeholder="pass" />
                    </InputGroup>
                </DialogBody>

                <DialogFooter className="flex justify-end mt-4">
                    <button
                        onClick={handleLogin}
                        className={buttonStyles({
                            appearance: 'outline',
                            variant: 'primary',
                            size: 'sm'
                        }) + " px-6 cursor-pointer"}
                    >
                        Login
                    </button>
                </DialogFooter>
            </Dialog>
        </Backdrop>
    );
}
