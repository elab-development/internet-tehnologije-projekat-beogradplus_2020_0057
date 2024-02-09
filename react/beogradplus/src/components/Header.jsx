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
import { useStateContext } from "../contexts/ContextProvider";
import { useNavigate } from "react-router-dom";
import axiosClient from "../axios-client";

export default function Header() {
  const { user, setToken, setUser } = useStateContext();
  const navigate = useNavigate();

  const onLogout = (ev) => {
    ev.preventDefault();
    axiosClient.post("/logout").then(() => {
      setUser({});
      setToken(null);
    });
    navigate("/");
  };

  return (
    <div className="absolute inset-0 flex items-center z-10 bg-blue max-h-16 my-3 mx-4 rounded-2xl">
      <Center ml="5">
        <Text className="text-2xl text-white m-auto">Beograd Plus</Text>
      </Center>

      <Center ml="auto" mr="5">
        <Menu>
          <MenuButton color="white">
            <Avatar name={user.name} />
            <ChevronDownIcon />
          </MenuButton>
          <MenuList>
            <MenuItem>{user.name}</MenuItem>
            <MenuItem>{user.email}</MenuItem>
            <MenuItem onClick={() => navigate("/login")}>Change user</MenuItem>
            <MenuItem onClick={onLogout}>Log out</MenuItem>
          </MenuList>
        </Menu>
      </Center>
    </div>
  );
}
