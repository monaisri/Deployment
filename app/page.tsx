import Image from "next/image";

export default function Home() {
  return (
    <div className="mx-auto mt-6 max-w-4xl px-4">
      <div className="flex flex-col overflow-hidden rounded-lg border border-slate-300 shadow-sm md:flex-row">
        {/* ซ้าย: รูป + ข้อมูลใต้รูป (มีเส้นคั่นด้านขวา) */}
        <div className="w-full shrink-0 border-b border-slate-300 p-2 md:w-[215px] md:border-r md:border-b-0">
          {/* รูปนักศึกษา: public/stdempimg.png */}
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

          {/* ข้อมูลใต้รูป */}
          <div className="mt-3 space-y-0.5">
            {/* ชื่อ (ตัวใหญ่ หนา) */}
            <p className="text-lg font-bold text-slate-900">โมไนย ศรีนวล</p>

            {/* รายละเอียด (ตัวเล็ก) */}
            <p className="text-xs text-slate-700">รหัสนักศึกษา 68100663</p>
            <p className="text-xs text-slate-700">คณะ เทคโนโลยีสารสนเทศ</p>
            <p className="text-xs text-slate-700">สาขาวิชา วิทยาการคอมพิวเตอร์และนวัตกรรมการพัฒนาซอฟต์แวร์</p>
            <p className="text-xs text-slate-700">มหาวิทยาลัยศรีปทุม</p>
          </div>
        </div>

        {/* ขวา: ข้อความ */}
        <div className="flex-1 p-4 text-slate-700">
          {/* หัวข้อใหญ่ */}
          <h1 className="text-2xl font-bold text-slate-900">
            CSI205 Front-End Software Development
          </h1>

          {/* แนะนำตัว */}
          <p className="mt-3 text-base">
            สวัสดี ผมโมไนย ศรีนวล เป็นนักศึกษาชั้นปีที่ 2 สาขาวิชาวิทยาการคอมพิวเตอร์และนวัตกรรมการพัฒนาซอฟต์แวร์ คณะเทคโนโลยีสารสนเทศ มหาวิทยาลัยศรีปทุม
            มีความสนใจและสนุกไปกับการพัฒนาเว็บไซต์และแอปพลิเคชันด้วยเทคโนโลยี Front-End 
          </p>

          {/* รายการ (หัวข้อหนา + รายละเอียด) */}
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
    </div>
  );
}