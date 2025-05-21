import Image from "next/image";
import Link from "next/link";

export const Logo = () => {
  return (
    <Link href="/" className="cursor-pointer">
      {/*
        1. possibility, if the image is always the same dimension
        <Image src="/logo/wandrstay-logo.svg" alt="wandrstay logo" width={60} height={30} />
        */}
      <div className="relative w-[60px] aspect-[16/9]">
        {/* parent container of image */}
        <Image src="/logo/wandrstay-logo.svg" alt="wandrstay logo" fill />
      </div>
    </Link>
  );
};
