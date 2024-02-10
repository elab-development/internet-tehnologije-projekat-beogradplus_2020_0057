import { Box, Center, Heading, Text, VStack } from "@chakra-ui/react";
import React from "react";
import SideMenuItem from "./SideMenuItem";
import { useMenuStateContext } from "../../contexts/MenuContext";
import { FaBusSimple, FaTrainTram } from "react-icons/fa6";
import axiosClient from "../../axios-client";

export default function Vehicles() {
  const { data, setData } = useMenuStateContext();

  function onClick(
    current_stop,
    line_id,
    direction_id,
    vehicle_type,
    vehicle_line
  ) {
    axiosClient
      .get("/line/" + line_id + "," + direction_id + "/stops")
      .then((stopsData) => {
        console.log(current_stop, vehicle_type);
        setData({
          title: data.title,
          vehicles: data.vehicles,
          stop: data.stop,
          stops: data.stops,
          lineStops: stopsData.data.all,
          direction: data.direction,
          vehicleStop: current_stop,
          vehicleType: vehicle_type,
          vehicleLine: vehicle_line,
        });
      });
  }

  return (
    <Box w="100%">
      <Center>
        <Heading m={3} size="md">
          {data.title}
        </Heading>
      </Center>
      <VStack gap={0} mt={6}>
        {data.vehicles && data.vehicles.length > 0 ? (
          data.vehicles.slice(0, 10).map((vehicle) => {
            const linija = vehicle.vozilo.linija;
            const naziv =
              vehicle.vozilo.smer.naziv === "napred"
                ? linija.poslednja
                : linija.pocetna;
            const tip_vozila = vehicle.vozilo.linija.tip_vozila.naziv;

            return (
              <SideMenuItem
                //icon={icon}
                //badgeColor={badgeColor}
                tip_vozila={tip_vozila}
                kod_linije={linija.kod_linije}
                text={naziv}
                udaljenost={vehicle.udaljenost}
                onClick={() =>
                  onClick(
                    vehicle.vozilo.trenutna_stanica,
                    linija.id,
                    vehicle.vozilo.smer.id,
                    tip_vozila,
                    linija.kod_linije
                  )
                }
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
