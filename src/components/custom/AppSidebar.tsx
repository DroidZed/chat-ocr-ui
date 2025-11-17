import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';

import {
  Home,
  FileText,
  Scan,
  Upload,
  History,
  Settings,
  HelpCircle,
  Users,
  BarChart3,
  FolderOpen,
  Star,
  Activity,
} from 'lucide-react';

const mainItems = [
  {
    title: 'Dashboard',
    url: '#',
    icon: Home,
  },
  {
    title: 'New Scan',
    url: '#',
    icon: Scan,
    badge: 'Hot',
  },
  {
    title: 'AI Chat',
    url: '#',
    icon: Upload,
  },
];

const documentsItems = [
  {
    title: 'All Documents',
    url: '#',
    icon: FileText,
  },
  {
    title: 'Folders',
    url: '#',
    icon: FolderOpen,
  },
  {
    title: 'Starred',
    url: '#',
    icon: Star,
  },
  {
    title: 'Recent',
    url: '#',
    icon: History,
  },
];

const managementItems = [
  {
    title: 'Analytics',
    url: '#',
    icon: BarChart3,
  },
  {
    title: 'Team Members',
    url: '#',
    icon: Users,
  },
  {
    title: 'Activity Log',
    url: '#',
    icon: Activity,
  },
];

const bottomItems = [
  {
    title: 'Settings',
    url: '#',
    icon: Settings,
  },
  {
    title: 'Help & Support',
    url: '#',
    icon: HelpCircle,
  },
];

export default function AppSidebar() {
  return (
    <Sidebar className="border-r border-border/40">
      <SidebarHeader className="p-4 border-b border-border/40">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <Scan className="h-5 w-5" />
          </div>
          <div className="flex flex-col">
            <h2 className="text-lg font-semibold">OCR Pro</h2>
            <p className="text-xs text-muted-foreground">Document Processing</p>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent className="py-4">
        {/* Main Navigation */}
        <SidebarGroup className="mb-6">
          <SidebarGroupLabel className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-3">
            Main
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {mainItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    className="h-10 hover:bg-accent/50 transition-colors"
                  >
                    <a href={item.url} className="flex items-center gap-3">
                      <item.icon className="h-4 w-4 text-muted-foreground" />
                      <span className="font-medium">{item.title}</span>
                      {item.badge && (
                        <Badge
                          variant="secondary"
                          className="ml-auto text-xs px-2 py-0"
                        >
                          {item.badge}
                        </Badge>
                      )}
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <Separator className="mb-6" />

        {/* Documents Section */}
        <SidebarGroup className="mb-6">
          <SidebarGroupLabel className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-3">
            Documents
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {documentsItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    className="h-10 hover:bg-accent/50 transition-colors"
                  >
                    <a href={item.url} className="flex items-center gap-3">
                      <item.icon className="h-4 w-4 text-muted-foreground" />
                      <span className="font-medium">{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <Separator className="mb-6" />

        {/* Management Section */}
        <SidebarGroup className="mb-6">
          <SidebarGroupLabel className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-3">
            Management
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {managementItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    className="h-10 hover:bg-accent/50 transition-colors"
                  >
                    <a href={item.url} className="flex items-center gap-3">
                      <item.icon className="h-4 w-4 text-muted-foreground" />
                      <span className="font-medium">{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <div className="flex-1" />

        {/* Bottom Section */}
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {bottomItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    className="h-10 px-3 hover:bg-accent/50 transition-colors"
                  >
                    <a href={item.url} className="flex items-center gap-3">
                      <item.icon className="h-4 w-4 text-muted-foreground" />
                      <span className="font-medium">{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
