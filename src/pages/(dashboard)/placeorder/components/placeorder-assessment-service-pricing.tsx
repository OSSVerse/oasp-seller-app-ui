import PlaceOrderCheckList from "./placeorder-check-list";
import { Card } from "@/components/ui/card";
import { H1, H3, Muted } from "@/components/ui/typography";
import { Badge } from "@/components/ui/badge";
import { Search } from "lucide-react";
import ProjectIcon from "@/components/icons/project-icon";
import MLModelIcon from "@/components/icons/ml-model-icon";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Label } from "@radix-ui/react-label";
import { useState } from "react";
import type { Daum } from "@/services/orders-service";

const servicesItems: Daum["items"] = [

];

const oaspItems: Daum["items"] =
  [
    {
      "descriptor": {
        "name": "RomRaider"
      },
      "price": {
        "currency": "INR",
        "value": "11000"
      },
      "category_id": "OSS Project",
      "productSubcategory1": "Assurance & Assessment Service",
      "description": "Assurance & Assessment Service",
      "longDescription": "Assurance & Assessment Service",
      "quantity": {
        "count": 1,
        "measure": {
          "unit": "Unit-count",
          "value": 1
        }
      },
      "details": null
    },
    {
      "descriptor": {
        "name": "RomRaider"
      },
      "price": {
        "currency": "INR",
        "value": "11000"
      },
      "category_id": "OSS Project",
      "productSubcategory1": "Validation & Verification Service",
      "description": "desc",
      "longDescription": "long-desc",
      "quantity": {
        "count": 1,
        "measure": {
          "unit": "Unit-count",
          "value": 1
        }
      },
      "details": null
    },
    {
      "descriptor": {
        "name": "RomRaider"
      },
      "price": {
        "currency": "INR",
        "value": "11000"
      },
      "category_id": "OSS Project",
      "productSubcategory1": "Remediation Service",
      "description": "desc",
      "longDescription": "long-desc",
      "quantity": {
        "count": 1,
        "measure": {
          "unit": "Unit-count",
          "value": 1
        }
      },
      "details": null
    },
    {
      "descriptor": {
        "name": "RomRaider"
      },
      "price": {
        "currency": "INR",
        "value": "11000"
      },
      "category_id": "OSS Project",
      "productSubcategory1": "Pentesting Service",
      "description": "desc",
      "longDescription": "long-desc",
      "quantity": {
        "count": 1,
        "measure": {
          "unit": "Unit-count",
          "value": 1
        }
      },
      "details": null
    },
    {
      "descriptor": {
        "name": "RomRaider"
      },
      "price": {
        "currency": "INR",
        "value": "11000"
      },
      "category_id": "OSS Project",
      "productSubcategory1": "Feature Addition",
      "description": "desc",
      "longDescription": "long-desc",
      "quantity": {
        "count": 1,
        "measure": {
          "unit": "Unit-count",
          "value": 1
        }
      },
      "details": null
    },
    {
      "descriptor": {
        "name": "RomRaider"
      },
      "price": {
        "currency": "INR",
        "value": "11000"
      },
      "category_id": "OSS Project",
      "productSubcategory1": "TAVOSS Version & Certification Service",
      "description": "desc",
      "longDescription": "long-desc",
      "quantity": {
        "count": 1,
        "measure": {
          "unit": "Unit-count",
          "value": 1
        }
      },
      "details": null
    }
  ]


interface AssessmentServicePricingProps {
  type: string;
  creator: string;
  pricing_overall_info: string[];
}

