import ListTable from "@/components/common/list-table";
import { Card } from "@/components/ui/card";
import { H3 } from "@/components/ui/typography";
import { REMEDIATION_STATUS } from "@/lib/constant";
import { Bar } from "react-chartjs-2";

interface I3rdPartyRemediation {
  id: string;
  dependency: string;
  version: string;
  license: string;
  status: string;
}

interface IVulnerabilityRemediation {
  id: string;
  vulnerability_ID: string;
  severity: string;
  dependency: string;
  status: string;
}

interface Props {
  third_party_remediation: I3rdPartyRemediation[];
  vulnerability_remediation: IVulnerabilityRemediation[];
}
const MyProjectRemediation = ({
  third_party_remediation,
  vulnerability_remediation,
}: Props) => {
  const thridPartyRemediaiton = {
    labels: [
      `${REMEDIATION_STATUS.OUTDATED}      ${third_party_remediation.filter(
          (item) => item.status === REMEDIATION_STATUS.OUTDATED,
        ).length}`,
      `${REMEDIATION_STATUS.UPDATED}      ${third_party_remediation.filter(
          (item) => item.status === REMEDIATION_STATUS.UPDATED,
        ).length}`,
    ],
    datasets: [
      {
        axis: "y",
        data: [
          third_party_remediation.filter(
            (item) => item.status === REMEDIATION_STATUS.OUTDATED,
          ).length,
          third_party_remediation.filter(
            (item) => item.status === REMEDIATION_STATUS.UPDATED,
          ).length,
        ],
        backgroundColor: ["rgb(247, 110, 110)", "rgb(32, 201, 151)"],
        borderRadius: 5,
        barThickness: 25,
      },
    ],
  };

  const vulnerabilityRemediaiton = {
    labels: [
      `${REMEDIATION_STATUS.UNRESOLVE}      ${vulnerability_remediation.filter(
          (item) => item.status === REMEDIATION_STATUS.UNRESOLVE,
        ).length}`,
      `${REMEDIATION_STATUS.INPROGRESS}      ${vulnerability_remediation.filter(
          (item) => item.status === REMEDIATION_STATUS.INPROGRESS,
        ).length}`,
      `${REMEDIATION_STATUS.RESOLVED}      ${vulnerability_remediation.filter(
          (item) => item.status === REMEDIATION_STATUS.RESOLVED,
        ).length}`,
    ],
    datasets: [
      {
        axis: "y",
        data: [
          vulnerability_remediation.filter(
            (item) => item.status === REMEDIATION_STATUS.UNRESOLVE,
          ).length,
          vulnerability_remediation.filter(
            (item) => item.status === REMEDIATION_STATUS.INPROGRESS,
          ).length,
          vulnerability_remediation.filter(
            (item) => item.status === REMEDIATION_STATUS.RESOLVED,
          ).length,
        ],
        backgroundColor: [
          "rgb(247, 110, 110)",
          "rgb(102, 102, 102)",
          "rgb(32, 201, 151)",
        ],
        borderRadius: 5,
        barThickness: 25,
      },
    ],
  };
  return (
    <>
      <Card className="px-5 py-6 mb-4">
        <H3 className="mb-5">3rd-party Remediation</H3>
        <div className="grid grid-cols-3 gap-6">
          <div className="col-span-1">
            <Bar
              data={thridPartyRemediaiton}
              options={{
                indexAxis: "y",
                plugins: { legend: { display: false } },
                layout: {
                  padding: {
                    left: 10,
                    right: 10,
                    top: 50,
                    bottom: 50,
                  },
                },
                scales: {
                  x: {
                    ticks: {
                      display: false,
                    },
                    grid: {
                      display: false,
                    },
                    border: {
                      display: false,
                    },
                  },
                  y: {
                    grid: {
                      display: false,
                    },
                  },
                },
              }}
            />
          </div>
          <div className="col-span-2">
            <ListTable
              dataSource={third_party_remediation}
              excludedCols={["id"]}
            />
          </div>
        </div>
      </Card>
      <Card className="px-5 py-6 mb-7">
        <H3 className="mb-5">Vulnerability Remediation</H3>
        <div className="grid grid-cols-3 gap-6">
          <div className="col-span-1">
            <Bar
              data={vulnerabilityRemediaiton}
              options={{
                indexAxis: "y",
                plugins: { legend: { display: false } },
                layout: {
                  padding: {
                    left: 10,
                    right: 10,
                    top: 30,
                    bottom: 30,
                  },
                },
                scales: {
                  x: {
                    ticks: {
                      display: false,
                    },
                    grid: {
                      display: false,
                    },
                    border: {
                      display: false,
                    },
                  },
                  y: {
                    grid: {
                      display: false,
                    },
                  },
                },
              }}
            />
          </div>
          <div className="col-span-2">
            <ListTable
              dataSource={vulnerability_remediation}
              excludedCols={["id"]}
            />
          </div>
        </div>
      </Card>
    </>
  );
};

export default MyProjectRemediation;
