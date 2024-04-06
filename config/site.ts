export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: 'GTU Vending Machine',
  description: 'A vending machine for GTU students',
  navItems: [
    {
      label: 'Home',
      href: '/',
    },
    {
      label: 'About',
      href: '/about',
    },
  ],
  dropdownMenuItems: [
    {
      label: 'Logout',
      href: '/logout',
    },
  ],
  links: {
    github: 'https://github.com/gtu-vending-machine',
  },
};
