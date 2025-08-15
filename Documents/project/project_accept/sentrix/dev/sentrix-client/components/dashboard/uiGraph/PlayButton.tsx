import React from 'react';
import { FaPlay } from 'react-icons/fa';

/**
 * A reusable Play button component with a modern design.
 * It features a play icon and text, and includes hover effects.
 */
export default function PlayButton() {
  return (
    <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-200 text-gray-700 font-semibold hover:bg-gray-300 transition-colors duration-200">
      <FaPlay />
      Play
    </button>
  );
}
