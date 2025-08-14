import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import handleScroll from "../handleScroll";

const useHomeLogic = () => {
  const NoSSRWaitlist = dynamic(
    () => import("@/components/sections/Waitlist"),
    { ssr: false }
  );
  const router = useRouter();
  const menu = [
    {
      title: "About",
      action: () => handleScroll("climate-change"),
    },
    {
      title: "For Businesses",
      action: () => router.push("/business"),
    },
  ];
  return { NoSSRWaitlist, menu };
};

export default useHomeLogic;
