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
  const [searchTerm, setSearchTerm] = useState("");
  const { data, setData, setMenuOption } = useMenuStateContext();

  // pretratga stanica sa tajmautom
  //useEffect(() => {
  //const delayDebounceFn = setTimeout(() => {
  function searchStops() {
    let pageFullUrl = "/stop";
    if (searchTerm != "") pageFullUrl = "/search/stop/" + searchTerm;
    //console.log(pageFullUrl);
    axiosClient.get(pageFullUrl).then((stopsData) => {
      console.log(stopsData.data.paginated);
      setData({
        title: data.title,
        //vehicles: data.vehicles,
        stop: null,
        stops: stopsData.data.paginated,
        lineStops: null,
        //vehicleType: data.vehicleType,
      });
    });
  }
  //}, 300);

  //return () => clearTimeout(delayDebounceFn);
  //}, [searchTerm]);

  // otvara tab vozila i postavlja podatke o vozilima
  const openStopVehicles = (stop) => {
    axiosClient.get("/stop/" + stop.id + "/vehicles").then((vehicleData) => {
      setMenuOption(2);
      setData({
        title: stop.naziv,
        vehicles: vehicleData.data,
        stop,
        stops: data.stops,
        mapLoad: true,
        //lineStops: data.lineStops,
        vehicleType: data.vehicleType,
      });
    });
  };

  const paginate = (pageFullUrl) => {
    //console.log(pageFullUrl);
    axiosClient.get(pageFullUrl).then((stopsData) => {
      //console.log(stopsData);
      setData({
        title: data.title,
        vehicles: data.vehicles,
        stop: data.stop,
        stops: stopsData.data.paginated,
        lineStops: data.lineStops,
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
        onChange={(e) => {
          setSearchTerm(e.target.value);
          searchStops();
        }}
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
