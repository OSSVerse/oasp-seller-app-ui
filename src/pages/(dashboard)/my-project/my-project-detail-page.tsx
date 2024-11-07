import AppBreadCrumb from "@/components/common/app-breadcrumb";
import { PATH } from "@/lib/path-constant";
import { useState } from "react";
import AnchorLists, {
  isLessThanCurrentAnchor,
} from "../components/anchor-list";
import { cn } from "@/lib/utils";
import { Muted } from "@/components/ui/typography";
import MyProjectDescription from "./components/my-project-description";
import MyProjectAdditionalDetail from "./components/my-project-additional-detail";
import MyProjectServiceOffered from "./components/my-project-service-offered";
import MyProjectDisucssion from "./components/my-project-discussion";
import MyProjectRiskAssessment from "./components/my-project-risk-assessment";
import MyProjectRemediation from "./components/my-project-remediation";
import { REMEDIATION_STATUS } from "@/lib/constant";
import MyProjectHeader from "./components/my-project-header";
import MyProjectHeaderPublished from "./components/my-project-header-published";
import MyProjectTAVOSS from "./components/my-project-tavoss";

const breadcrumb = [
  {
    title: "Dashboard",
    url: PATH.DASHBOARD,
  },
  {
    title: "My Projects",
    url: PATH.MYPROJECTS,
  },
];
const anchroLists = [
  "Description",
  "Additional Details",
  "Service Offered",
  "Risk Assessment",
  "Remediation",
  "Discussion",
];

// TODO: remove after integation with react-query
const order = {
  id: 1,
  title: "OpenPilot",
  description_details:
    "### OpenPilot\nOpenpilot is an open source driver assistance system. 0penpilot performs the functions of Automated Lane Centering and Adaptive Cruise Controlfor250+ supported car makes and models.\n\n### Input\nA ison file that contains the following fields:\n- text -(string, required) The text sequence to use to prompt nthe generation\n- max_length - (int, optional, defaults to length of input text + 50) - The maximum length of the sequence to be generated\n- max new tokens(int,optional) \n- min_length (int, optional)\n- do sample(boolean,optional)\n- early_stopping (boolean, optional) num beams(int,optional)\n- temperature (float,optional)\n- top k(int,optional) \n- top_p(float, optional) repetition penalty (float,optional)\n- no_repeat_ngram size(int,optional)\n- encoderno_repeat_ngram_size(int,optional) num return\n- sequences(int.optional)\nFor more information on the above fields, refer to the Huggingface Model generation documentation [https:/huggingface.co/transformers/main_classes/model.html#generation](https:/huggingface.co/transformers/main_classes/model.html#generation)\n\n### Output\ngenerated text A text file containing the\n",
  feature_enhancement:
    "### Feature Enhancement\nSecurity Upgrades \n- Two-Factor Authentication (2FA): Add 2FA to provide an extra layer of security for user accounts.\n- Data Encryption: lmplement end-to-end encryption for all data transactions to ensure user data privacy and security.\n\nNew Functionalities \n\n- Real-Time Colaboration: Enable multiple users to work on the same document or project simultaneously, with real-time updates and version control.\n- Al-Powered insights: ntegrate artificial inteligence to provide predictive analytics and actionable insights based on user data.\n\nIntegration Capabilities\n\n- Third-Party integrations: support for popular third-party services such as Slack, Trello, or Google Drive, alowing seamless integration and workfow automation.\n- APl! Enhancements: Expand APl capabilities to alow more comprehensive access and manipulation of data, enabing developers to build more powerful integrations.",

  requestId: "12345",
  buyer: {
    title: "Business XYZ",
    firstName: "John",
    lastName: "Appleseed",
    workMail: "johndoe@workmail.com",
    phone: "(123) 456-7890",
    payment: {
      method: "Paypal",
      status: "Verfied",
      amount: 1100,
    },
  },
  lastUpdated: "today",
  deliveryDate: "Sept 4, 2024",
  pricing: 600,
  status: "Pending",
  serviceOrders: [
    {
      id: "servicesItems-1",
      name: "Assessment",
      qty: 400,
      icon: "search-alt",
    },
    {
      id: "servicesItems-2",
      name: "Attestation",
      qty: 400,
      icon: "rr-file",
    },
    {
      id: "servicesItems-3",
      name: "Certification",
      icon: "diploma",
      qty: 400,
    },
  ],
  type: "PROJECT",
  gitHubUrl: "https://github.com/commaai/openpilot",
};

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

const risk_assessment = {
  human_oversight: {
    intended_use: {
      item: "Automatic Text Generation",
      description: "Generate long bodies of text",
    },
    oversight_recommendation: {
      item: "Fully Automated",
      description: "Complete automation of oversight and monitoring",
    },
  },
  privacy_risk: [
    "This model includes transparency features",
    "Training data includes personal information",
    "Model includes privacy risk",
  ],
};

