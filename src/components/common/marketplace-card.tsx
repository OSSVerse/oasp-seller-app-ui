import MLModelIcon from "@/components/icons/ml-model-icon";
import ProjectIcon from "@/components/icons/project-icon";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { RefinedProduct } from "@/services/marketplace-service";
import { ExternalLink } from "lucide-react";

import { Link } from "react-router-dom";

export const MarketplaceCard = ({
  product,
}: {
  product: RefinedProduct;
}) => {
  return (
    <Link to={`/dashboard/placeorder/${product.productName}`}>
      <Card className="max-w-full w-full min-w-[320px] ld:max-w-[300px] bg-[#F6F6F6] sm:max-w-[280px] md:max-w-[290px] border-none shadow-none  rounded-lg overflow-hidden">
        <CardHeader className="pb-2">
          <CardTitle className="space-y-2">
            <Badge
              variant={"secondary"}
              className=" h-16 w-16 bg-[#D9D9D9] flex items-center justify-center rounded-full"
            >
              {product.type === "PROJECT" ? (
                <ProjectIcon className="h-8 w-8" />
              ) : (
                <MLModelIcon className="h-8 w-8" />
              )}
            </Badge>
            <h3 className="text-lg font-semibold  flex gap-1 items-center">
              {product.productName}{" "}
              <ExternalLink className=" h-4 w-4 text-gray-400 text-sm" />
            </h3>
            <p className="text-xs opacity-80 font-normal">
              by {product?.createdBy?.slice(0, 10)}
            </p>
          </CardTitle>
        </CardHeader>
        {/* <CardDescription className="text-xs font-normal px-6 pb-4">
          {product.description}
        </CardDescription> */}
        <CardDescription className="text-xs mt-2 px-6 pb-4">
          {product?.description?.slice(0, 100)}
        </CardDescription>
        <CardContent className="space-y-2">
          <div className="text-sm font-semibold">Service Offered</div>
          <div className="flex flex-wrap gap-1">
            {product?.services?.slice(0, 3).map((service) => (
              <Badge
                variant="secondary"
                className="text-xs bg-[#D9D9D9] "
                key={service.id}
              >
                {service.productSubcategory1}
              </Badge>
            ))}
            {product?.services?.length > 3 && (
              <Badge variant="secondary" className="text-xs bg-[#D9D9D9] ">
                +{product?.services?.length - 3}
              </Badge>
            )}
          </div>
        </CardContent>
        <CardFooter className="flex justify-between items-center  px-6 ">
          <div className="text-lg">
            ₹{product?.totalPrice?.toLocaleString("en-IN")}
          </div>
          <div className="text-xs font-[500] capitalize text-muted-foreground">
            {product.type}
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
};
