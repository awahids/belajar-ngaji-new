import { NavLink } from 'react-router-dom';
import { cn } from '@/lib/utils';
import {
  LayoutDashboard,
  FileText,
  BookOpen,
  MessageSquare,
  Users,
  Image,
  Settings,
  Heart,
  Star,
  HelpCircle,
  Target,
} from 'lucide-react';

const navigation = [
  { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
  {
    name: 'Konten',
    items: [
      { name: 'Hijaiyah', href: '/admin/hijaiyah', icon: BookOpen },
      { name: 'Zikir', href: '/admin/dhikr', icon: Heart },
      { name: 'Artikel', href: '/admin/articles', icon: FileText },
      { name: 'Kuis', href: '/admin/quiz', icon: HelpCircle },
      { name: 'Modul', href: '/admin/modules', icon: Target },
      { name: 'Nilai', href: '/admin/values', icon: Star },
      { name: 'Fitur', href: '/admin/features', icon: Users },
    ],
  },
  { name: 'Pesan Masuk', href: '/admin/messages', icon: MessageSquare },
  { name: 'Media', href: '/admin/media', icon: Image },
  { name: 'Pengaturan', href: '/admin/settings', icon: Settings },
];

export const AdminSidebar = () => {
  return (
    <div className="w-64 bg-card border-r border-border">
      <div className="p-6">
        <h1 className="text-xl font-bold text-primary">Belajar Ngaji</h1>
        <p className="text-sm text-muted-foreground">Admin Panel</p>
      </div>
      
      <nav className="px-4 pb-4">
        {navigation.map((item) => (
          <div key={item.name} className="mb-2">
            {item.href ? (
              <NavLink
                to={item.href}
                end={item.href === '/admin'}
                className={({ isActive }) =>
                  cn(
                    'flex items-center px-3 py-2 text-sm rounded-lg transition-colors',
                    isActive
                      ? 'bg-primary text-primary-foreground'
                      : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                  )
                }
              >
                <item.icon className="mr-3 h-4 w-4" />
                {item.name}
              </NavLink>
            ) : (
              <>
                <div className="px-3 py-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  {item.name}
                </div>
                {item.items?.map((subItem) => (
                  <NavLink
                    key={subItem.href}
                    to={subItem.href}
                    className={({ isActive }) =>
                      cn(
                        'flex items-center px-3 py-2 text-sm rounded-lg transition-colors ml-2',
                        isActive
                          ? 'bg-primary text-primary-foreground'
                          : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                      )
                    }
                  >
                    <subItem.icon className="mr-3 h-4 w-4" />
                    {subItem.name}
                  </NavLink>
                ))}
              </>
            )}
          </div>
        ))}
      </nav>
    </div>
  );
};