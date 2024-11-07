import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Muted } from "@/components/ui/typography";

const MyProjectDisucssion = () => {
  return (
    <Card className="p-5 mb-7">
      <div className="w-full px-5 py-5 bg-stone-100 mb-4 rounded-lg">
        <Muted>No comment yet.</Muted>
      </div>
      <Button>Add Comment</Button>
    </Card>
  );
};

export default MyProjectDisucssion;
