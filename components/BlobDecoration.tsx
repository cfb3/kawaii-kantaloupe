import Image from 'next/image';
import { DecorationBlob } from '@/types';

interface BlobDecorationProps {
  blob: DecorationBlob;
  size?: number;
  className?: string;
}

export default function BlobDecoration({ blob, size = 100, className = '' }: BlobDecorationProps) {
  return (
    <div
      className={`blob-decoration pointer-events-none ${className}`}
      aria-hidden="true"
    >
      <Image
        src={blob.image}
        alt={blob.alt}
        width={size}
        height={size}
        className="object-contain"
        priority={false}
      />
    </div>
  );
}
