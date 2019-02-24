export default [
  {
    id: '1',
    icon: 'snippets',
    name: 'All posts',
    route: '/admin/posts',
    roles: ['admin'],
  },
  {
    id: '2',
    icon: 'diff',
    name: 'Add post',
    route: '/admin/posts/new',
    roles: ['admin'],
  },
  {
    id: '3',
    icon: 'book',
    name: 'Category',
    route: '/admin/posts/category',
    roles: ['admin'],
  },
  {
    id: '4',
    icon: 'layout',
    name: 'Layout',
    route: '/admin/layout',
    roles: ['admin'],
  },
  {
    id: '5',
    icon: 'setting',
    name: 'Setting',
    route: '/admin/setting',
    roles: ['admin'],
  }
];
