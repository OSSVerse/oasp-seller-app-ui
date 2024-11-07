import AppBreadCrumb from "@/components/common/app-breadcrumb";
import { H3 } from "@/components/ui/typography";
import { PATH } from "@/lib/path-constant";
import { useState } from "react";
import OrderDetailTracking from "../components/order-detail-tracking";
import { ORDER_STATUS } from "@/lib/constant";
import CreateStepProjectDetails from "./components/create-step-project-details";
import CreateStepRemediation from "./components/create-step-remediation";

const breadcrumb = [
  {
    title: "Dashboard",
    url: PATH.DASHBOARD,
  },
  {
    title: "My Projects",
    url: PATH.MYPROJECTS,
  },
  {
    title: "New Projects",
    url: PATH.CREATE_MYPROJECTS,
  },
];

const MyProjectCreatePage = () => {
  const [currentStatus, setCurrentStatus] = useState(
    ORDER_STATUS.PROJECT_DETAILS,
  );

  const [stages, _setStages] = useState([
    {
      name: "Project Details",
      status: ORDER_STATUS.PROJECT_DETAILS,
    },
    {
      name: "Remediation",
      status: ORDER_STATUS.REMEDIATION,
    },
  ]);

  // check whether could be next btn
  return (
    <div className="page-root flex flex-col gap-7">
      <AppBreadCrumb data={breadcrumb} />
      {/* {JSON.stringify(data)} */}
      {/* header */}
      <div className="flex gap-11 flex-wrap mb-4 w-full md:flex-nowrap justify-between">
        <div className="basis-3/5 flex gap-4 items-center">
          <div>
            <H3 className="text-3xl">Add New Project</H3>
          </div>
        </div>
      </div>
      {/* main */}
      <main
        className="flex gap-11 mb-4 items-center  w-[1280px]  md:flex-nowrap mx-auto
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
        <div className="flex-grow border border-neutral-100 rounded-xl bg-card text-card-foreground shadow p-7 mb-7">
          {/* tracking */}
          <OrderDetailTracking stages={stages} currentStatus={currentStatus} />
          {currentStatus === ORDER_STATUS.PROJECT_DETAILS && (
            <CreateStepProjectDetails setCurrentStatus={setCurrentStatus} />
          )}

          {currentStatus === ORDER_STATUS.REMEDIATION && (
            <CreateStepRemediation setCurrentStatus={setCurrentStatus} />
          )}
        </div>
      </main>
    </div>
  );
};

export default MyProjectCreatePage;
