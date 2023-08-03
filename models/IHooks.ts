import { IToken } from './IToken';

export interface IAnimalbum {
    balance: number;
    tokens: IToken[];
    bonusToken: IToken | undefined;
    claim: () => Promise<void>;
    claimBonus: () => Promise<void>;
    sendToken: (to: string, tokenId: number) => Promise<void>;
    isLoading: boolean;
    isAlbumCompleted: boolean;
}

export interface ICustomToast {
    successToast: () => void;
    completeToast: () => void;
    errorToast: () => void;
}