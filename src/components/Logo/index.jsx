const Logo = ({ size = 40, showText = true }) => {
  return (
    <span className="flex items-center gap-3 text-ink">
      <svg
        width={size}
        height={size}
        viewBox="0 0 40 40"
        fill="none"
        aria-hidden="true"
      >
        <circle cx="20" cy="20" r="12" fill="#FF7A1A" />
        <path
          d="M8 20h24M20 8v24M12 11.5c3.6 3.6 3.6 13.4 0 17M28 11.5c-3.6 3.6-3.6 13.4 0 17"
          stroke="#0A0D1C"
          strokeWidth="1.5"
        />
        <ellipse
          cx="20"
          cy="20"
          rx="19"
          ry="6.5"
          transform="rotate(-22 20 20)"
          stroke="#B7A4FF"
          strokeWidth="1.6"
        />
      </svg>
      {showText && (
        <span className="font-display text-xl tracking-wide">
          <strong className="font-bold">SPACE</strong>
          <span className="font-medium text-flame">JAM</span>
        </span>
      )}
    </span>
  );
};

export default Logo;
