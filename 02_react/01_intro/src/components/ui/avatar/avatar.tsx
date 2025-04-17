import Image from "next/image";

interface AvatarProps {
  src: string;
  alt?: string;
}

export const Avatar = ({ src, alt }: AvatarProps) => {
  return (
    <div className="h-56 w-56 relative rounded-full overflow-hidden shrink-0">
      <Image src={src} alt={alt ?? ""} fill objectFit="cover" />
    </div>
  );
};
