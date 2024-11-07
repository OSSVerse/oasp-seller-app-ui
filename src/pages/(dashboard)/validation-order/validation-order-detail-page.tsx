import AppBreadCrumb from "@/components/common/app-breadcrumb";
import { PATH } from "@/lib/path-constant";
import { useEffect, useState } from "react";
import AnchorLists, { AnchorSection } from "../components/anchor-list";
import { H3, Paragraph } from "@/components/ui/typography";
import OrderDetailHeader from "../components/order-detail-header";
import OrderDetailCard from "../components/order-detal-card";
import { ORDER_STATUS } from "@/lib/constant";
import OrderDetailServiceOrder from "../components/order-detail-service-order";
import AccountInfo from "../components/account-info";
import { Card } from "@/components/ui/card";
import ListTable from "@/components/common/list-table";
import Attachments from "../components/attachment-list";
import OrderDetailTracking from "../components/order-detail-tracking";
import {
  type Daum,
  useGetOrder,
  useUpdateOrder,
} from "@/services/orders-service";
import { useParams } from "react-router-dom";
import OrderDetailHeaderAccepted from "../components/order-detail-header-accepted";
import OrderDetailHeaderPending from "../components/order-detail-header-pending";
import OrderDetailHeaderViewDeliverable from "../components/order-detail-view-deliverable";
// import { useAssessmentOrder } from "@/store/assessment-order-store";
import OrderDetailHeaderComplete from "../components/order-detail-header-complete";

const breadcrumb = [
  {
    title: "Dashboard",
    url: PATH.DASHBOARD,
  },
  {
    title: "Assessments Orders",
    url: PATH.ASSESSMENTORDER,
  },
];

const anchroLists = [
  "Buyer Info & Payment",
  "Request Details",
  "Additional Details",
  "Service Order",
];

// TODO: remove after integation with react-query

const partyDependencies = [
  {
    id: 0,
    dependency_name: "Dependency A",
    version: "1.0.1",
    description: "Handles authentication",
    source: "npm registry",
    license: "MIT License1",
  },
  {
    id: 1,
    dependency_name: "Dependency B",
    version: "2.3.1",
    description: "Handles authentication",
    source: "npm registry",
    license: "Apache License",
  },
  {
    id: 2,
    dependency_name: "Dependency C",
    version: "4.2.0",
    description: "Handles authentication",
    source: "npm registry",
    license: "Apache License",
  },
];

const additionalAttachements = [
  {
    id: "attachment-1",
    type: "video",
    title: "Acme Video",
    source:
      "https://videos.pexels.com/video-files/4625518/4625518-uhd_1440_2560_30fps.mp4",
  },
  {
    id: "attachment-2",
    type: "image",
    title: "Acme Image",
    source:
      "https://i.pinimg.com/236x/3c/d2/fe/3cd2fe44fad55577f6bcec432a07fab5.jpg",
  },
  {
    id: "attachment-3",
    type: "document",
    title: "Document name for ",
    source:
      "https://code.visualstudio.com/shortcuts/keyboard-shortcuts-windows.pdf",
  },
  {
    id: "attachment-4",
    type: "audio",
    title: "Audio Record",
    source:
      "https://traffic.libsyn.com/secure/bizpod/BEP384-Unexpected-Call.mp3",
  },
];

const additionalLinks = [
  { id: 0, link: "https://huggingface.co/transformers/model_doc/gpt2.html" },
  {
    id: 1,
    link: "https://huggingface.co/transformers/model_doc/gpt2/transformers/model_doc/gpt2.html",
  },
  {
    id: 2,
    link: "https:/huggingface.co/transformers/model_doc/gpt2/transformers/model_doc/gpt2/transformers/model_doc/gpt2.html",
  },
];



