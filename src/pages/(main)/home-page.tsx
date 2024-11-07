import { Badge } from "@/components/ui/badge";
import { TabsTrigger } from "@/components/ui/tabs";
import useAuthStore from "@/store/auth-store";
import { useEffect, type FC } from "react";
import { useNavigate } from "react-router-dom";
export const TabItem = ({
  title,
  badge,
  value,
}: { title: string; badge?: number; value: string }) => {
  return (
    <TabsTrigger
      value={value}
      className="flex items-center gap-0 md:gap-2 outline-none data-[state=active]:font-semibold data-[state=active]:border-black data-[state=active]:border-b-2 rounded-none !shadow-none overflow-auto max-w-screen p-1 md:p-4"
    >
      <span>{title}</span>
      {badge && <Badge variant={"secondary"}>{badge}</Badge>}
    </TabsTrigger>
  );
};

const HomePage: FC = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuthStore((state) => state);
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard");
    }
  }, [isAuthenticated, navigate])
  return <div>loading...</div>;
};

export default HomePage;
