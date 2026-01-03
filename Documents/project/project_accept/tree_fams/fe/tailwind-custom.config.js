/**
 * TAILWIND CSS CUSTOM UTILITIES untuk Pro Family Tree
 * Tambahkan ke tailwind.config.js untuk custom effects
 */

module.exports = {
  theme: {
    extend: {
      // Custom animations
      animation: {
        slideInLeft: "slideInLeft 0.3s ease-in-out",
        slideInRight: "slideInRight 0.3s ease-in-out",
        fadeInScale: "fadeInScale 0.3s ease-in-out",
        pulse2: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },

      // Custom keyframes
      keyframes: {
        slideInLeft: {
          "0%": {
            opacity: "0",
            transform: "translateX(-20px)",
          },
          "100%": {
            opacity: "1",
            transform: "translateX(0)",
          },
        },
        slideInRight: {
          "0%": {
            opacity: "0",
            transform: "translateX(20px)",
          },
          "100%": {
            opacity: "1",
            transform: "translateX(0)",
          },
        },
        fadeInScale: {
          "0%": {
            opacity: "0",
            transform: "scale(0.95)",
          },
          "100%": {
            opacity: "1",
            transform: "scale(1)",
          },
        },
      },

      // Custom shadows
      boxShadow: {
        glow: "0 0 20px rgba(59, 130, 246, 0.5)",
        glowLg: "0 0 30px rgba(59, 130, 246, 0.7)",
        inset: "inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)",
      },

      // Custom colors
      colors: {
        "tree-primary": "#3b82f6",
        "tree-secondary": "#ef4444",
        "tree-accent": "#10b981",
      },

      // Custom spacing
      spacing: {
        "sidebar-width": "64px",
      },

      // Custom border radius
      borderRadius: {
        "3xl": "24px",
      },
    },
  },

  plugins: [
    /**
     * Custom plugin untuk group-hover effects dengan delay
     */
    function ({ addVariant }) {
      addVariant("group-hover-delayed", ":merge(.group):hover &");
    },

    /**
     * Plugin untuk responsive action buttons
     */
    function ({ addComponents }) {
      addComponents({
        ".action-button": {
          "@apply w-10 h-10 rounded-full shadow-lg transition-all duration-200 transform active:scale-95 flex items-center justify-center":
            {},
        },
        ".action-button-sm": {
          "@apply w-8 h-8 rounded-full shadow-lg transition-all duration-200 transform active:scale-95 flex items-center justify-center":
            {},
        },
        ".tree-card": {
          "@apply rounded-2xl shadow-lg transition-all duration-300 ease-in-out border-2":
            {},
        },
        ".tree-card-hover": {
          "@apply hover:shadow-2xl hover:border-blue-400 hover:scale-105": {},
        },
      });
    },
  ],
};

/**
 * CONTOH PENGGUNAAN CUSTOM UTILITIES:
 *
 * <button className="action-button bg-blue-500 hover:bg-blue-600">
 *   <Edit2 size={18} />
 * </button>
 *
 * <div className="tree-card tree-card-hover bg-white border-gray-200">
 *   ...
 * </div>
 *
 * <div className="animate-slideInLeft">
 *   Animated content
 * </div>
 */
