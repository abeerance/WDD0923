import { DropdownNav } from "../dropdown-nav/dropdown-nav";
import { NavLink } from "../nav-link/nav-link";

export const Navigation = () => {
  return (
    <nav className="flex gap-m items-center">
      <NavLink href="/blog">Blog</NavLink>
      <NavLink href="/categories">Categories</NavLink>
      <DropdownNav />
    </nav>
  );
};
