import { getSession } from '@/lib/session';
import { ROUTES_ACCESS } from '@/lib/routes';
import type { UserRole } from '@/db/schema';
import NavLink from './NavLink';
import Logout from '../auth/logout';

export default async function NavMenu() {
  const user = await getSession();

  const username = user?.login || 'Unknown';
  const userNavItems = ROUTES_ACCESS.filter(item => {
    if (!item.roles?.length) return true;
    else if (user?.session)
      return item.roles.includes(user.session.userRole as UserRole);

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
        <span className='normal-case'>{username}</span>
        <Logout />
      </div>
    </nav>
  );
}