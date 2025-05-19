import Image from "next/image";

const LogoComponent = () => {
  return (
    <div className='flex items-center gap-1.5 sm:gap-2'>
      <div className='border-4 border-[#179BD7] rounded-full'>
        <Image alt='' priority width={50} height={50} src='/logo.webp' />
      </div>

      <div className='leading-tight sm:leading-3 text-white'>
        <p className='font-semibold  sm:text-lg'>Directorate of Competitions</p>
        <p className=''>Godfrey Okoye University</p>
      </div>
    </div>
  );
};

export default LogoComponent;
