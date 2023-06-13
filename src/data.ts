import {
  IconNotes,
  IconGauge,
  IconCalendarStats,
  IconPresentationAnalytics,
  IconFileAnalytics,
  IconAdjustments,
  IconLock,
} from '@tabler/icons-react';


export const footerLinks = [
  { link: "#", label: "Contact" },
  { link: "#", label: "Privacy" },
  { link: "#", label: "Blog" },
  { link: "#", label: "Careers" },
];

export const navbardata = [
  { label: 'Dashboard', icon: IconGauge  , link : 'home'},
  {
    label: 'Market news',
    icon: IconNotes,
    initiallyOpened: false,
    links: [
      { label: 'Overview', link: 'home' },
      { label: 'Forecasts', link: '/' },
      { label: 'Outlook', link: '/' },
      { label: 'Real time', link: '/' },
    ],
  },
  {
    label: 'Releases',
    icon: IconCalendarStats,
    links: [
      { label: 'Upcoming releases', link: '/' },
      { label: 'Previous releases', link: '/' },
      { label: 'Releases schedule', link: '/' },
    ],
  },
  { label: 'Analytics', icon: IconPresentationAnalytics },
  { label: 'Contracts', icon: IconFileAnalytics },
  { label: 'Settings', icon: IconAdjustments },
  {
    label: 'Security',
    icon: IconLock,
    links: [
      { label: 'Enable 2FA', link: '/' },
      { label: 'Change password', link: '/' },
      { label: 'Recovery codes', link: '/' },
    ],
  },
];


export const headerdata = [
  {
    "link": "/about",
    "label": "Features"
  },
  {
    "link": "#1",
    "label": "Learn",
    "links": [
      {
        "link": "/docs",
        "label": "Documentation"
      },
      {
        "link": "/resources",
        "label": "Resources"
      },
      {
        "link": "/community",
        "label": "Community"
      },
      {
        "link": "/blog",
        "label": "Blog"
      }
    ]
  },
  {
    "link": "/about",
    "label": "About"
  },
  {
    "link": "/pricing",
    "label": "Pricing"
  },
  {
    "link": "#2",
    "label": "Support",
    "links": [
      {
        "link": "/faq",
        "label": "FAQ"
      },
      {
        "link": "/demo",
        "label": "Book a demo"
      },
      {
        "link": "/forums",
        "label": "Forums"
      }
    ]
  }
]