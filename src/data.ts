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
    "link": "/homepage",
    "label": "Homepage"
  },
  {
    "link": "#1",
    "label": "Loans",
    "links": [
      {
        "link": "/loans/addnew",
        "label": "Add New Loan"
      },
      {
        "link": "/loans/viewall",
        "label": "View All Loans"
      }
    ]
  },
  {
    "link": "#",
    "label": "Customers",
    "links": [
      {
        "link": "/customers/addnew",
        "label": "Add New Customer"
      },
      {
        "link": "/customers/viewall",
        "label": "View All Customers"
      }
    ]
  },
  {
    "link": "#",
    "label": "Employees",
    "links": [
      {
        "link": "/employees/addnew",
        "label": "Add New Employee"
      },
      {
        "link": "/employees/viewall",
        "label": "View All Employees"
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


export const tabledata = 
  [
    {
        "id": "38",
        "loan_id": "2019-001-71",
        "monthly_payment": "31045.18",
        "monthly_arrears": "61486.16",
        "arr_cal_date": "2023-08-17"
    },
    {
        "id": "39",
        "loan_id": "2019-001-61",
        "monthly_payment": "12454.57",
        "monthly_arrears": "34433.53",
        "arr_cal_date": "2023-04-30"
    }
]