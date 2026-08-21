export const idiomas = [
  "Português",
  "Inglês",
  "Espanhol",
  "Francês",
  "Alemão",
  "Italiano",
  "Japonês",
  "Chinês",
  "Coreano",
] as const;

export type Idioma = (typeof idiomas)[number];
export type MapaIdiomas = Record<Idioma, string>;
