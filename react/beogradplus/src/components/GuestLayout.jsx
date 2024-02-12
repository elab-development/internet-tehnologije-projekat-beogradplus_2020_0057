import { Avatar, Box, Flex, Heading, Stack } from "@chakra-ui/react";
import React from "react";

import { Outlet } from "react-router-dom";

export default function GuestLayout() {
  return (
    <Flex
      flexDirection="column"
      width="100wh"
      height="100vh"
      backgroundColor="gray.200"
      justifyContent="center"
      alignItems="center"
    >
      <Stack
        flexDir="column"
        mb="2"
        justifyContent="center"
        alignItems="center"
      >
        <Outlet />
      </Stack>
    </Flex>
  );
}
