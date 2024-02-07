import {
  Avatar,
  Box,
  Center,
  Flex,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  Button,
} from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import React from "react";

export default function Header(props) {
  return (
    <div className="absolute inset-0 flex items-center z-10 bg-blue max-h-16 my-3 mx-4 rounded-2xl">
      <Center ml="5">
        <Text className="text-2xl text-white m-auto">Beograd Plus</Text>
      </Center>

      <Center ml="auto" mr="5">
        <Menu>
          <MenuButton color="white">
            <Avatar name={props.user.name} />
            <ChevronDownIcon />
          </MenuButton>
          <MenuList>
            <MenuItem>{props.user.name}</MenuItem>
            <MenuItem>Log out</MenuItem>
          </MenuList>
        </Menu>
      </Center>
    </div>
  );
}
