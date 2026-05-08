import { motion } from "framer-motion";
import type { Artist } from "@/config/session";

export interface ArtistListProps {
  artists: Artist[];
}

const EASE = [0.22, 1, 0.36, 1] as const;

export const ArtistList = ({ artists }: ArtistListProps) => {
  return (
    <ul className="flex flex-col">
      {artists.map((artist, index) => {
        const indexLabel = (index + 1).toString().padStart(2, "0");
        return (
          <motion.li
            key={artist.nombre}
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{
              duration: 0.55,
              ease: EASE,
              delay: index * 0.08,
            }}
            whileHover="hover"
            className="group/artist relative isolate flex flex-col gap-2 border-b-2 border-white/10 py-7 sm:flex-row sm:items-baseline sm:justify-between sm:py-9"
          >
            <motion.span
              aria-hidden
              initial={{ scaleX: 0 }}
              variants={{ hover: { scaleX: 1 } }}
              transition={{ duration: 0.5, ease: EASE }}
              style={{ originX: 0 }}
              className="absolute inset-y-0 left-0 -z-10 hidden w-full bg-[color:var(--color-accent)] sm:block"
            />

            <div className="relative z-10 flex items-baseline gap-3 sm:gap-6">
              <span className="font-display hidden text-lg uppercase text-white/40 transition-colors duration-500 group-hover/artist:text-[#0A0A0A] sm:block">
                {indexLabel}
              </span>

              <motion.span
                variants={{ hover: { x: 14 } }}
                transition={{ duration: 0.5, ease: EASE }}
                className="font-display text-5xl uppercase leading-none text-white transition-colors duration-500 group-hover/artist:text-[#0A0A0A] sm:text-6xl md:text-7xl lg:text-[6.5vw]"
              >
                {artist.nombre}
              </motion.span>

              <motion.span
                aria-hidden
                initial={{ x: -16, opacity: 0 }}
                variants={{ hover: { x: 4, opacity: 1 } }}
                transition={{ duration: 0.45, ease: EASE }}
                className="font-display hidden text-3xl text-[#0A0A0A] sm:inline sm:text-4xl"
              >
                ↗
              </motion.span>
            </div>

            <div className="relative z-10 flex items-baseline gap-4 text-sm uppercase tracking-[0.3em] text-white/60 transition-colors duration-500 group-hover/artist:text-[#0A0A0A]">
              {artist.rol ? <span>{artist.rol}</span> : null}
              {artist.instagram ? (
                <a
                  href={`https://instagram.com/${artist.instagram}`}
                  target="_blank"
                  rel="noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="underline-offset-4 transition-colors hover:underline"
                >
                  @{artist.instagram}
                </a>
              ) : null}
            </div>
          </motion.li>
        );
      })}
    </ul>
  );
};
