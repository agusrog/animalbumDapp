import { Spinner } from '@chakra-ui/react';

export default function Loading() {

    return (
        <Spinner color="blue.500"
            thickness="4px"
            speed="0.65s"
            emptyColor="gray.200" size="xl" />
    );
}