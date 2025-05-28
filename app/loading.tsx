import Image from "next/image";

const Loading = () => {
  return (
    <div className='animate-pulse flex w-full h-screen items-center justify-center'>
      <div className='flex items-center gap-3'>
        <Image priority alt='' width={70} height={70} src='/logo.webp' />
        <p>Please wat...</p>
      </div>
    </div>
  );
};

export default Loading;
