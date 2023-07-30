import { ICustomToast } from '@/models/IHooks';
import { useToast } from '@chakra-ui/react';

const useCustomToast = (): ICustomToast => {

    const toast = useToast();

    const successToast = () => {
        toast({
            title: 'Pendiente de aprobación',
            description: `Transacción en curso, verás los resultados cuando la transacción se complete.`,
            status: 'info',
            duration: 9000,
            isClosable: true,
        });
    }

    const completeToast = () => {
        toast({
            title: 'Transacción completada',
            description: `Recuerda que solo se puede reclamar cada 24hs.`,
            status: 'success',
            duration: 5000,
            isClosable: true,
        });
    }

    const errorToast = () => {
        toast({
            title: 'Error en la transaccion',
            description: `Hubo un error en la transacción. Por favor intente nuevamente.`,
            status: 'error',
            duration: 9000,
            isClosable: true,
        });
    }

    return {
        successToast,
        completeToast,
        errorToast
    };
};

export default useCustomToast;