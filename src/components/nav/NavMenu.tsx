import { getSession } from '@/lib/session';
import { type UserRole } from '@/db/schema';
import NavLink from './NavLink';
import Logout from '../auth/logout';

interface NavItem {
  label: string;
  href: string;
  roles?: UserRole[];
}

const navItems: NavItem[] = [
  {
    label: 'Main',
    href: '/',
  },
  {
    label: 'All Tasks',
    href: '/tasks',
  },
  {
    label: 'Experts',
    href: '/experts',
    roles: ['admin', 'tech'],
  },
  {
    label: 'Agents',
    href: '/agents',
    roles: ['tech'],
  }
] as const;

export default async function NavMenu() {
  const user = await getSession();

  const userNavItems = navItems.filter(item => {
    if (!item.roles?.length) return true;
    else if (user)
      return item.roles.includes(user.role as UserRole);

    return false;
  });

  return (
    <nav className='hidden md:flex sticky top-0 flex-row gap-2 py-2 px-4 w-full items-center justify-center bg-txt text-bg text-lg shadow-xl select-none font-bold uppercase'>
      {userNavItems.map((item, index) => (
        <NavLink key={index} href={item.href}>
          {item.label}
        </NavLink>
      ))}

      <div className='flex items-center gap-4 ml-auto h-full max-h-full shrink-0'>
        <Logout />

        <img
          src='images/profile-pic.jpg'
          className='h-10 w-auto object-contain rounded-full'
        />
      </div>
    </nav>
  );
}