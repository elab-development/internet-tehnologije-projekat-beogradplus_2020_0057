import { Box, Center, Heading, Text, VStack } from "@chakra-ui/react";
import React from "react";
import SideMenuItem from "./SideMenuItem";
import { useMenuStateContext } from "../../contexts/MenuContext";
import { FaBusSimple, FaTrainTram } from "react-icons/fa6";

export default function Vehicles() {
  const { data } = useMenuStateContext();

  const vehicles = () => {};

  return (
    <Box w="100%">
      <Center>
        <Heading m={3} size="md">
          {data.title}
        </Heading>
      </Center>
      <VStack gap={0} mt={6}>
        {data.vehicles && data.vehicles.length > 0 ? (
          data.vehicles.map((vehicle) => {
            const linija = vehicle.vozilo.linija;
            const naziv =
              vehicle.vozilo.smer.naziv === "napred"
                ? linija.poslednja
                : linija.pocetna;

            return (
              <SideMenuItem
                //icon={icon}
                //badgeColor={badgeColor}
                tip_vozila={vehicle.vozilo.linija.tip_vozila.naziv}
                kod_linije={linija.kod_linije}
                text={naziv}
                udaljenost={vehicle.udaljenost}
                onClick={() => {}}
              />
            );
          })
        ) : (
          <Text>Trenutno nema vozila.</Text>
        )}
      </VStack>
    </Box>
  );
}
