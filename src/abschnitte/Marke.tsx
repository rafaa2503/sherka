/* Das Logo: das Zeichen aus zwei Halbellipsen mit dem Bernstein-Punkt
   (dieselben Formen wie public/favicon.svg) und die Wortmarke "sherka.".
   Die Formen nehmen die Textfarbe an, der Punkt ist immer Bernstein. */

export function Marke() {
  return (
    <>
      <svg className="marke-zeichen" viewBox="127 96 258 320" aria-hidden="true" focusable="false">
        <g transform="translate(-39 0)">
          <path d="M286 96A120 80 0 0 0 286 256ZM226 256A120 80 0 0 1 226 416Z" fill="currentColor" />
          <circle className="marke-punkt-kreis" cx="392" cy="384" r="32" />
        </g>
      </svg>
      <span className="marke-wort">
        sherka<span className="marke-punkt">.</span>
      </span>
    </>
  );
}
