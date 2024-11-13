import FormRow from "@/components/common/form-row";
import { Button } from "@/components/ui/button";
import { ORDER_STATUS } from "@/lib/constant";
import { useMyProject } from "@/store/my-project-store";
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

interface CreateStepProjectDetailsProps {
  setCurrentStatus: React.Dispatch<React.SetStateAction<string>>;
}
const CreateStepProjectDetails = ({
  setCurrentStatus,
}: CreateStepProjectDetailsProps) => {
  const navigate = useNavigate();
  const { createProjectDetails, setCreateProjectDetails } = useMyProject();
  const [data, setData] = useState(createProjectDetails);

  const [searchParams] = useSearchParams();
  const type = searchParams.get("type");


  useEffect(() => {
    if (type === "model") {
      handleChange("ML Model", "productCategory");
    }
    if (type === "project") {
      handleChange("OSS Project", "productCategory");
    }
  }, [type]);

  const handleChange = (val: string, name: string) => {

    const value =
      name === "MRP" || name === "purchasePrice" ? Number(val) : val;
    setData((pre) => ({
      ...pre,
      commonDetails: {
        ...pre.commonDetails,
        [name]: value,
      },
    }));
  };

  // TODO: grab the project detail into store
  const handleNewProject = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    setCreateProjectDetails(Object.fromEntries(formData));

    setCurrentStatus(ORDER_STATUS.REMEDIATION);
  };

  // Cancel will show warning TODO: might remove in the future or enhance with modal
  const handleCancel = () => {
    navigate(-1);
    // if(isDirty) {
    //   const confirmed = window.confirm('Are you sure you want to cancel?');
    //   if (confirmed) {
    //     navigate(-1);
    //   }
    // } else {
    //   navigate(-1);
    // }
  };

  return (
    <form onSubmit={handleNewProject}>
      <div className="flex flex-col gap-6 mb-12">
        <div className="flex gap-10 justify-between">
          <div className="flex-grow basis-1/3">
            <FormRow
              required
              name="productName"
              value={data.commonDetails.productName}
              onChange={handleChange}
            >
              Project Name
            </FormRow>
          </div>
          <div className="flex-grow basis-1/3">
            <FormRow
              required
              name="productCode"
              value={data.commonDetails.productCode}
              onChange={handleChange}
            >
              Project Code
            </FormRow>
          </div>
          <div className="flex-grow basis-1/3">
            <FormRow
              disabled
              required
              name="type"
              key={data.commonDetails.productCategory}
              selected={data.commonDetails.productCategory}
              value={data.commonDetails.type}
              onChange={handleChange}
            >
              Type
            </FormRow>
          </div>
        </div>
        <div className="flex gap-10 justify-between">
          <div className="flex-grow basis-1/2">
            <FormRow
              required
              name="MRP"
              value={String(data.commonDetails.MRP)}
              onChange={handleChange}
            >
              MRP
            </FormRow>
          </div>
          <div className="flex-grow basis-1/2">
            <FormRow
              required
              name="purchasePrice"
              value={String(data.commonDetails.purchasePrice)}
              onChange={handleChange}
            >
              Purchase Price
            </FormRow>
          </div>
        </div>

        <div className="flex gap-10 justify-between">
          <div className="flex-grow basis-1/2">
            <FormRow
              required
              variant="select"
              name="productCategory"
              value={data.commonDetails.productCategory}
              onChange={handleChange}
              data={["OSS Project", "ML Model"]}
            >
              Product Category
            </FormRow>
          </div>
          <div className="flex-grow basis-1/2">
            <FormRow
              required
              name="productSubcategory1"
              value={data.commonDetails.productSubcategory1}
              onChange={handleChange}
            >Product Sub Category
            </FormRow>
          </div>
        </div>

        <div>
          <FormRow
            name="description"
            value={data.commonDetails.description}
            onChange={handleChange}
          >
            Description
          </FormRow>
        </div>
        <div>
          <FormRow
            required
            variant="MD"
            name="longDescription"
            value={data.commonDetails.longDescription}
            onChange={handleChange}
          >
            Description Details
          </FormRow>
        </div>
      </div>

      <footer className="flex justify-end gap-4">
        <Button type="button" onClick={handleCancel}>
          Cancel
        </Button>
        <Button type="submit">Next</Button>
      </footer>
    </form>
  );
};

export default CreateStepProjectDetails;
