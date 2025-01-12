import { FaHome, FaAppStore, FaList, FaTags, FaFileAlt, FaCog } from 'react-icons/fa';
import { SiProducthunt } from "react-icons/si";
import Home from './pages/Home';
import Products from './pages/Products';
import Stores from './pages/Stores';
import Catalogue from './pages/Catalogue';
import Promotions from './pages/Promotions';
import Reports from './pages/Reports';
import Docs from './pages/Docs';
import Settings from './pages/Settings';
import {  ComponentType, FC } from 'react';

interface SidebarItem {
  slug: string;
  label: string;
  icon: FC;
  component: ComponentType;
}

const sidebarData: SidebarItem[] = [
  {
    slug: '/',
    label: 'Home',
    icon: FaHome, 
    component: Home,
  },
  {
    slug: '/stores',
    label: 'Stores',
    icon: FaAppStore, 
    component: Stores,
  },
  {
    slug: '/products',
    label: 'Products',
    icon: SiProducthunt ,
    component: Products,
  },
  {
    slug: '/catalogue',
    label: 'Catalogue',
    icon: FaList, 
    component: Catalogue,
  },
  {
    slug: '/promotions',
    label: 'Promotions',
    icon: FaTags, 
    component: Promotions,
  },
  {
    slug: '/reports',
    label: 'Reports',
    icon: FaFileAlt, 
    component: Reports,
  },
  {
    slug: '/docs',
    label: 'Docs',
    icon: FaFileAlt,
    component: Docs,
  },
  {
    slug: '/settings',
    label: 'Settings',
    icon: FaCog,
    component: Settings,
  },
];

export default sidebarData;