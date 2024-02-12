import {
  Box,
  Button,
  Center,
  Heading,
  Icon,
  Tab,
  TabIndicator,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  VStack,
  useRadioGroup,
} from "@chakra-ui/react";
import React, { useState } from "react";

import { TbBusStop, TbHelp, TbRoute2 } from "react-icons/tb";
import { FaBusSimple } from "react-icons/fa6";
import { useMenuStateContext } from "../contexts/MenuContext";
import StopSearch from "./menu/StopSearch";
import Vehicles from "./menu/Vehicles";
import LineSearch from "./menu/LineSearch";
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import { useEffect } from "react";

function SideBar() {
  const [hidden, setHidden] = useState(false);

  function toggleHidden() {
    setHidden(!hidden);
    //if (hidden) setMenuOption(null);
    //console.log(hidden);
  }

  const tabData = [
    {
      name: "stop",
      icon: TbBusStop,
      content: <StopSearch placeholder="Search stops" />,
    },
    {
      name: "line",
      icon: TbRoute2,
      content: <LineSearch placeholder="Search lines" />,
    },
    {
      name: "vehicle",
      icon: FaBusSimple,
      content: <Vehicles />,
    },
    {
      name: "help",
      icon: TbHelp,
      content: <>by: Milos & Filip</>,
    },
  ];

  function DataTabs({ data }) {
    const { menuOption, setMenuOption } = useMenuStateContext();
    return (
      <Tabs
        variant="unstyled"
        position="absolute"
        orientation="vertical"
        w="22rem"
        h="100%"
        index={menuOption}
        defaultIndex={0}
        onChange={(index) => {
          setHidden(false);
          console.log(index);
          setMenuOption(index);
        }}
      >
        <TabList
          className="inset-0 flex justify-left items-start z-10 bg-blue 
      max-w-16 ml-6 mt-24 mb-2 rounded-2xl"
        >
          {data.map((tab, index) => {
            return (
              <Tab
                key={index}
                w="4rem"
                h="4rem"
                borderRadius="1rem"
                _hover={{
                  bg: "blue.800",
                }}
                _selected={{
                  boxShadow: "dark-lg",
                  bg: "blue.500",
                }}
              >
                <Icon as={tab.icon} boxSize={7} color="white"></Icon>
              </Tab>
            );
          })}
          <Button
            variant="ghost"
            w="4rem"
            h="3rem"
            borderRadius="1rem"
            _hover={{
              bg: "blue.800",
            }}
            className="mt-auto text-white w-full"
            onClick={toggleHidden}
          >
            <Icon
              as={hidden ? ChevronRightIcon : ChevronLeftIcon}
              boxSize={5}
              color="white"
            ></Icon>
          </Button>
        </TabList>

        {!hidden && (
          <TabPanels
            position="absolute"
            className=" inset-0 flex justify-left items-start z-10 
        bg-gray-100 shadow-2xl border border-gray-300 
          ml-28 mt-24 mb-2 rounded-2xl "
          >
            {data.map((tab, index) => {
              return (
                <TabPanel
                  key={index}
                  p={0}
                  className="w-full h-full flex flex-col"
                >
                  {tab.content}
                </TabPanel>
              );
            })}
          </TabPanels>
        )}
      </Tabs>
    );
  }

  return (
    <>
      <DataTabs data={tabData} />
    </>
  );
}

export default SideBar;
