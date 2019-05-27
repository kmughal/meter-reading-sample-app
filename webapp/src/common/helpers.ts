export const formateDate = v => new Date(String(v)).toLocaleDateString('en-GB')


export const mediaMinWidth = (value:number) => {
  return `@media screen and (min-width: ${value}px)`;
}

export const mediaMaxWidth = (value:number) => `@media screen and (max-width: ${value}px)`

export const mediaBetweenWidth = (min:number, max:number) =>
  `@media screen and (min-width: ${min}px) and (max-width: ${max}px)`
