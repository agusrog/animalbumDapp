import { IToken } from "./IToken";

export interface IAnimalbum {
    balance: number;
    tokens: IToken[];
    claim: () => Promise<void>;
    sendToken: (to: string, tokenId: number) => Promise<void>;
    isLoading: boolean;
    isAlbumCompleted: boolean;
}

export interface ICustomToast {
    successToast: () => void;
    completeToast: () => void;
    errorToast: () => void;
}