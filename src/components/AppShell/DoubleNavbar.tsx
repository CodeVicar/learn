
'use client'
import { useContext, useState } from 'react';
import { Button, SegmentedControl, Text } from '@mantine/core';
import {
  IconShoppingCart,
  IconLicense,
  IconMessage2,
  IconBellRinging,
  IconMessages,
  IconFingerprint,
  IconKey,
  IconSettings,
  Icon2fa,
  IconUsers,
  IconFileAnalytics,
  IconDatabaseImport,
  IconReceipt2,
  IconReceiptRefund,
  IconLogout,
  IconSwitchHorizontal,
  IconUser,
} from '@tabler/icons-react';
import classes from './DoubleNavbar.module.css';
import { PeslacContext } from '@/contexts/PeslacContext';

const tabs = {
  account: [
    // { link: '', label: 'Notifications', icon: IconBellRinging },
    { link: '/invoices', label: 'Invoices', icon: IconLicense },
    { link: '/customers', label: 'Customers', icon: IconUsers },
    { link: '/users', label: 'Users', icon: IconUser },
    // { link: '', label: 'Databases', icon: IconDatabaseImport },
    // { link: '', label: 'Authentication', icon: Icon2fa },
    // { link: '', label: 'Other Settings', icon: IconSettings },
  ],
  general: [
    // { link: '', label: 'Orders', icon: IconShoppingCart },
    // { link: '', label: 'Receipts', icon: IconLicense },
    // { link: '', label: 'Reviews', icon: IconMessage2 },
    // { link: '', label: 'Messages', icon: IconMessages },
    // { link: '', label: 'Customers', icon: IconUsers },
    // { link: '', label: 'Refunds', icon: IconReceiptRefund },
    { link: '', label: 'System Logs', icon: IconFileAnalytics },
  ],
};

export function DoubleNavbar() {
    const ctx = useContext(PeslacContext);
  const [section, setSection] = useState('account');
  const [active, setActive] = useState('Billing');

  console.log(section)

  const links = tabs[section].map((item) => (
    <a
      className={classes.link}
      data-active={item.label === active || undefined}
      href={item.link}
      key={item.label}
      onClick={(event) => {
        event.preventDefault();
        setActive(item.label);
      }}
    >
      <item.icon className={classes.linkIcon} stroke={1.5} />
      <span>{item.label}</span>
    </a>
  ));

  return (
    <nav className={classes.navbar}>
      <div>
        <Text fw={500} size="sm" className={classes.title} c="dimmed" mb="xs">
         {ctx.user?.email}
        </Text>

        <SegmentedControl
          value={section}
          onChange={(value) => setSection(value)}
          transitionTimingFunction="ease"
          fullWidth
          data={[
            { label: 'Dashboard', value: 'dashboard' },
            { label: 'System', value: 'general' },
          ]}
        />
      </div>

      <div className={classes.navbarMain}>{links}</div>

      <div className={classes.footer}>
        <a href="#" className={classes.link} onClick={(event) => event.preventDefault()}>
          <IconSwitchHorizontal className={classes.linkIcon} stroke={1.5} />
          <span>Switch Account</span>
        </a>

        <Button onClick={() => {
            ctx.logout();
        }} color='red' fullWidth>
            Logout
        </Button>
      </div>
    </nav>
  );
}