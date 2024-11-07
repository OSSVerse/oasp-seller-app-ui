import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuArrow,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { useOrderSwitchMenu } from "@/store/order-swtich-menu-store";
import { CheckIcon } from "@radix-ui/react-icons";
import { useLocation, useNavigate } from "react-router-dom";

const SwitchToMenu = ({ length }: { length: number }) => {
  const { data: menus } = useOrderSwitchMenu();
  const location = useLocation();
  const navigate = useNavigate();
  const pathSegment = location.pathname;

  return (
    <DropdownMenu modal>
      <DropdownMenuTrigger asChild>
        <Button variant="link">Switch To..</Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="start" className="p-4 pr-8">
        {menus.map((menu) => (
          <DropdownMenuItem
            key={menu.title}
            className={cn("pl-7 relative")}
            onSelect={() => navigate(menu.url)}
          >
            {menu.url === pathSegment && (
              <CheckIcon className="absolute left-2 top-2" />
            )}{" "}
            {menu.title} ({length})
          </DropdownMenuItem>
        ))}
        <DropdownMenuArrow />
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default SwitchToMenu;
