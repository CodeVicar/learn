'use client';
import React, { useContext, useState } from 'react';
import {
  MantineProvider,
  AppShell,
  Burger,
  Group,
  Skeleton,
  NavLink,
  Overlay,
  LoadingOverlay,
} from '@mantine/core';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
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
} from '@tabler/icons-react';
import { useClickOutside } from '@mantine/hooks';
import { ColorSchemeToggle } from '../ColorSchemeToggle/ColorSchemeToggle';
import Image from 'next/image';
import { PeslacContext } from '../../contexts/PeslacContext';
import peslacloader from '../../../public/peslacloader.gif';

const ExpandedNav = ({children}) => {
    const pathname = usePathname();
  const [opened, setOpened] = useState(false);
  const ref = useClickOutside(() => setOpened(false));
  const ctx = useContext(PeslacContext);

  return (
    <AppShell
      header={{ height: { base: 60, md: 60, lg: 60 } }}
      navbar={{
        width: 250,
        breakpoint: 'sm',
        collapsed: { mobile: !opened },
      }}
      padding='md'
    >
      <LoadingOverlay
        visible={ctx.isLoading}
        zIndex={1000}
        overlayProps={{ radius: 'sm', blur: 2 }}
        loaderProps={{
          color: 'pink',
          type: 'bars',
          size: 'xl',
        }}
      />
      {opened && (
        <div className='absolute top-0 bottom-0 right-0 left-[250px]'>
          <Overlay
            onClick={() => setOpened(false)}
            color='#000'
            backgroundOpacity={0.35}
            blur={2}
          />
        </div>
      )}
      {ctx.user && (
        <>
          <AppShell.Header>
            <Group h='100%' px='md'>
              <Burger
                opened={opened}
                onClick={() => {
                  setOpened(!opened);
                }}
                hiddenFrom='sm'
                size='sm'
              />
              <Image
                priority={true}
                alt='Peslac Logo'
                src='/peslac_dark.svg'
                width={130}
                height={130}
              />
              <div className='absolute right-4'>
                <ColorSchemeToggle />
              </div>
            </Group>
          </AppShell.Header>
          <AppShell.Navbar w={250} p='md'>
            <NavLink
              component={Link}
              label='Dashboard'
              href='/'
              leftSection={<IconHome size='1rem' stroke={1.5} />}
              active={pathname === '/'}
              onClick={() => {
                setOpened(false);
              }}
              color='rgba(3, 163, 168, 1)'
              variant='subtle'
            />
            <NavLink
              component={Link}
              href='/Invoice'
              label='Invoice'
              leftSection={<IconChecklist size='1rem' stroke={1.5} />}
              childrenOffset={28}
              defaultOpened={true}
              active={
                pathname === '/motor-claims' ||
                pathname === '/claims' ||
                pathname === '/claims/[id]'
              }
              color='rgba(3, 163, 168, 1)'
              variant='subtle'
            >
              <NavLink
                component={Link}
                href='/motor-claims'
                label='New Invoice'
                leftSection={<IconCar size='1rem' stroke={1.5} />}
                active={pathname === '/motor-claims'}
                onClick={() => {
                  setOpened(false);
                }}
                color='rgba(3, 163, 168, 1)'
                variant='subtle'
              />
              <NavLink
                disabled={true}
                href='/not-available'
                label='Health'
                leftSection={<IconHeartHandshake size='1rem' stroke={1.5} />}
              />
              <NavLink
                disabled
                href='/not-available'
                label='Life'
                leftSection={<IconUserCheck size='1rem' stroke={1.5} />}
              />
              <NavLink
                disabled
                href='/not-available'
                label='Property'
                leftSection={<IconBuildingEstate size='1rem' stroke={1.5} />}
              />
            </NavLink>

            <NavLink
              component={Link}
              href='/assessments'
              label='Assessments'
              leftSection={
                <IconAdjustmentsHorizontal size='1rem' stroke={1.5} />
              }
              childrenOffset={28}
              defaultOpened
              active={
                pathname === '/assessments' || pathname === '/assessments/[id]'
              }
              color='rgba(3, 163, 168, 1)'
              variant='subtle'
            >
              <NavLink
                component={Link}
                href='/motor-assessments'
                label='Motor Assessments'
                leftSection={<IconEngine size='1rem' stroke={1.5} />}
                active={pathname === '/motor-assessments'}
                onClick={() => {
                  setOpened(false);
                }}
                color='rgba(3, 163, 168, 1)'
                variant='subtle'
              />
              <NavLink
                component={Link}
                href='/motor-assessors'
                label='Motor Assessors'
                leftSection={<IconUserCheck size='1rem' stroke={1.5} />}
                active={pathname === '/motor-assessors'}
                onClick={() => {
                  setOpened(false);
                }}
                color='rgba(3, 163, 168, 1)'
                variant='subtle'
              />
            </NavLink>
            <NavLink
              component={Link}
              href='/motor-parts'
              label='Motor Parts'
              leftSection={<IconEngine size='1rem' stroke={1.5} />}
              active={pathname === '/motor-parts'}
              onClick={() => {
                setOpened(false);
              }}
              color='rgba(3, 163, 168, 1)'
              variant='subtle'
            />
            <NavLink
              component={Link}
              href='/parts-suppliers'
              label='Parts Suppliers'
              leftSection={<IconShoppingCart size='1rem' stroke={1.5} />}
              active={pathname === '/parts-suppliers'}
              onClick={() => {
                setOpened(false);
              }}
              color='rgba(3, 163, 168, 1)'
              variant='subtle'
            />
            <NavLink
              component={Link}
              href='/repair-garages'
              label='Repair Garages'
              leftSection={<IconCarGarage size='1rem' stroke={1.5} />}
              active={pathname === '/repair-garages'}
              onClick={() => {
                setOpened(false);
              }}
              color='rgba(3, 163, 168, 1)'
              variant='subtle'
            />
            <NavLink
              component={Link}
              href='/logs'
              label='Logs'
              leftSection={<IconTerminal size='1rem' stroke={1.5} />}
              active={pathname === '/logs'}
              onClick={() => {
                setOpened(false);
              }}
              color='rgba(3, 163, 168, 1)'
              variant='subtle'
            />
          </AppShell.Navbar>
        </>
      )}

      <AppShell.Main>{children}</AppShell.Main>
    </AppShell>
  )
}

export default ExpandedNav