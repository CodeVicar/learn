"use client";
import React, { useContext, useState } from "react";
import {
  MantineProvider,
  AppShell,
  Burger,
  Group,
  Skeleton,
  NavLink,
  Overlay,
  LoadingOverlay,
} from "@mantine/core";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  IconHome,
  IconHome2,
  IconGauge,
  IconFingerprint,
  IconHeartHandshake,
  IconCarGarage,
  IconUserCheck,
  IconBuildingEstate,
  IconChecklist,
  IconAdjustmentsHorizontal,
  IconEngine,
  IconShoppingCart,
  IconCar,
  IconTerminal,
} from "@tabler/icons-react";
import { useClickOutside } from "@mantine/hooks";
import { ColorSchemeToggle } from "../ColorSchemeToggle/ColorSchemeToggle";
import Image from "next/image";
import { PeslacContext } from "../../contexts/PeslacContext";
import peslacloader from "../../../public/peslacloader.gif";
import { NavbarMinimal } from "./NavbarMinimal";
import ExpandedNav from "./ExpandedNav";
import { DoubleNavbar } from "./DoubleNavbar";

const PeslacShell = ({ children }) => {
  const pathname = usePathname();
  const [opened, setOpened] = useState(false);
  const ref = useClickOutside(() => setOpened(false));
  const ctx = useContext(PeslacContext);
  <ExpandedNav>{children}</ExpandedNav>;

  return (
    <AppShell
      header={{ height: { base: 60, md: 60, lg: 60 } }}
      navbar={{
        // width: 250,
        breakpoint: "sm",
        collapsed: { mobile: !opened },
      }}
      padding="md"
    >
      <LoadingOverlay
        visible={ctx.isLoading}
        zIndex={1000}
        overlayProps={{ radius: "sm", blur: 2 }}
        loaderProps={{
          color: "pink",
          type: "bars",
          size: "xl",
        }}
      />
      {/* {opened && (
        <div className="absolute top-0 bottom-0 right-0 left-[250px]">
          <Overlay
            onClick={() => setOpened(false)}
            color="#000"
            backgroundOpacity={0.35}
            blur={2}
          />
        </div>
      )} */}
      {ctx.user && (
        <>
          <AppShell.Header>
            <Group h="100%" px="md">
              <Burger
                opened={opened}
                onClick={() => {
                  setOpened(!opened);
                }}
                hiddenFrom="sm"
                size="sm"
              />
              <Image
                priority={true}
                alt="Peslac Logo"
                src="/wareflow_logo.svg"
                width={130}
                height={130}
              />
              <div className="absolute right-4">
                {/* <ColorSchemeToggle /> */}
              </div>
            </Group>
          </AppShell.Header>
          <AppShell.Navbar >
            <DoubleNavbar user={ctx.user} />
          </AppShell.Navbar>
        </>
      )}

      <AppShell.Main>{children}</AppShell.Main>
    </AppShell>
  );
};

export default PeslacShell;
