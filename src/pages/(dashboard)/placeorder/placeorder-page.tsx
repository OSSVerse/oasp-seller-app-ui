import AppBreadCrumb from "@/components/common/app-breadcrumb";
import PlaceorderHeader from "./components/placeorder-header";
import AnchorLists, {
  isLessThanCurrentAnchor,
} from "../components/anchor-list";
import PyamentMethod from "./components/placeorder-payment-method";
import DescriptionDetail from "./components/placeorder-description-detail";
import { cn } from "@/lib/utils";
import AssessmentServicePricing from "./components/placeorder-assessment-service-pricing";
import Payment from "./components/placeorder-payment";
import { useMemo, useState } from "react";
import { Muted } from "@/components/ui/typography";
import Footer from "./components/placeorder-footer";
import { useMarketPlaceProducts } from "@/services/marketplace-service";
import { useParams } from "react-router-dom";

const breadcrumb = [
  {
    title: "Dashboard",
    url: "/dashboard",
  },
  {
    title: "OSS ARTIFACT DETAILS",
    url: "/dashboard/placeholder",
  },
];

const anchroLists = [
  "Descripton Details",
  "Assessment Service Pricing",
  "Payment",
];

const product = {
  id: 1,
  title: "OpenPilot",
  creator: "OpenFort",
  description:
    "An open-source driving agent that performs automatic lane keeping.",
  services: [
    "ASSESSMENT",
    "ATTESTATION",
    "CERTIFICATION",
    "REMEDIATION",
    "FEATURE ENHANCEMENT",
  ],
  price: 400,
  total_payment_amount: 1200,
  credit_card: {
    number: "12134 1234 1234 1234",
    date: "08/24 XXX",
  },
  type: "PROJECT",
  pricing_overall_info: [
    "OASP License",
    "12 SIMILAR PROJECT",
    "98% SUCCESSFULL",
    "4.9 from 50 reviewers",
  ],
  description_detail: {
    feature_enhancements: [
      {
        id: "feature_enhancements-1",
        title: "Security Upgrades",
        lists: [
          "Two-Factor Authentication (2FA): Add 2FA to provide an extra layer of security for user accounts.",
          "Data Encryption: lmplement end-to-end encryption for all data transactions to ensure user data privacy and security.",
        ],
      },
      {
        id: "feature_enhancements-2",
        title: "New Functionalities",
        lists: [
          "Real-Time Colaboration: Enable multiple users to work on the same document or project simultaneously, with real-time updates and version control.",
          "Al-Powered insights: ntegrate artificial inteligence to provide predictive analytics and actionable insights based on user data.",
        ],
      },
      {
        id: "feature_enhancements-3",
        title: "Integration Capabilities",
        lists: [
          "Third-Party integrations: support for popular third-party services such as Slack, Trello, or Google Drive, alowing seamless integration and workfow automation.",
          "APl! Enhancements: Expand APl capabilities to alow more comprehensive access and manipulation of data, enabing developers to build more powerful integrations.",
        ],
      },
    ],
    open_pilot:
      "Openpilot is an open source driver assistance system. 0penpilot performs the functions of Automated Lane Centering and Adaptive Cruise Controlfor250+ supported car makes and models.",
    input: [
      {
        id: "input-1",
        title: "A ison file that contains the following fields:",
        lists: [
          "text -(string, required) The text sequence to use to prompt nthe generation. max_length - (int, optional, defaults to length of input text + 50) - The maximum length of the sequence to be generated",
          "max new tokens(int,optional) ",
          "min_length (int, optional)",
          "do sample(boolean,optional)",
          "early_stopping (boolean, optional) num beams(int,optional)",
          "temperature (float,optional) top k(int,optional) 。top_p",
          "(float, optional) repetition penalty (float,optional) no",
          "repeat ngram size(int,optional)",
          "encoderno_repeat_ngram_size(int,optional) num return",
          "sequences(int.optional)",
        ],
      },
      {
        id: "input-2",
        title:
          "For more information on the above fields, refer to the Huggingface Model generation documentation https:/huggingface.co/transformers/main_classes/model.html#generation",
      },
    ],
    output: "generated text A text file containing the",
  },
};

const PlaceOrderPage = () => {
  const [currentAnchor, setCurrentAnchor] = useState(0);
  const { id } = useParams();
  const { data } = useMarketPlaceProducts("", "");

  const activeProduct = useMemo(() => {
    return data?.find((p) => p.productName === id);
  }, [data, id]);

  return (
    <div className="page-root flex flex-col gap-7">
      <AppBreadCrumb data={breadcrumb} />
      {/* title */}
      <PlaceorderHeader
        type={product.type}
        title={product.title}
        description={product.description}
      />

      {/* main */}
      <main
        className="flex gap-11 flex-wrap mb-4 w-full md:flex-nowrap
      before:content=['']
      before:absolute
      before:top-0
      before:left-0
      before:w-full
        before:h-[400px]
        before:bg-neutral-100
        before:z-[-1]
      }
      "
      >
        {/* main aside */}
        <aside className="basis-72 flex-shrink-0">
          {/* anchor link list */}
          <AnchorLists
            currentAnchor={currentAnchor}
            setCurrentAnchor={setCurrentAnchor}
            anchroLists={anchroLists}
          />

          <PyamentMethod
            number={product?.credit_card?.number}
            date={product?.credit_card?.date}
            total_payment_amount={activeProduct?.totalPrice ?? 0}
          />
        </aside>
        <div className="flex-grow">
          {/* description detail section */}
          <section
            className={cn(
              isLessThanCurrentAnchor(0, currentAnchor) && "hidden",
            )}
          >
            <Muted className="mb-4">{anchroLists[0].toLocaleUpperCase()}</Muted>
            <DescriptionDetail
              description_detail={product?.description_detail}
            />
          </section>

          {/* assessment service pricing section */}
          <section
            className={cn(
              isLessThanCurrentAnchor(1, currentAnchor) && "hidden",
            )}
          >
            <Muted className="mb-4">{anchroLists[1].toLocaleUpperCase()}</Muted>
            <AssessmentServicePricing
              type={product.type}
              creator={product.creator}
              pricing_overall_info={product.pricing_overall_info}
            />
          </section>

          {/* payment section */}
          <section
            className={cn(
              isLessThanCurrentAnchor(2, currentAnchor) && "hidden",
            )}
          >
            <Muted className="mb-4">{anchroLists[2].toLocaleUpperCase()}</Muted>
            {/* Here will be replaced by 3rd party payment gayway */}
            <Payment />
          </section>

          {/* footer */}
          <Footer title={product.title} />
        </div>
      </main>
    </div>
  );
};

export default PlaceOrderPage;
