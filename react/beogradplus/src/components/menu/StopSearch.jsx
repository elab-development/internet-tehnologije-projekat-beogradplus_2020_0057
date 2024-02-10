import {
  Box,
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
import Pagination from "./Pagination";

export default function StopSearch(props) {
  //const [stops, setStops] = useState();
  const [searchTerm, setSearchTerm] = useState("");
  const { data, setData, setMenuOption } = useMenuStateContext();

  // pretratga stanica sa tajmautom
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      //console.log(data);
      if (searchTerm != "") {
        paginate("/search/stop/" + searchTerm);
      }
      //else setStops(null);
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm]);

  // otvara tab vozila i postavlja podatke o vozilima
  const openStopVehicles = (stop) => {
    axiosClient.get("/stop/" + stop.id + "/vehicles").then((vehicleData) => {
      setMenuOption(2);
      setData({
        title: stop.naziv,
        vehicles: vehicleData.data,
        stop,
        stops: data.stops,
      });
    });
  };

  const paginate = (pageFullUrl) => {
    //console.log(pageFullUrl);
    axiosClient.get(pageFullUrl).then((stopsData) => {
      console.log(stopsData);
      setData({
        title: data.title,
        vehicles: data.vehicles,
        stop: data.stop,
        stops: stopsData.data,
      });
    });
  };

  // prikazuje stanicu na mapi
  const showStopOnMap = (stop) => {};

  return (
    <>
      <Center>
        <Heading m={3} size="md" alignContent="center">
          Stops
        </Heading>
      </Center>
      <Input
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder={props.placeholder}
        ml={3}
        w="90%"
      />
      <VStack gap={0} mt={6}>
        {data.stops &&
          data.stops.data.map((stop) => {
            return (
              <SideMenuItem
                id={stop.id}
                text={stop.naziv}
                onClick={() => {
                  openStopVehicles(stop);
                }}
              />
            );
          })}
      </VStack>
      {data.stops /*&& data.stops.total > 10*/ && (
        <Pagination metaData={data.stops} onChange={paginate} />
      )}
    </>
  );
}
