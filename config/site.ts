export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: 'GTUVend',
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
