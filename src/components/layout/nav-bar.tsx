import { ChevronDown, CircleUser, LogIn, Menu, Search } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Logo from "@/components/icons/logo";
import AddIcon from "@/components/icons/add-icon";
import NotificationButton from "@/components/common/notification-button";
import useAuthStore from "@/store/auth-store";
import { useModal } from "@/store/modal-store";
import LoginNavbar from "./login-navbar";
import { PATH } from "@/lib/path-constant";

const items = [
  {
    name: "My Dashboard",
    href: "/dashboard",
    id: 1,
    isProtected: true,
  },
  {
    name: "My Orders",
    href: "/dashboard/orders",
    id: 2,
    isProtected: true,
  },
  {
    name: "My Solution",
    href: "/dashboard/my-projects",
    id: 7,
    isProtected: true,
  },
  {
    name: "Platform",
    href: "/platform",
    id: 4,
    isProtected: false,
  },
  {
    name: "Solutions",
    href: "/products",
    id: 3,
    isProtected: false,
  },
  {
    name: "Resources",
    href: "/resources",
    id: 5,
    isProtected: false,
  },
  {
    name: "Company",
    href: "/company",
    id: 6,
    isProtected: false,
  },
];

const NavBar = () => {
  const { isAuthenticated, logout, user } = useAuthStore((state) => state);
  const { onOpen, onClose } = useModal();
  const location = useLocation();
  return (
    <>
      {!isAuthenticated ? (
        <div data-testid="login-navbar">
          <LoginNavbar close={() => { }} />
        </div>
      ) : (
        <header className="sticky top-0 z-10 flex h-16 items-center border gap-4 border-b bg-background px-4 md:px-8 py-4 mb-3">
          <nav className="hidden flex-1 flex-col gap-6 text-lg font-medium lg:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6 ">
            <Link
              to="/"
              className="p-2 flex items-center gap-2 text-lg  md:text-base"
            >
              <Logo />
            </Link>

            {items.map((item) => (
              <Link
                to={item.href}
                key={item.id}
                className={`p-2 transition-colors text-foreground hover:text-accent-foreground ${item.href === location.pathname ? "font-bold" : ""} ${item.isProtected && !isAuthenticated ? "hidden" : ""}`}
              >
                {item.name}
              </Link>
            ))}
          </nav>
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="shrink-0 lg:hidden"
              >
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left">
              <nav className="grid gap-6 text-lg font-medium">
                <Link
                  to="#"
                  className="flex items-center gap-2 text-lg font-semibold"
                >
                  <Logo />
                </Link>
                {items.map((item) => (
                  <Link
                    to={item.href}
                    key={item.id}
                    className="text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {item.name}
                  </Link>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
          <div className="flex  items-center gap-4 md:ml-auto md:gap-2 lg:gap-4 ">
            <form className="ml-auto hidden xl:block flex-1 sm:flex-initial">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search products..."
                  className="pl-8 sm:w-[300px] md:w-[200px] lg:w-[300px]"
                />
              </div>
            </form>
            <Search className="h-10 w-10 p-2 text-muted-foreground xl:hidden border rounded" />

            {isAuthenticated && (
              <DropdownMenu >
                <DropdownMenuTrigger asChild>

                  <Button variant="secondary" size="icon" className="rounded-full">
                    <AddIcon className="h-5 w-5" />
                  </Button>
                </DropdownMenuTrigger>

                <DropdownMenuContent >
                  <DropdownMenuItem asChild className="gap-2">

                    <Link to={'/dashboard/my-projects/create?type=project'}>
                      <AddIcon className="h-4 w-4" />
                      New Project
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild className="gap-2">
                    <Link to={'/dashboard/my-projects/create?type=model'}>
                      <AddIcon className="h-4 w-4" /> New ML Model
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
            {isAuthenticated && <NotificationButton />}
            {!isAuthenticated && (
              <>
                <Button>Book A Demo</Button>
                <Button>Get Started</Button>
                {/* divider */}
                <div className="h-6 w-[1px] bg-gray-400" />
              </>
            )}
            {isAuthenticated ? (
              <DropdownMenu modal>
                <DropdownMenuTrigger asChild>
                  <div className=" flex gap-4">
                    <Button
                      variant="secondary"
                      size="icon"
                      className="rounded-full"
                    >
                      <CircleUser className="h-5 w-5" />
                      <span className="sr-only">Toggle user menu</span>
                    </Button>
                    <div className=" cursor-pointer">
                      <div className="flex gap-2 capitalize items-center text-sm text-secondary-foreground">
                        {user?.name}{" "}
                        <span>
                          <ChevronDown className="h-4 w-4" />
                        </span>{" "}
                      </div>
                      <div className="text-xs font-semibold text-secondary-foreground">
                        {user?.organization?.name}
                      </div>
                    </div>
                  </div>
                </DropdownMenuTrigger>

                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Settings</DropdownMenuItem>
                  <DropdownMenuItem>Support</DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => {
                      onOpen("changePassword");
                    }}
                  >Change Password</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={() => {
                      onOpen("confirmationDialog", {
                        confirmationDialog: {
                          title: "Logout",
                          content: "Are you sure you want to logout?",
                          onConfirm: () => {
                            logout();
                            onClose();
                          },
                        },
                      });
                    }}
                  >
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button
                data-testid="login-button"
                variant="icon"
                onClick={() => {
                  // setOpenLoginNavbar(true);
                  // onOpen("confirmationDialog", {
                  //   confirmationDialog: {
                  //     title: "Login",
                  //     content: "Are you sure you want to login?",
                  //     onConfirm: () => {
                  //       login({
                  //         id: "1",
                  //         name: "John Doe",
                  //         email: "john.doe@example.com",
                  //       });
                  //       onClose();
                  //     },
                  //   },
                  // })
                }}
              >
                <LogIn />
              </Button>
            )}
          </div>
        </header>
      )}
    </>
  );
};

export default NavBar;
