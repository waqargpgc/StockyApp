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
    name: "Products",
    url: "/products",
    icon: "fa fa-sliders",
  },
  {
    name: "Inventory",
    url: "/inventories",
    icon: "fa fa-compass",
  },
  {
    name: "Purchase Orders",
    url: "/po",
    icon: "fa fa-shopping-cart",
  },
  {
    name: "Sales Orders",
    url: "/",
    icon: "fa fa-shopping-cart",
  },
  {
    name: "More",
    url: "/stock",
    icon: "fa fa-arrow-circle-down",
    children: [
      {
        name: "Companies",
        url: "/stock/companies",
      },
      {
        name: "InventoryLocation",
        url: "/stock/inventoryLocation",
      },
      {
        name: "Customers",
        url: "/stock/customers",
      },
      {
        name: "Suppliers",
        url: "/stock/suppliers",
      },
      {
        name: "Product Categories",
        url: "/stock/categories",
      }
    ]
  }
];