const remediation = {
  third_party_remediation: [
    {
      id: "001",
      dependency: "Dependency A",
      version: "1.0.0",
      license: "MIT License",
      status: REMEDIATION_STATUS.OUTDATED,
    },
    {
      id: "002",
      dependency: "Dependency A",
      version: "1.0.0",
      license: "MIT License",
      status: REMEDIATION_STATUS.UPDATED,
    },
    {
      id: "003",
      dependency: "Dependency A",
      version: "1.0.0",
      license: "MIT License",
      status: REMEDIATION_STATUS.UPDATED,
    },
    {
      id: "004",
      dependency: "Dependency A",
      version: "1.0.0",
      license: "MIT License",
      status: REMEDIATION_STATUS.OUTDATED,
    },
    {
      id: "005",
      dependency: "Dependency A",
      version: "1.0.0",
      license: "MIT License",
      status: REMEDIATION_STATUS.UPDATED,
    },
    {
      id: "006",
      dependency: "Dependency A",
      version: "1.0.0",
      license: "MIT License",
      status: REMEDIATION_STATUS.UPDATED,
    },
    {
      id: "007",
      dependency: "Dependency A",
      version: "1.0.0",
      license: "MIT License",
      status: REMEDIATION_STATUS.UPDATED,
    },
    {
      id: "008",
      dependency: "Dependency A",
      version: "1.0.0",
      license: "MIT License",
      status: REMEDIATION_STATUS.UPDATED,
    },
    {
      id: "009",
      dependency: "Dependency A",
      version: "1.0.0",
      license: "MIT License",
      status: REMEDIATION_STATUS.UPDATED,
    },
    {
      id: "010",
      dependency: "Dependency A",
      version: "1.0.0",
      license: "MIT License",
      status: REMEDIATION_STATUS.UPDATED,
    },
    {
      id: "011",
      dependency: "Dependency A",
      version: "1.0.0",
      license: "MIT License",
      status: REMEDIATION_STATUS.UPDATED,
    },
    {
      id: "012",
      dependency: "Dependency A",
      version: "1.0.0",
      license: "MIT License",
      status: REMEDIATION_STATUS.UPDATED,
    },
    {
      id: "013",
      dependency: "Dependency A",
      version: "1.0.0",
      license: "MIT License",
      status: REMEDIATION_STATUS.UPDATED,
    },
    {
      id: "014",
      dependency: "Dependency A",
      version: "1.0.0",
      license: "MIT License",
      status: REMEDIATION_STATUS.UPDATED,
    },
  ],
  vulnerablitiy_remediation: [
    {
      id: "001",
      vulnerability_ID: "CVE-2021-34527",
      severity: "High",
      dependency: "Dependency A",
      status: REMEDIATION_STATUS.UNRESOLVE,
    },
    {
      id: "002",
      vulnerability_ID: "CVE-2021-34527",
      severity: "Medium",
      dependency: "Dependency A",
      status: REMEDIATION_STATUS.INPROGRESS,
    },
    {
      id: "003",
      vulnerability_ID: "CVE-2021-34527",
      severity: "Low",
      dependency: "Dependency A",
      status: REMEDIATION_STATUS.RESOLVED,
    },
    {
      id: "004",
      vulnerability_ID: "CVE-2021-34527",
      severity: "Low",
      dependency: "Dependency A",
      status: REMEDIATION_STATUS.RESOLVED,
    },
    {
      id: "005",
      vulnerability_ID: "CVE-2021-34527",
      severity: "High",
      dependency: "Dependency A",
      status: REMEDIATION_STATUS.UNRESOLVE,
    },
    {
      id: "006",
      vulnerability_ID: "CVE-2021-34527",
      severity: "High",
      dependency: "Dependency A",
      status: REMEDIATION_STATUS.INPROGRESS,
    },
    {
      id: "007",
      vulnerability_ID: "CVE-2021-34527",
      severity: "High",
      dependency: "Dependency A",
      status: REMEDIATION_STATUS.INPROGRESS,
    },
    {
      id: "008",
      vulnerability_ID: "CVE-2021-34527",
      severity: "High",
      dependency: "Dependency A",
      status: REMEDIATION_STATUS.INPROGRESS,
    },
    {
      id: "009",
      vulnerability_ID: "CVE-2021-34527",
      severity: "High",
      dependency: "Dependency A",
      status: REMEDIATION_STATUS.RESOLVED,
    },
    {
      id: "010",
      vulnerability_ID: "CVE-2021-34527",
      severity: "High",
      dependency: "Dependency A",
      status: REMEDIATION_STATUS.RESOLVED,
    },
    {
      id: "011",
      vulnerability_ID: "CVE-2021-34527",
      severity: "High",
      dependency: "Dependency A",
      status: REMEDIATION_STATUS.RESOLVED,
    },
    {
      id: "012",
      vulnerability_ID: "CVE-2021-34527",
      severity: "High",
      dependency: "Dependency A",
      status: REMEDIATION_STATUS.RESOLVED,
    },
    {
      id: "013",
      vulnerability_ID: "CVE-2021-34527",
      severity: "High",
      dependency: "Dependency A",
      status: REMEDIATION_STATUS.RESOLVED,
    },
    {
      id: "014",
      vulnerability_ID: "CVE-2021-34527",
      severity: "High",
      dependency: "Dependency A",
      status: REMEDIATION_STATUS.RESOLVED,
    },
    {
      id: "015",
      vulnerability_ID: "CVE-2021-34527",
      severity: "High",
      dependency: "Dependency A",
      status: REMEDIATION_STATUS.RESOLVED,
    },
    {
      id: "016",
      vulnerability_ID: "CVE-2021-34527",
      severity: "High",
      dependency: "Dependency A",
      status: REMEDIATION_STATUS.RESOLVED,
    },
    {
      id: "017",
      vulnerability_ID: "CVE-2021-34527",
      severity: "High",
      dependency: "Dependency A",
      status: REMEDIATION_STATUS.RESOLVED,
    },
    {
      id: "018",
      vulnerability_ID: "CVE-2021-34527",
      severity: "High",
      dependency: "Dependency A",
      status: REMEDIATION_STATUS.RESOLVED,
    },
  ],
};

