import '@mantine/core/styles.css';
import { Inter } from 'next/font/google'
import './globals.css'
import { MantineProvider, ColorSchemeScript } from '@mantine/core';
import { theme } from '../lib/theme/theme';
import PeslacShell  from '../components/AppShell/PeslacShell';
import { HydrationOverlay } from "@builder.io/react-hydration-overlay";
import PeslacProvider from '@/contexts/PeslacContext';

export const metadata = {
  title: 'Wareflow',
  description: 'Wareflow',
}

export default function RootLayout({
  children,
}) {
  return (
    <HydrationOverlay>
    <html lang="en">
      <head>
        <ColorSchemeScript />
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, user-scalable=no"
        />
      </head>
      <body>
        <PeslacProvider >
        <MantineProvider theme={theme}>
        <PeslacShell>
          {children}
        </PeslacShell>
        </MantineProvider>
        </PeslacProvider>
      </body>
    </html>
    </HydrationOverlay>

  )
}
