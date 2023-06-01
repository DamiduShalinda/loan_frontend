export type MenuItem = {
  name: string;
  href: string;
  subItems?: MenuItem[];
};

export const menuItems: MenuItem[] = [
  {
    name: 'Home',
    href: '/homepage',
  },
  {
    name: 'Loans',
      href: '/loans',
      subItems :  [
                {
                  name : 'View All Loans',
                  href: '/viewloans'
                },
                {
                  name : 'Add new Loans',
                  href: '/addnewloans'
                },
              ]
  },
  {
    name: 'Customers',
    href: '/customers',
    subItems :  [
      {
        name : 'View All Customers',
        href: '/customers'
      },
      {
        name : 'Add new Customers',
        href: '/addnewcustomers'
      },
    ]
  },
  {
    name: 'Reports',
    href: '/reports',
    subItems :  [
      {
        name : 'report1',
        href: '/report1'
      },
      {
        name : 'report 2',
        href: '/loancalculator'
      },
    ]
  },
  {
    name: 'Loan Calculator',
    href: '/loancalculator'
  }
];