const tavoss = ["openssf", "apache", "the_linux_foundation", "iso"];

const MyProjectDetailPage = () => {
  const [currentAnchor, setCurrentAnchor] = useState(0);

  // We need to append current order title to our breadcrumb
  const dynamicBreadcrumb = [
    ...breadcrumb,
    {
      title: order.title,
      url: `${PATH.ASSESSMENTORDER}/${order.id}`,
    },
  ];

  return (
    <div className="page-root flex flex-col gap-7">
      <AppBreadCrumb data={dynamicBreadcrumb} />
      {/* title */}
      <MyProjectHeader
        type={order.type}
        title={order.title}
        repository={order.gitHubUrl}
        last_update={order.lastUpdated}
      >
        <MyProjectHeaderPublished currentStatus="Published" />
      </MyProjectHeader>

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

          <MyProjectTAVOSS tavoss={tavoss} />
        </aside>
        <div className="flex-grow">
          {/* stepper */}

          {/* description */}
          <section
            className={cn(
              isLessThanCurrentAnchor(0, currentAnchor) && "hidden",
            )}
          >
            <Muted className="mb-4">{anchroLists[0].toLocaleUpperCase()}</Muted>
            <MyProjectDescription
              description_details={order?.description_details}
              feature_enhancement={order?.feature_enhancement}
            />
          </section>

          {/* additional details */}
          <section
            className={cn(
              isLessThanCurrentAnchor(1, currentAnchor) && "hidden",
            )}
          >
            <Muted className="mb-4">{anchroLists[1].toLocaleUpperCase()}</Muted>
            <MyProjectAdditionalDetail
              attachments={additionalAttachements}
              links={additionalLinks}
            />
          </section>

          {/* Service Offered */}
          <section
            className={cn(
              isLessThanCurrentAnchor(2, currentAnchor) && "hidden",
            )}
          >
            <Muted className="mb-4">{anchroLists[2].toLocaleUpperCase()}</Muted>
            <MyProjectServiceOffered serviceOrders={order.serviceOrders} />
          </section>

          {/* Risk Assessment */}
          <section
            className={cn(
              isLessThanCurrentAnchor(3, currentAnchor) && "hidden",
            )}
          >
            <Muted className="mb-4">{anchroLists[3].toLocaleUpperCase()}</Muted>
            <MyProjectRiskAssessment
              humanOversight={risk_assessment.human_oversight}
              privacyRisk={risk_assessment.privacy_risk}
            />
          </section>

          {/* Remediation */}
          <section
            className={cn(
              isLessThanCurrentAnchor(4, currentAnchor) && "hidden",
            )}
          >
            <Muted className="mb-4">{anchroLists[4].toLocaleUpperCase()}</Muted>
            <MyProjectRemediation
              third_party_remediation={remediation.third_party_remediation}
              vulnerability_remediation={remediation.vulnerablitiy_remediation}
            />
          </section>

          {/* Discussion */}
          <section
            className={cn(
              isLessThanCurrentAnchor(5, currentAnchor) && "hidden",
            )}
          >
            <Muted className="mb-4">{anchroLists[5].toLocaleUpperCase()}</Muted>
            <MyProjectDisucssion />
          </section>
        </div>
      </main>
    </div>
  );
};

export default MyProjectDetailPage;
