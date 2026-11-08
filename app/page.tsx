'use client'

import { useState, useContext } from "react";
import Image from "next/image";
import { Backdrop } from "@/components/tailgrids/core/overlay";
import {
  Dialog,
  DialogHeader,
  DialogTitle,
  DialogBody,
  DialogFooter,
} from "@/components/tailgrids/core/dialog";

import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/tailgrids/core/input-group";

import { buttonStyles } from "@/components/tailgrids/core/button";
import { login } from "@/data/credential";
import { globalDataContext } from "@/context/globalData";
import { Keyboard, Eye, EyeOff } from "lucide-react";

export default function Home() {
  const context = useContext(globalDataContext);
  const user = context?.user;
  const setUser = context?.setUser || (() => {});

  const [emailPrefix, setEmailPrefix] = useState("");
  const [password, setPassword] = useState("pass");
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async () => {
    try {
      const fullEmail = `${emailPrefix}@company.com`;
      const res = await login(fullEmail, password);
      setUser(res); // ล็อกอินสำเร็จ บันทึกสถานะ
    } catch (err) {
      // ใช้ alert แจ้งเตือนเมื่อล็อกอินไม่สำเร็จ
      alert(String(err));
    }
  };

  return (
    <div className="mx-auto mt-6 max-w-4xl px-4 relative">
      {/* เนื้อหาหน้าแรกเดิมของคุณ */}
      <div className="flex flex-col overflow-hidden rounded-lg border border-slate-300 shadow-sm md:flex-row">
        {/* ซ้าย: รูป + ข้อมูลใต้รูป (มีเส้นคั่นด้านขวา) */}
        <div className="w-full shrink-0 border-b border-slate-300 p-2 md:w-[215px] md:border-r md:border-b-0">
          <div className="relative aspect-[3/4] w-full overflow-hidden rounded-lg">
            <Image
              src="/stdempimg.png"
              alt="Student"
              fill
              priority
              sizes="215px"
              className="object-cover"
            />
          </div>

          <div className="mt-3 space-y-0.5">
            <p className="text-lg font-bold text-slate-900">โมไนย ศรีนวล</p>
            <p className="text-xs text-slate-700">รหัสนักศึกษา 68100663</p>
            <p className="text-xs text-slate-700">คณะ เทคโนโลยีสารสนเทศ</p>
            <p className="text-xs text-slate-700">สาขาวิชา วิทยาการคอมพิวเตอร์และนวัตกรรมการพัฒนาซอฟต์แวร์</p>
            <p className="text-xs text-slate-700">มหาวิทยาลัยศรีปทุม</p>
          </div>
        </div>

        {/* ขวา: ข้อความ */}
        <div className="flex-1 p-4 text-slate-700">
          <h1 className="text-2xl font-bold text-slate-900">
            CSI205 Front-End Software Development
          </h1>
          <p className="mt-3 text-base">
            สวัสดี ผมโมไนย ศรีนวล เป็นนักศึกษาชั้นปีที่ 2 สาขาวิชาวิทยาการคอมพิวเตอร์และนวัตกรรมการพัฒนาซอฟต์แวร์ คณะเทคโนโลยีสารสนเทศ มหาวิทยาลัยศรีปทุม
            มีความสนใจและสนุกไปกับการพัฒนาเว็บไซต์และแอปพลิเคชันด้วยเทคโนโลยี Front-End 
          </p>
          <ul className="mt-3 list-disc space-y-1 pl-6 text-base">
            <li>
              <span className="font-bold">เป้าหมาย:</span> ต้องการสนุกไปกับการเขียนโค้ดและสร้างสิ่งที่ต้องการ
            </li>
            <li>
              <span className="font-bold">สายงานที่ต้องการ:</span> ต้องการทำงานในสาขา Front-End Development หรือ Web Development
            </li>
          </ul>
        </div>
      </div>

      {/* ถ้ายังไม่ล็อกอิน ให้แสดงหน้า Dialog ล็อกอินทับหน้าแรกทันที */}
      {!user && (
        <Backdrop isOpen={true}>
          <Dialog showCloseButton={false} className="max-w-md w-full p-6">
            <DialogHeader>
              <DialogTitle className="text-center text-xl font-bold">Who are you?</DialogTitle>
            </DialogHeader>

            <DialogBody className="space-y-4 mt-2">
              {/* ช่อง Email: Input อยู่ซ้าย, @company.com อยู่ขวาสุด */}
              <InputGroup className="relative">
                <InputGroupAddon>
                  <Keyboard className="w-4 h-4 text-gray-500" />
                </InputGroupAddon>
                <InputGroupInput
                  type="text"
                  placeholder="user | admin | manager"
                  value={emailPrefix}
                  onChange={(e) => setEmailPrefix(e.target.value)}
                  className="pr-28"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm font-medium pointer-events-none">
                  @company.com
                </span>
              </InputGroup>

              {/* ช่อง Password: Input อยู่ซ้าย, @company.com อยู่ขวาสุด */}
              <InputGroup className="relative">
                <InputGroupAddon 
                  className="cursor-pointer" 
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4 text-gray-500" />
                  ) : (
                    <Eye className="w-4 h-4 text-gray-500" />
                  )}
                </InputGroupAddon>
                <InputGroupInput
                  type={showPassword ? "text" : "password"}
                  placeholder="pass"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pr-28"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm font-medium pointer-events-none">
                  @company.com
                </span>
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
      )}
    </div>
  );
}