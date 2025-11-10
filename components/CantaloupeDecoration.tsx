'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';

interface CantaloupePosition {
  top: string;
  left: string;
  rotation: number;
  scale: number;
}

export default function CantaloupeDecoration() {
  const [positions, setPositions] = useState<CantaloupePosition[]>([]);

  useEffect(() => {
    // Generate 6-8 random positions for cantaloupe slices
    const count = Math.floor(Math.random() * 3) + 6; // 6-8 slices
    const newPositions: CantaloupePosition[] = [];
    const minDistance = 25; // Minimum distance between cantaloupes (in percentage)

    // Helper function to check if a position is far enough from existing ones
    const isFarEnough = (newPos: CantaloupePosition) => {
      return newPositions.every((existingPos) => {
        const topDiff = Math.abs(parseFloat(newPos.top) - parseFloat(existingPos.top));
        const leftDiff = Math.abs(parseFloat(newPos.left) - parseFloat(existingPos.left));
        const distance = Math.sqrt(topDiff * topDiff + leftDiff * leftDiff);
        return distance >= minDistance;
      });
    };

    // Generate positions with minimum spacing
    let attempts = 0;
    const maxAttempts = 100;

    while (newPositions.length < count && attempts < maxAttempts) {
      const candidate = {
        top: `${Math.random() * 80 + 10}%`, // 10-90% from top
        left: `${Math.random() * 80 + 10}%`, // 10-90% from left
        rotation: Math.random() * 360, // Random rotation
        scale: Math.random() * 0.4 + 0.6, // Scale between 0.6 and 1.0
      };

      if (isFarEnough(candidate)) {
        newPositions.push(candidate);
      }
      attempts++;
    }

    setPositions(newPositions);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
      {positions.map((pos, index) => (
        <div
          key={index}
          className="absolute"
          style={{
            top: pos.top,
            left: pos.left,
            transform: `rotate(${pos.rotation}deg) scale(${pos.scale})`,
          }}
        >
          <Image
            src="/images/background/cantaloupe.png"
            alt=""
            width={200}
            height={200}
            className="opacity-30"
            priority={false}
          />
        </div>
      ))}
    </div>
  );
}
