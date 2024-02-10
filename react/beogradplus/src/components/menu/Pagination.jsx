import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import { Button, Center, Icon, Stack } from "@chakra-ui/react";
import React from "react";
import { useState } from "react";

export default function Pagination({ metaData, onChange }) {
  //const [page, setPage] = useState(1);

  function PaginationButton({ icon, url }) {
    return (
      <Button
        w="2.5rem"
        bg="transparent"
        onClick={() => {
          if (url) onChange(url.split("api")[1]);
        }}
        color={url ? "gray.800" : "gray.400"}
      >
        <Icon as={icon} boxSize={6} />
      </Button>
    );
  }

  return (
    <Stack
      direction="row"
      mt="auto"
      mb="1"
      justify="center"
      align="center"
      spacing={4}
    >
      {/* previous page */}
      <PaginationButton icon={ChevronLeftIcon} url={metaData.prev_page_url} />

      <Center className="bg-blue-500 w-10 h-10 rounded-full text-white">
        {metaData.current_page}
      </Center>

      {/* next page */}
      <PaginationButton icon={ChevronRightIcon} url={metaData.next_page_url} />
    </Stack>
  );
}
