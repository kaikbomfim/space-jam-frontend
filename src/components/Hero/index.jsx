import { HERO_CONTAINER, HERO_GLOWS } from "../../constants/styles/hero";

const Hero = ({
  eyebrow,
  title,
  description,
  illustration,
  glow = "flame",
  children,
}) => {
  return (
    <section className={`${HERO_CONTAINER} ${HERO_GLOWS[glow]}`}>
      <div className="relative z-10 flex max-w-2xl flex-col gap-5">
        {eyebrow && (
          <span className="text-[13px] font-bold tracking-[2px] text-nebula">
            {eyebrow}
          </span>
        )}
        <h1 className="font-display text-4xl font-bold tracking-tight sm:text-6xl">
          {title}
        </h1>
        {description && <p className="text-lg text-muted">{description}</p>}
        {children && (
          <div className="flex flex-col gap-3 pt-2 sm:flex-row">{children}</div>
        )}
      </div>
      {illustration && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-12 top-1/2 hidden -translate-y-1/2 lg:block"
        >
          {illustration}
        </div>
      )}
    </section>
  );
};

export default Hero;
