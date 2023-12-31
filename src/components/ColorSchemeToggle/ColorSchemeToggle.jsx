'use client';

import { Button, Group, useMantineColorScheme, useComputedColorScheme,ActionIcon, } from '@mantine/core';
import { IconSun, IconMoon } from '@tabler/icons-react';
import { HydrationOverlay } from "@builder.io/react-hydration-overlay";
import { use, useEffect } from 'react';
import cx from 'clsx';
import classes from './ColorScheme.module.css';


export function ColorSchemeToggle() {
  const { setColorScheme } = useMantineColorScheme({
    keepTransition: true,
  });
  const computedColorScheme = useComputedColorScheme('dark', { getInitialValueInEffect: true });

  return (
     <ActionIcon
      onClick={() => setColorScheme(computedColorScheme === 'light' ? 'dark' : 'light')}
      variant="default"
      size="md"
      aria-label="Toggle color scheme"
    >
      <IconSun className={cx(classes.icon, classes.light)} stroke={1.5} />
      <IconMoon className={cx(classes.icon, classes.dark)} stroke={1.5} />
    </ActionIcon>
  );
}