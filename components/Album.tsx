import useAnimalbum from '@/hooks/useAnimalbum';
import styles from '@/styles/album.module.css';
import Loading from './Loading';
import { useEffect, useState } from 'react';
import CustomButton from './CustomButton';
import { Badge, useDisclosure } from '@chakra-ui/react';
import { CardModal } from './CardModal';
import { IToken } from '@/models/IToken';
import { useWeb3React } from '@web3-react/core';

export default function Album() {

    const { tokens, claim, sendToken, isLoading, isAlbumCompleted, claimBonus, bonusToken, transactionPending } = useAnimalbum();
    const { account } = useWeb3React();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [tokenSelected, setTokenSelected] = useState<IToken>();
    const [tokensMemo, setTokensMemo] = useState<IToken[]>([]);
    const [newToken, setNewToken] = useState(0);
    const [isFirstLoading, setIsFirstLoading] = useState(true);

    const claimToken = () => {
        if (!transactionPending) {
            claim();
        }
    }

    const selectToken = (_token: IToken): void => {
        setTokenSelected(_token);
        onOpen();
    }

    const transfer = (value: string): void => {
        if (value.length > 0 && tokenSelected && !transactionPending) {
            sendToken(value, tokenSelected.id);
            onClose();
        }
    }

    const bonus = (): void => {
        if (bonusToken && bonusToken.totalSupply > 0) {
            setTokenSelected(bonusToken);
            onOpen();
        } else {
            if (!transactionPending) {
                claimBonus();
            }
        }
    }

    const setButtonText = (): string => {
        if (!isAlbumCompleted) {
            return 'Reclamar'
        } else if (bonusToken && bonusToken.totalSupply > 0) {
            return 'Ver bonus';
        } else {
            return 'Reclamar bonus';
        }
    }

    useEffect(() => {
        if (tokens.length > 0) {
            if (isFirstLoading) {
                setTokensMemo(tokens);
                setIsFirstLoading(false);
            } else {
                tokens.forEach((token, index) => {
                    if (token.totalSupply !== tokensMemo[index]?.totalSupply) {
                        setNewToken(token.id);
                    }
                });
                setTokensMemo(tokens);
            }
        }
    }, [tokens]);

    useEffect(() => {
        onClose();
    }, [account]);

    return (
        <div className={styles.customContainer}>
            <div className={styles.cardContainer}>
                {
                    tokens.map(item => {
                        return (
                            <div key={item.id} className={`${styles.card} ${!item.uri.image && styles.cardEmpty} ${item.id === newToken && styles.newTokenReceived} `} 
                            onClick={() => selectToken(item)}>
                                {item.uri.image
                                    ? <>
                                        <img className={styles.cardImage} src={item.uri.image} alt={item.uri.name} />
                                        <div className={styles.totalSupply}>
                                            <Badge fontSize='md' colorScheme='purple' >{item.totalSupply}</Badge>
                                        </div>
                                    </>
                                    : <div className={styles.name}>{item.uri.name}</div>
                                }
                            </div>
                        )
                    })
                }
                <CardModal
                    token={tokenSelected}
                    isOpen={isOpen}
                    onOpen={onOpen}
                    onClose={onClose}
                    transfer={transfer}
                    transactionPending={transactionPending}
                />
            </div>
            {
                isLoading
                    ? <Loading />
                    : <CustomButton
                        eventClick={!isAlbumCompleted ? claimToken : bonus}
                        customClass={styles.claimButton}
                        variant="solid"
                        text={setButtonText()}
                        colorScheme={transactionPending ? 'gray' : 'blue' } />
            }
        </div>
    );
}