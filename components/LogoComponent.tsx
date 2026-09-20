import Image from "next/image";
import Link from "next/link";

const LogoComponent = () => {
  return (
    <Link href="/" className="group flex items-center gap-3" aria-label="DICOM home">
      <span className="relative shrink-0">
        {/* Halo that blooms on hover */}
        <span className="absolute -inset-1 rounded-full bg-azure/0 blur-md transition-all duration-500 group-hover:bg-azure/40" />
        <span className="relative block rounded-full p-[2px] bg-gradient-to-br from-azure via-azure/40 to-gold/60 transition-transform duration-500 ease-out-expo group-hover:scale-105">
          <Image
            alt="DICOM logo"
            priority
            width={40}
            height={40}
            src="/logo.webp"
            className="rounded-full bg-ink-900"
          />
        </span>
      </span>

      <span className="hidden sm:block leading-tight">
        <span className="block font-display text-[15px] text-white tracking-tight">
          Directorate of Competitions
        </span>
        <span className="block eyebrow text-[10px] text-white/45 mt-0.5">
          Godfrey Okoye University
        </span>
      </span>
    </Link>
  );
};

export default LogoComponent;
