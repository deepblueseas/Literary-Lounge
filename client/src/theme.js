import { extendTheme, Heading } from "@chakra-ui/react";

const customTheme = extendTheme({
    colors: {
        primary: {
            100: '#E5FCF1',
            200: '#27EF96',
            300: '#10DE82',
            400: '#0EBE6F',
            500: '#0CA25F',
            600: '#0A864F',
            700: '#086F42',
            800: '#075C37',
            900: '#064C2E',
        },
    },
    fonts: {
        heading: "'Fira Code', sans-serif",
        body: "'Fira Code', sans-serif",
    },
    styles: {
        global: {
            body: {
                bg: 'gray.100',
                color: 'gray.800',
            },
        },
    },
});

export default customTheme;