const AssessmentServicePricing = ({
  type,
  creator,
  pricing_overall_info,
}: AssessmentServicePricingProps) => {
  const [selectedServices, setSelectedServices] = useState<Daum["items"]>([]);
  const [selectedOasps, setSelectedOasps] = useState<Daum["items"]>([]);

  const total_service_amount = selectedServices.reduce(
    (accumulate, current) => accumulate + Number(current.price.value),
    0,
  );
  const total_oasps_amount = selectedOasps.reduce(
    (accumulate, current) => accumulate + Number(current.price.value),
    0,
  );
  const total_payment_amount = total_service_amount + total_oasps_amount;
  return (
    <Card className="px-5 py-6 mb-4">
      <H3 className="font-bold  mb-4">OASP and Service List Provided</H3>
      <div className="flex gap-11 flex-wrap mb-4 w-full md:flex-nowrap items-end justify-between">
        <div className="basis-3/5 flex gap-4 items-center">
          <Badge
            variant={"secondary"}
            className=" h-16 w-16 flex items-center justify-center rounded-full"
          >
            {type === "PROJECT" ? (
              <ProjectIcon data-testid="icon-ProjectIcon" className="h-8 w-8" />
            ) : (
              <MLModelIcon data-testid="icon-MLModelIcon" className="h-8 w-8" />
            )}
          </Badge>
          <div>
            <H1>{creator}</H1>

            {pricing_overall_info.map((info) => (
              <Badge variant="secondary" className="text-x " key={info}>
                {info}
              </Badge>
            ))}
          </div>
        </div>
        <div className="basis-2/5 flex gap-4 justify-end">
          <form className="ml-auto flex  gap-3 md:w-auto">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search Service.."
                className="pl-8 w-full md:w-[200px] lg:w-[300px]"
              />
            </div>
          </form>
        </div>
      </div>
      {/* service list */}
      <PlaceOrderCheckList
        items={servicesItems}
        setSelectedItems={setSelectedServices}
      />
      <div className="flex gap-11 flex-wrap mb-4 w-full md:flex-nowrap items-end justify-between">
        <div className="basis-3/5 flex gap-4 items-center">
          <div>
            <H1>Top Recommended OASPs for Validation Your Project</H1>

            <Muted className="leading-5">
              Recommendation Criteria: Suitable expertise,95% successful track
              record or above, 4.8customer ratings or above and same
              geographical proximity.
            </Muted>
          </div>
        </div>
        <div className="basis-2/5 flex gap-4 justify-end">
          <form className="ml-auto flex gap-3 md:w-auto">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search OASP.."
                className="pl-8 w-full md:w-[200px] lg:w-[300px]"
              />
            </div>
            <Button className="rounded-full">filter</Button>
          </form>
        </div>
      </div>
      <PlaceOrderCheckList
        items={oaspItems}
        setSelectedItems={setSelectedOasps}
        disabledLength={selectedOasps.length >= 2}
      />
      <Muted className="leading-5">
        Note: lf you want to change the OASP recommended by the platform, please
        uncheck it first and replace with your choice.
      </Muted>
      <Separator className="my-10" />
      <H3 className="font-bold  mb-4">Assessment Service Pricing</H3>
      <div className="w-3/4 flex flex-col gap-2">
        <div className="flex justify-between">
          <Label>Initial Assessment</Label> <span>₹{total_service_amount}</span>
        </div>
        <div className="pl-4 flex flex-col gap-2">
          {selectedServices.map((selectedService) => (
            <div key={selectedService.productSubcategory1} className="flex gap-2">
              <Label className="basis-[49%]">{selectedService.productSubcategory1}</Label>{" "}
              <span>₹{selectedService.quantity.count}</span>
            </div>
          ))}
        </div>
        {selectedOasps.map((selectedOasp) => (
          <div key={selectedOasp.productSubcategory1} className="flex justify-between">
            <Label>{selectedOasp.productSubcategory1}</Label> <span>₹{selectedOasp.quantity.count}</span>
          </div>
        ))}
        <Separator className="my-4 relative before:content-['+'] before:absolute before:-right-5 before:-top-4 before:text-black before:text-2xl" />

        <div className="flex justify-between">
          <Label>Total of Payment</Label>{" "}
          <span className="font-bold">₹{total_payment_amount}</span>
        </div>
      </div>
    </Card>
  );
};

export default AssessmentServicePricing;
