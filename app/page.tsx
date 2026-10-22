import Image from "next/image";

export default function Home() {
  return (
    <div className="mx-auto mt-6 max-w-4xl px-4">
      <div className="flex flex-col gap-4 rounded-lg border border-slate-200 p-4 shadow-sm md:flex-row">
        {/* ซ้าย: การ์ดรูป + ข้อมูลใต้รูป */}
        <div className="w-full shrink-0 rounded-lg border border-slate-200 p-2 md:w-[260px]">
          {/* รูปนักศึกษา: public/stdempimg.png */}
          <div className="relative aspect-[4/5] w-full overflow-hidden rounded-lg">
            <Image
              src="/stdempimg.png"
              alt="Student"
              fill
              priority
              sizes="260px"
              className="object-cover"
            />
          </div>

          {/* ข้อมูลใต้รูป (ตัวเล็ก) */}
          <div className="mt-3 space-y-1 text-sm text-slate-800">
            <p>
              <span className="font-bold">ใส่ชื่อ-นามสกุล</span>, ใส่ตำแหน่ง/สถานะ
            </p>
            <p>ใส่ภาควิชา / สาขา</p>
            <p>
              ใส่คณะ (<span className="font-bold">ตัวย่อ</span>)
            </p>
            <p>
              ใส่มหาวิทยาลัย (<span className="font-bold">ตัวย่อ</span>)
            </p>
          </div>
        </div>

        {/* ขวา: ข้อความ */}
        <div className="flex-1 text-sm text-slate-800">
          {/* หัวข้อ (ตัวหนา) */}
          <p>
            <span className="font-bold">ใส่หัวข้อ/ชื่อวิชา</span> ใส่คำอธิบายสั้นๆ ต่อท้าย
          </p>

          {/* รายการ (หัวข้อย่อยตัวหนา + รายละเอียดตัวเล็ก) */}
          <ul className="mt-3 list-disc space-y-3 pl-8">
            <li>
              <span className="font-bold">หัวข้อย่อย 1:</span> ใส่รายละเอียดตรงนี้
            </li>
            <li>
              <span className="font-bold">หัวข้อย่อย 2:</span> ใส่รายละเอียดตรงนี้
            </li>
            <li>
              <span className="font-bold">หัวข้อย่อย 3:</span> ใส่รายละเอียดตรงนี้
            </li>
            <li>
              <span className="font-bold">หัวข้อย่อย 4:</span> ใส่รายละเอียดตรงนี้
            </li>
            <li>
              <span className="font-bold">หัวข้อย่อย 5:</span> ใส่รายละเอียดตรงนี้
            </li>
          </ul>

          {/* ประโยคปิดท้าย */}
          <p className="mt-3">ใส่ข้อความปิดท้ายตรงนี้ :)</p>
        </div>
      </div>
    </div>
  );
}