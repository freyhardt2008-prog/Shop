/**
 * HEAL ACTIVE – Markenzeichen: das laufende Skelett.
 *
 * Gestaltungsidee
 * ---------------
 * Das Skelett steht für "Bewegung trotz Verletzung": Rehabilitation,
 * Rückkehr zum Sport, Aktivität. Es ist bewusst grafisch reduziert und mit
 * runden Strichenden gezeichnet – dynamisch und sympathisch statt morbide
 * oder röntgenbildhaft. Keine Zähne, keine Augenhöhlen, keine Details, die
 * ins Anatomiebuch gehören.
 *
 * Der Laufschritt ist weit ausgestellt, der Oberkörper leicht nach vorne
 * geneigt; drei Speedlines im Rücken betonen die Bewegungsrichtung.
 *
 * Austausch gegen ein finales Logo
 * --------------------------------
 * Diese Komponente ist der einzige Ort, an dem das Markenzeichen gezeichnet
 * wird. Sobald ein professionell gestaltetes SVG vorliegt, wird hier der
 * Pfad-Inhalt ersetzt (oder ein `<Image src="/logo.svg" />` eingesetzt) – alle
 * Verwendungsstellen übernehmen das automatisch.
 */

interface LogoMarkProps {
  className?: string;
  /** Speedlines ausblenden, z. B. in sehr kleinen Größen. */
  withMotionLines?: boolean;
  title?: string;
}

export function LogoMark({
  className,
  withMotionLines = true,
  title = 'HEAL ACTIVE Markenzeichen: laufendes Skelett',
}: LogoMarkProps) {
  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      role="img"
      aria-label={title}
      className={className}
    >
      {withMotionLines && (
        <g stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" opacity="0.28">
          <line x1="3" y1="18" x2="13" y2="18" />
          <line x1="1.5" y1="29" x2="9.5" y2="29" />
          <line x1="5" y1="40" x2="12" y2="40" />
        </g>
      )}

      <g
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      >
        {/* Schädel – schlichte Kapselform, leicht nach vorn geneigt */}
        <circle cx="45" cy="12.5" r="5.5" strokeWidth="2.8" />

        {/* Wirbelsäule: vom Nacken diagonal zum Becken */}
        <path d="M41.5 17.5C39 22 35 27 30.5 33" strokeWidth="2.8" />

        {/* Brustkorb: drei nach vorn geöffnete Rippenbögen */}
        <g strokeWidth="2.2" opacity="0.95">
          <path d="M39.6 20.8C43.2 21.8 45.4 24.6 44.8 27.6" />
          <path d="M36.4 25C40 26 42.3 28.8 41.7 31.8" />
          <path d="M33.2 29.2C36.8 30.2 39 33 38.4 36" />
        </g>

        {/* Becken als kompakte Kapsel */}
        <line x1="26.5" y1="33.5" x2="32.5" y2="35.5" strokeWidth="6" strokeLinecap="round" />

        {/* Vorderes Bein: Knie hoch, Fuß nach vorn */}
        <path d="M31.5 36.5L41.5 37.5L44.5 47.5" />
        <path d="M44.5 47.5L50.5 49" strokeWidth="2.6" />

        {/* Hinteres Bein: weit gestreckt nach hinten */}
        <path d="M28.5 36.5L19 44L14 53" />
        <path d="M14 53L8.5 52.5" strokeWidth="2.6" />

        {/* Vorderer Arm: angewinkelt nach oben */}
        <path d="M38 21.5L46 25.5L49 18.5" strokeWidth="2.6" />

        {/* Hinterer Arm: nach hinten geführt */}
        <path d="M36.5 23.5L28 26.5L22.5 21.5" strokeWidth="2.6" />
      </g>

      {/* Gelenkpunkte – geben dem Zeichen Halt und wirken freundlich */}
      <g fill="currentColor">
        <circle cx="41.5" cy="37.5" r="1.9" />
        <circle cx="19" cy="44" r="1.9" />
        <circle cx="46" cy="25.5" r="1.6" />
        <circle cx="28" cy="26.5" r="1.6" />
      </g>
    </svg>
  );
}
