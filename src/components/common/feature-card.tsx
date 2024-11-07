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
import { Button } from "../ui/button";
import { Link } from "react-router-dom";

export const FeatureCard = ({
  product,
}: {
  product: RefinedProduct;
}) => {
  return (
    <Card className="max-w-full min-w-[320px] bg-[#F6F6F6] ld:max-w-[300px] sm:max-w-[280px] md:max-w-[290px] border-none shadow-none rounded-lg overflow-hidden">
      <CardHeader className="pb-2">
        <CardTitle className="space-y-2">
          <Badge
            variant={"secondary"}
            className=" h-16 w-16 flex items-center justify-center rounded-full bg-[#D9D9D9]"
          >
            {product.type === "PROJECT" ? (
              <ProjectIcon className="h-8 w-8" />
            ) : (
              <MLModelIcon className="h-8 w-8" />
            )}
          </Badge>
          <h3 className="text-lg font-semibold ">{product.productName}</h3>
          <p className="text-xs opacity-50">by {product?.createdBy?.slice(0, 10)}</p>
        </CardTitle>
      </CardHeader>
      <CardDescription className="text-xs px-6 pb-4">
        {product.description}
      </CardDescription>
      <CardContent className="space-y-2">
        <div className="text-sm font-semibold">Service Offered</div>
        <div className="flex flex-wrap gap-1">
          {product?.services?.map((service) => (
            <Badge
              variant="secondary"
              className="text-xs bg-[#D9D9D9] "
              key={service.id}
            >
              {service.productSubcategory1}
            </Badge>
          ))}
          {product.services.length > 3 && (
            <Badge variant="secondary" className="text-xs bg-[#D9D9D9] ">
              +{product.services.length - 3}
            </Badge>
          )}
        </div>
      </CardContent>
      <CardFooter className="flex justify-between items-center  px-6 ">
        <Button className="text-xs">
          <Link to={`/dashboard/placeorder/${product.productName}`}>View Offers</Link>
        </Button>
      </CardFooter>
    </Card>
  );
};
