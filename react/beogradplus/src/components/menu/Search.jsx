import { Input } from "@chakra-ui/react";
import React from "react";

export default function Search(props) {
  return (
    <Input
      onChange={(e) => setSearchTerm(e.target.value)}
      placeholder={props.placeholder}
      ml={3}
      w="90%"
    />
  );
}