const ValidationOrderPage = () => {
  const [currentAnchor, setCurrentAnchor] = useState(0);
  const [currentStatus, setCurrentStatus] = useState("Pending");

  const [stages, _setStages] = useState([
    {
      name: "Order Accepted",
      status: ORDER_STATUS.ACCEPTED,
    },
    {
      name: "Upload Deliverable",
      status: ORDER_STATUS.UPLOAD_DELIVERABLE,
    },
    {
      name: "Complete Order",
      status: ORDER_STATUS.COMPLETED_ORDER,
    },
  ]);
  const { id } = useParams();
  const { data: orderDetail } = useGetOrder(id as string);

  useEffect(() => {
    if (orderDetail) {
      setCurrentStatus(orderDetail?.state);
    }
  }, [orderDetail]);

  // We need to append current order title to our breadcrumb
  const dynamicBreadcrumb = [
    ...breadcrumb,
    {
      title: orderDetail ? orderDetail?.items[0]?.descriptor?.name : "",
      url: orderDetail ? `${PATH.ASSESSMENTORDER}/${orderDetail?._id}` : "",
    },
  ];

  const { mutate: updateOrder, isPending } = useUpdateOrder(id as string);
  const handleAcceptedOrder = async (status: string) => {
    updateOrder({ status });
    setCurrentStatus(status);
  };

  return (
    <div className="page-root flex flex-col gap-7">
      <AppBreadCrumb data={dynamicBreadcrumb} />
      {/* title */}
      <OrderDetailHeader
        type={orderDetail?.items?.[0]?.category_id ?? ""}
        title={orderDetail?.items?.[0]?.descriptor?.name ?? ""}
        requestId={`${orderDetail?._id}`}
      >
        {currentStatus === ORDER_STATUS.PENDING ? (
          <OrderDetailHeaderPending
            isPending={isPending}
            handleAcceptedOrder={() =>
              handleAcceptedOrder(ORDER_STATUS.ACCEPTED)
            }
            handleRejectedOrder={() =>
              handleAcceptedOrder(ORDER_STATUS.REJECTED)
            }
            currentStatus={currentStatus}
          />
        ) : currentStatus === ORDER_STATUS.ACCEPTED ? (
          <OrderDetailHeaderAccepted
            onSubmit={() =>
              handleAcceptedOrder(ORDER_STATUS.UPLOAD_DELIVERABLE)
            }
            currentStatus={currentStatus}
            orderDetail={orderDetail ?? ({} as Daum)}
          />
        ) : currentStatus === ORDER_STATUS.UPLOAD_DELIVERABLE ? (
          <OrderDetailHeaderViewDeliverable
            onSubmit={() => handleAcceptedOrder(ORDER_STATUS.COMPLETED_ORDER)}
            currentStatus={currentStatus}
          />
        ) : currentStatus === ORDER_STATUS.COMPLETED_ORDER ? (
          <>Order Completed</>
        ) : currentStatus === ORDER_STATUS.REJECTED ? (
          <>Order Rejected</>
        ) : (
          <OrderDetailHeaderComplete currentStatus={currentStatus} />
        )}

        {/* right side content is different base on different status */}
      </OrderDetailHeader>

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

          <OrderDetailCard order={orderDetail ?? ({} as Daum)} />
        </aside>

        <div className="flex-grow">
          {/* tracking */}
          {/* {currentStatus === ORDER_STATUS.ACCEPTED && ( */}
          <section>
            <OrderDetailTracking
              stages={stages}
              currentStatus={currentStatus}
            />
          </section>
          {/* )} */}

          {/* buyer info */}
          <AnchorSection
            anchroLists={anchroLists}
            currentAnchor={currentAnchor}
            sectionIndex={0}
          >
            <AccountInfo order={orderDetail ?? ({} as Daum)} />
          </AnchorSection>

          {/* request detail */}
          <AnchorSection
            anchroLists={anchroLists}
            currentAnchor={currentAnchor}
            sectionIndex={1}
          >
            <RequestDetail />
          </AnchorSection>

          {/* additional details */}

          <AnchorSection
            anchroLists={anchroLists}
            currentAnchor={currentAnchor}
            sectionIndex={2}
          >
            <AdditionalDetail />
          </AnchorSection>

          {/* service order */}

          <AnchorSection
            anchroLists={anchroLists}
            currentAnchor={currentAnchor}
            sectionIndex={3}
          >
            <OrderDetailServiceOrder serviceOrders={orderDetail ?? ({} as Daum)} />
          </AnchorSection>
        </div>
      </main>
    </div>
  );
};

const RequestDetail = () => {
  return (
    <Card className="px-5 py-6 mb-4">
      <H3>Assessment Project</H3>
      <Paragraph>
        N/A
      </Paragraph>
      <H3 className="pt-6">Outcome</H3>
      <Paragraph>N/A</Paragraph>
    </Card>
  );
};

const AdditionalDetail = () => {
  return (
    <>
      <Card className="px-5  py-6 mb-4">
        <H3 className="mb-6">Attachment</H3>
        <Attachments attachments={additionalAttachements} />
        <ListTable dataSource={additionalLinks} excludedCols={["id"]} />
      </Card>
      <Card className="px-5 py-6 mb-4">
        <H3 className="mb-6">3-Party Dependency</H3>
        <ListTable dataSource={partyDependencies} excludedCols={["id"]} />
      </Card>
    </>
  );
};

export default ValidationOrderPage;
