export interface IUri {
  name: string,
  description: string | undefined,
  image: string | undefined
  id: number
}

export interface IToken {
  id: number,
  totalSupply: number,
  uri: IUri
}
