import {
  Box,
  Button,
  Center,
  Heading,
  Input,
  List,
  VStack,
  useMenuContext,
} from "@chakra-ui/react";
import React, { createRef, useEffect, useState } from "react";
import axiosClient from "../../axios-client";
import SideMenuItem from "./SideMenuItem";
import { useMenuStateContext } from "../../contexts/MenuContext";

export default function LineSearch(props) {
  const [lines, setLines] = useState();
  const [direction, setDirection] = useState(1);
  function toggleDirection() {
    if (direction === 1) setDirection(2);
    else setDirection(1);
  }
  const [searchTerm, setSearchTerm] = useState("");
  const { data, setData, setMenuOption } = useMenuStateContext();

  // pretratga stanica sa tajmautom
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (searchTerm != "") {
        axiosClient.get("/search/line/" + searchTerm).then(({ data }) => {
          setLines(data);
        });
      } else setLines(null);
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm]);

  // otvara tab vozila i postavlja podatke o vozilima
  const openLineStops = (line) => {
    axiosClient
      .get("/line/" + line.id + "," + direction + "/stops")
      .then((stopsData) => {
        console.log(stopsData.data);
        setMenuOption(0);
        setData({
          title: data.title,
          vehicles: data.vehicles,
          stop: null,
          stops: stopsData.data.paginated,
          lineStops: stopsData.data.all,
          direction: direction,
          vehicleType: line.tip_vozila.naziv,
        });
      });
  };

  // prikazuje stanicu na mapi
  const showStopOnMap = (stop) => {};

  return (
    <>
      <Center>
        <Heading m={3} size="md" alignContent="center">
          Lines
        </Heading>
      </Center>
      <Input
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder={props.placeholder}
        ml={3}
        w="90%"
      />
      <VStack gap={0} mt={2}>
        {lines
          ? lines.data.map((line) => {
              return (
                <SideMenuItem
                  kod_linije={line.kod_linije}
                  tip_vozila={line.tip_vozila.naziv}
                  text={
                    direction === 1
                      ? line.pocetna + " - " + line.poslednja
                      : line.poslednja + " - " + line.pocetna
                  }
                  onClick={() => {
                    openLineStops(line);
                  }}
                ></SideMenuItem>
              );
            })
          : "Nije pronadjena linija"}
        <Button my={2} onClick={() => toggleDirection()}>
          Promeni smer
        </Button>
      </VStack>
    </>
  );
}
