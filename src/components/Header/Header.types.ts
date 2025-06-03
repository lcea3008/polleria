// En este caso, el Header no tiene props externas, pero siempre es bueno definir la interfaz.
// Si en el futuro recibiera algo como un array de enlaces, sería:
// export interface HeaderProps {
//   navLinks: { name: string; href: string }[];
// }

// Por ahora, lo dejamos vacío o no lo exportamos si el componente es puramente interno y no recibe props.
export interface HeaderProps {
  // Aquí irían las propiedades si el Header las necesitara (ej: logoUrl: string)
}