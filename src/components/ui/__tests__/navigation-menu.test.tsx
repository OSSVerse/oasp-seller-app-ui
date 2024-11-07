global.ResizeObserver = class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
};

import { render, screen, fireEvent } from "@testing-library/react";
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuContent,
  NavigationMenuViewport,
  NavigationMenuIndicator,
} from "../navigation-menu";

describe("NavigationMenu Component", () => {
  it("renders NavigationMenu and children correctly", () => {
    render(
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger>Menu</NavigationMenuTrigger>
            <NavigationMenuContent>Content</NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    );
    expect(screen.getByText("Menu")).toBeInTheDocument();
  });

  it("toggles content visibility on trigger click", () => {
    render(
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger>Menu</NavigationMenuTrigger>
            <NavigationMenuContent>Content</NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    );
    
    const trigger = screen.getByText("Menu");
    expect(screen.queryByText("Content")).toBeNull();

    fireEvent.click(trigger);
    expect(screen.getByText("Content")).toBeVisible();

    fireEvent.click(trigger);
    expect(screen.queryByText("Content")).toBeNull();
  });

  // it("displays indicator when menu is open", () => {
  //   render(
  //     <NavigationMenu>
  //       <NavigationMenuList>
  //         <NavigationMenuItem>
  //           <NavigationMenuTrigger>Menu</NavigationMenuTrigger>
  //           <NavigationMenuContent>Content</NavigationMenuContent>
  //         </NavigationMenuItem>
  //         <NavigationMenuIndicator />
  //       </NavigationMenuList>
  //       <NavigationMenuViewport />
  //     </NavigationMenu>
  //   );

  //   const trigger = screen.getByText("Menu");
  //   fireEvent.click(trigger);
  //   const indicator = screen.getByRole("indicator");
  //   expect(indicator).toBeVisible();
  // });
});
