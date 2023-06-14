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
    "link": "/home",
    "label": "Homepage"
  },
  {
    "link": "#1",
    "label": "Loans",
    "links": [
      {
        "link": "/docs",
        "label": "Add New Loan"
      },
      {
        "link": "/resources",
        "label": "View All Loans"
      }
    ]
  },
  {
    "link": "/customers/addnew",
    "label": "Customers",
    "links": [
      {
        "link": "/customers/addnew",
        "label": "Add New Customer"
      },
      {
        "link": "/resources",
        "label": "View All Customers"
      }
    ]
  },
  {
    "link": "#2",
    "label": "Contact",
    "links": [
      {
        "link": "/faq",
        "label": "All Branches"
      },
      {
        "link": "/demo",
        "label": "All officers"
      }
    ]
  }
]