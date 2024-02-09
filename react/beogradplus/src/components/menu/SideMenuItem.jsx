import { Box, Button, Center, Flex, Icon, Text } from "@chakra-ui/react";
import React from "react";
import { useMenuStateContext } from "../../contexts/MenuContext";
import { FaBusSimple, FaTrainTram } from "react-icons/fa6";

export default function SideMenuItem(props) {
  let fontSize = 16;
  if (props.kod_linije && props.text.length > 20) fontSize = 14;
  let icon, badgeColor;
  switch (props.tip_vozila) {
    case "trolleybus":
      icon = FaBusSimple;
      badgeColor = "orange.500";
      break;
    case "tram":
      icon = FaTrainTram;
      badgeColor = "red.500";
      break;
    default:
      icon = FaBusSimple;
      badgeColor = "blue.500";
      break;
  }
  return (
    <Button
      w="100%"
      h={props.udaljenost ? 16 : 14}
      p="0"
      className="border-t-2 border-gray-300"
      onClick={props.onClick}
    >
      <Flex h="100%" w="100%" align="center">
        {props.kod_linije && (
          <Flex align="center" ml="2">
            <Icon as={icon} boxSize={6} mr={2}></Icon>
            <Flex
              bg={badgeColor}
              color="white"
              fontSize={16}
              borderRadius="md"
              align="center"
              justify="center"
              w="10"
              h="7"
            >
              {props.kod_linije}
            </Flex>
          </Flex>
        )}
        <Box
          fontSize={fontSize}
          ml={2}
          whiteSpace="nowrap"
          overflow="hidden"
          textOverflow="ellipsis"
          minWidth={0}
        >
          {props.id} {props.text}
        </Box>
        {(props.udaljenost || props.udaljenost == 0) && (
          <Box w="12" ml="auto" mr={4}>
            <Text fontSize={20} m={0}>
              {props.udaljenost}
            </Text>
            stanica
          </Box>
        )}
      </Flex>
    </Button>
  );
}
