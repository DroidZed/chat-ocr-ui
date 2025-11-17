import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "@/components/ui/navigation-menu"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"


export default function NavBar() {
  return (
    <div className="p-4 flex flex-row gap-5 items-center justify-end">
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <Avatar className="rounded-lg">
              <AvatarImage
                src="https://avatar.iran.liara.run/public/boy"
                alt="avatar"
              />
              <AvatarFallback>ER</AvatarFallback>
            </Avatar>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>

    </div>
  );
}
