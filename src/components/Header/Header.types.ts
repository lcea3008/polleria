export interface NavItem {
  name: string
  href: string
}

export interface HeaderProps {
  navItems?: NavItem[]
  showSearch?: boolean
  brandName?: string
}
