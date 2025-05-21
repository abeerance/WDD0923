import Image from "next/image";
import Link from "next/link";

export const Header = () => {
  return (
    <header className="flex p-l justify-between items-center bg-gray-100 border-b border-b-gray-200">
      <Link href="/" className="cursor-pointer">
        {/*
        1. possibility, if the image is always the same dimension
        <Image src="/logo/wandrstay-logo.svg" alt="wandrstay logo" width={60} height={30} />
        */}
        <div>
          <Image src="/logo/wandrstay-logo.svg" alt="wandrstay logo" fill />
        </div>
      </Link>
    </header>
  );
};
