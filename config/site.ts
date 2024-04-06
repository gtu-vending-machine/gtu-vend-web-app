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

  links: {
    github: 'https://github.com/gtu-vending-machine',
  },
};
