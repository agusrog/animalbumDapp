export interface IUri {
  name: string,
  description: string | undefined,
  image: string | undefined
}

export interface IToken {
  id: number,
  totalSupply: number,
  uri: IUri
}
