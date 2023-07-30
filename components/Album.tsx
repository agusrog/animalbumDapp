import useAnimalbum from "@/hooks/useAnimalbum";
import styles from "@/styles/album.module.css";
import Loading from "./Loading";
import { useState } from "react";
import CustomButton from "./CustomButton";
import { Badge, useDisclosure } from "@chakra-ui/react";
import { CardModal } from "./CardModal";
import { IToken } from "@/models/IToken";

export default function Album() {

    const { tokens, claim, sendToken, isLoading, isAlbumCompleted } = useAnimalbum();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [ tokenSelected, setTokenSelected ] = useState<IToken>();

    const selectToken = (_token: IToken) => {
        setTokenSelected(_token);
        onOpen();
    }

    const transfer = (value: string) => {
        if (value.length > 0 && tokenSelected) {
            sendToken(value, tokenSelected.id);
            onClose();
        }
    }

    return (
        <div className={styles.customContainer}>
            <div className={styles.cardContainer}>
                {
                    tokens.map(item => {
                        return (
                            <div key={item.id} className={styles.card} onClick={() => selectToken(item)}>
                                {item.uri.image
                                    ? <>
                                        <img className={styles.cardImage} src={item.uri.image} />
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
                />
            </div>
            {
                isLoading
                    ? <Loading />
                    : <CustomButton
                        eventClick={!isAlbumCompleted ? claim : () => {}}
                        customClass={styles.claimButton}
                        variant="solid"
                        text={!isAlbumCompleted ? 'Reclamar' : 'Bonus'}
                        colorScheme="blue" />
            }
        </div>
    );
}