import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Fragment } from "react";
import { Link } from "react-router-dom";

const AppBreadCrumb = ({
  data,
}: {
  data: { title: string; url: string }[];
}) => {
  return (
    <Breadcrumb className=" ">
      <BreadcrumbList>
        {data.map((item, index) =>
          index === data.length - 1 ? (
            <BreadcrumbItem key={item.url}>
              <BreadcrumbPage className="uppercase text-[0.625rem] placeholder-opacity-50 text-primary opacity-50">
                {item.title}
              </BreadcrumbPage>
            </BreadcrumbItem>
          ) : (
            <Fragment key={item.url}>
              <BreadcrumbItem>
                <BreadcrumbLink
                  className="uppercase text-[0.625rem] text-primary"
                >
                  <Link to={item.url}>{item.title}</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator key={`${item.url}-separator`} />
            </Fragment>
          ),
        )}
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export default AppBreadCrumb;
