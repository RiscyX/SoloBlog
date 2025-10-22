const BrandMark = () => {
  return (
    <svg
      aria-hidden="true"
      className="h-9 w-9"
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="soloblogGradient" x1="8" y1="6" x2="32" y2="34" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#A855F7" />
          <stop offset="50%" stopColor="#8B5CF6" />
          <stop offset="100%" stopColor="#7C3AED" />
        </linearGradient>
      </defs>
      <path
        d="M10 8C10 5.23858 12.2386 3 15 3H25C27.7614 3 30 5.23858 30 8C30 10.7614 27.7614 13 25 13H15C12.2386 13 10 10.7614 10 8Z"
        fill="url(#soloblogGradient)"
      />
      <path
        d="M8 20C8 17.2386 10.6863 15 14 15H26C29.3137 15 32 17.2386 32 20C32 22.7614 29.3137 25 26 25H14C10.6863 25 8 22.7614 8 20Z"
        fill="url(#soloblogGradient)"
      />
      <path
        d="M10 32C10 29.2386 12.2386 27 15 27H25C27.7614 27 30 29.2386 30 32C30 34.7614 27.7614 37 25 37H15C12.2386 37 10 34.7614 10 32Z"
        fill="url(#soloblogGradient)"
      />
    </svg>
  );
};

export default BrandMark;