import Image from "next/image";
import Link from "next/link";

const LogoComponent = () => {
  return (
    <div>
      <Link href='/'>
        <div className='flex items-center gap-1'>
          <div className='border-4 border-[#179BD7] rounded-full'>
            <Image alt='' priority width={47} height={47} src='/logo.webp' />
          </div>

          <div className=' leading-tight sm:leading-5 text-white'>
            <p className='font-semibold'>
              Directorate of Competitions
            </p>
            <p className='text-sm'>Godfrey Okoye University</p>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default LogoComponent;
