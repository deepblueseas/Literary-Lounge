import React, { useState } from "react";
import { StarIcon } from '@chakra-ui/icons';
import { Box, IconButton, useToast } from '@chakra-ui/react';



const Rate = () => {
    const [rate, setRate] = useState(0);
    const toast = useToast();

    const handleRating = (givenRating) => {
        setRate(givenRating);
        toast({
            title: `You have rated ${givenRating} stars`,
            status: 'info',
            duration: 2000,
            isClosable: true,
        });
    };

    return (
        <Box display="flex" justifyContent="center" alignItems="center">
        {[...Array(5)].map((_, index) => {
            const givenRating = index + 1;
            return (
                <IconButton
                    key={index}
                    icon={<StarIcon />}
                    colorScheme={givenRating <= rate ? "yellow" : "gray"}
                    onClick={() => handleRating(givenRating)}
                    variant="ghost"
                    aria-label={`Rate ${givenRating} stars`}
                />
            );
        })}
    </Box>
);
};

export default Rate;

    





  