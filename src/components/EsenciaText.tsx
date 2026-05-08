import { motion, useReducedMotion } from "framer-motion";

export interface EsenciaTextProps {
  frases: string[];
}

const EASE = [0.22, 1, 0.36, 1] as const;

export const EsenciaText = ({ frases }: EsenciaTextProps) => {
  const reduce = useReducedMotion();

  return (
    <div className="flex flex-col gap-10 sm:gap-14">
      {frases.map((frase, index) => {
        const words = frase.split(" ");
        const offset = index === 1 ? "translate-x-[6vw]" : index === 2 ? "translate-x-[2vw] sm:translate-x-[12vw]" : "";

        return (
          <motion.p
            key={frase}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.25 }}
            className={`font-display text-[12vw] uppercase leading-[0.92] tracking-tight text-[color:var(--color-text)] sm:text-[10vw] md:text-[8vw] ${offset}`}
          >
            {words.map((word, wIdx) => (
              <span
                key={`${frase}-${wIdx.toString()}`}
                className="mr-[0.25em] inline-block overflow-hidden align-bottom"
              >
                <motion.span
                  className="inline-block"
                  variants={{
                    hidden: { y: "110%", opacity: 0 },
                    visible: { y: "0%", opacity: 1 },
                  }}
                  transition={{
                    duration: 0.75,
                    ease: EASE,
                    delay: reduce ? 0 : index * 0.18 + wIdx * 0.06,
                  }}
                >
                  {word}
                </motion.span>
              </span>
            ))}
          </motion.p>
        );
      })}

      <motion.svg
        aria-hidden
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 1.1, ease: EASE, delay: 0.3 }}
        style={{ originX: 0 }}
        viewBox="0 0 1200 16"
        preserveAspectRatio="none"
        className="mt-4 h-4 w-full text-[color:var(--color-accent)]"
      >
        <path
          d="M0,8 L120,8 L150,2 L180,14 L210,8 L500,8 L530,1 L560,15 L590,8 L900,8 L930,3 L960,13 L990,8 L1200,8"
          stroke="currentColor"
          strokeWidth="2"
          fill="none"
        />
      </motion.svg>
    </div>
  );
};
