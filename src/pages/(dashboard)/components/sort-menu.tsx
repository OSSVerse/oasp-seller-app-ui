import Icon from "@/components/common/icon";
import { Button } from "@/components/ui/button";

import {
  Popover,
  PopoverArrow,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useMyProject } from "@/store/my-project-store";
import { ArrowDown, ArrowUp } from "lucide-react";
import { Fragment } from "react";
// import { useNavigate, useSearchParams } from "react-router-dom";

const sortMenus = ["Newest", "Due Date", "Last Update"];

enum SortOrder {
  Ascending = 1,
  Descending = -1,
  None = 0,
}

// const getSearchParams = (
//   searchParams: URLSearchParams,
//   key: string,
//   defaultValue: string,
// ) => {
//   const sort = searchParams.get(key)?.toLocaleLowerCase();
//   if (
//     !sort ||
//     !sortMenus.map((menu) => menu.toLocaleLowerCase()).includes(sort)
//   ) {
//     return defaultValue;
//   }
//   return sort;
// };

// interface SortState {
//   sort: string;
//   order: SortOrder;
// }

const SortMenu = () => {
  const { setFilters, filters } = useMyProject();
  // const [searchParams] = useSearchParams();
  // const [sortOrder, setSortOrder] = useState<SortState>({
  //   sort: "newest",
  //   order: SortOrder.Descending,
  // });
  // const navigate = useNavigate();
  // const sort = getSearchParams(searchParams, "sort", "Newest");

  // useEffect(() => {
  //   const newParams = new URLSearchParams(searchParams);
  //   newParams.set('sort', sortOrder.sort);
  //   newParams.set('order', sortOrder.order);
  //   navigate(`?${newParams.toString()}`);
  // }, [sortOrder, navigate, searchParams]);

  const handleSortChange = (sort: string) => {
    setFilters({ sort });
  };
  // const handleToggle = (event: React.MouseEvent<HTMLButtonElement>) => {
  //   const val = event.currentTarget.dataset.value as string;

  //   setSortOrder((prev) => {
  //     if (val === prev.sort) {
  //       const newOrder = prev.order === SortOrder.Descending
  //         ? SortOrder.Ascending
  //         : prev.order === SortOrder.Ascending
  //         ? SortOrder.None
  //         : SortOrder.Descending;

  //       return {
  //         ...prev,
  //         order: newOrder,
  //       };
  //     } else {
  //       return {
  //         sort: val,
  //         order: SortOrder.Descending,
  //       };
  //     }
  //   });
  //   const newParams = new URLSearchParams(searchParams);
  //   newParams.set('sort', sortOrder.sort);
  //   newParams.set('order', sortOrder.order);
  //   navigate(`?${newParams.toString()}`);
  // };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button>
          {/* {sortOrder.order === SortOrder.Descending && <ArrowDown />}
    {sortOrder.order === SortOrder.Ascending && <ArrowUp />}
    {sortOrder.order === SortOrder.None && null} */}
          {filters.sort} <Icon icon="chevron-down" className="ml-2" />
        </Button>
      </PopoverTrigger>

      <PopoverContent align="end" className="p-4 pr-8 flex flex-col">
        {sortMenus.map((sortMenu) => {
          const menu = sortMenu.toLowerCase();
          return (
            <Fragment key={menu}>
              <div className="inline-flex justify-between items-center">
                <Button
                  variant={"link"}
                  onClick={() => handleSortChange(sortMenu)}
                >
                  {sortMenu}
                </Button>

                {filters.sort === sortMenu &&
                  filters.order === SortOrder.Descending && <ArrowDown />}
                {filters.sort === sortMenu &&
                  filters.order === SortOrder.Ascending && <ArrowUp />}
                {filters.sort === sortMenu &&
                  filters.order === SortOrder.None &&
                  null}
              </div>
            </Fragment>
          );
        })}
        <PopoverArrow />
      </PopoverContent>
    </Popover>
  );
};

export default SortMenu;
