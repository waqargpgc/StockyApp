interface NavAttributes {
  [propName: string]: any;
}
interface NavWrapper {
  attributes: NavAttributes;
  element: string;
}
interface NavBadge {
  text: string;
  variant: string;
}
interface NavLabel {
  class?: string;
  variant: string;
}

export interface NavData {
  name?: string;
  url?: string;
  icon?: string;
  badge?: NavBadge;
  title?: boolean;
  children?: NavData[];
  variant?: string;
  attributes?: NavAttributes;
  divider?: boolean;
  class?: string;
  label?: NavLabel;
  wrapper?: NavWrapper;
}

export const navItems: NavData[] = [
  {
    name: "Inventory",
    url: "/inv",
    icon: "fa fa-compass",
    children: [
      {
        name: "Product",
        url: "/inv/products",
      },
      {
        name: "Product Categories",
        url: "/inv/p-ategories",
      },
      {
        name: "Current Stock",
        url: "/inv/crr-stock",
      },
      // {
      //   name: "Transation History",
      //   url: "/inv/history",
      // },
      {
        name: "Adjust Stock",
        url: "/inv/adj-stock",
      },
      {
        name: "Count Stock",
        url: "/inv/count-stock",
      },
      {
        name: "Transfer Stock",
        url: "/inv/tns-stock",
      },
    ]
  },
  {
    name: "In flow",
    url: "/inflow",
    icon: "fa fa-sliders",
    children: [
      {
        name: "Purchase orders",
        url: "/inflow/po",
      },
      {
        name: "Customers",
        url: "/inflow/customers",
      },
    ]
  },
  {
    name: "Out flow",
    url: "/outflow",
    icon: "fa fa-sliders",
    children: [
      {
        name: "Sale orders",
        url: "/inflow/so",
      },
      {
        name: "Suppliers",
        url: "/inflow/suppliers",
      },
    ]
  }
];
