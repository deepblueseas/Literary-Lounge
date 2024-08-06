import React from "react";
import { Box } from "@chakra-ui/react";
import BookClubForm from "../components/BookClubForm";
import BookClubList from "../components/BookClubList";

const BookClubsPage = () => {
  return (
    <Box>
      <BookClubForm />
      <BookClubList />
    </Box>
  );
};

export default BookClubsPage;