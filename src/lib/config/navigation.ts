export interface NavItem {
    name: string;
    path: string;
    breadcrumb: string;
}

export const navigationConfig: NavItem[] = [
    {name: 'Overview', path: '/dashboard', breadcrumb: 'Dashboard / Overview'},
    {name: 'Servers', path: '/dashboard/servers', breadcrumb: 'Network / Servers'},
    {name: 'Users', path: '/dashboard/users', breadcrumb: 'System / Users'}
];

export function getBreadcrumb(pathname: string): string {
    const item = navigationConfig.find(item => item.path === pathname);
    return item ? item.breadcrumb : 'Dashboard / Overview';
}
