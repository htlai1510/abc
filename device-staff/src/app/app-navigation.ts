export const navigation = [

  {
    text: 'Dashboard',
    path: '/admin/dashboard',
    icon: 'abc'
  },
  {
    text: 'Location',
    path: '/admin/location',
    icon: 'abc'
  },
  {
    text: 'Brand',
    path: '/admin/brand',
    icon: 'abc'
  },
  {
    text: 'Product Type',
    path: '/admin/product-type',
    icon: 'abc'
  },
  {
    text: 'Staff',
    path: '/admin/staff',
    icon: 'abc'
  },
  {
    text: 'Position',
    path: '/admin/position',
    icon: 'abc'
  },
  {
    text: 'Device',
    icon: 'abc',
    items: [
      {
        text: 'Active',
        path: '/admin/device-using'
      },
      {
        text: 'Inactive',
        path: '/admin/device-empty'
      },
      {
        text: 'Pending',
        path: '/admin/device-pending'
      }
    ]
  }
];
