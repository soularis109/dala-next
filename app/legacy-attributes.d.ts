// Кастомні DOM-атрибути, які читає старий легасі-бандл (legacy/2601.cjs, legacy/4212.cjs).
// Дозволяємо їх у JSX для всіх елементів, щоб мігровані секції могли нести ці атрибути
// буквально (без них легасі-селектори `[animate-from]`, `[dom2webgl]`, `[asscroll-container]` тощо не знайдуть елемент).
import "react";

declare module "react" {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface HTMLAttributes<T> {
    "animate-from"?: string;
    "animate-to"?: string;
    "animate-mq"?: string;
    "section-name"?: string;
    "anchor-link"?: string;
    "anchor-target"?: string;
    "dom2webgl"?: string;
    "material-color"?: string;
    "start-x"?: string | number;
    "parallax-speed"?: string | number;
    "asscroll-container"?: string;
    "asscroll"?: string;
  }
}
