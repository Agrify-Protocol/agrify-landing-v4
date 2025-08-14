import { useRouter } from "next/navigation";
import offsetGoals from "../../../public/images/offset-goals.png";
import supplyChains from "../../../public/images/supply-chain.png";
import localFarmers from "../../../public/images/local-farmers.png";
import handleScroll from "../handleScroll";

const useBusinessLogic = () => {
  const router = useRouter();
  const menu = [
    {
      title: "Solutions",
      action: () => handleScroll("solutions")
      ,
    },
    {
      title: "For Farmers",
      action: () => router.push("/"),
    },
  ];

  const solutions = [
    {
      title: "Offset Emissions and Meet Goals",
      text: "Achieve your sustainability targets through verified carbon offset projects that promote eco-friendly farming and carbon sequestration.",
      img: offsetGoals,
    },
    {
      title: "Decarbonize your Supply chain",
      text: "Source sustainably through Agrify, connecting with farms that integrate regenerative practices to reduce carbon footprints and support biodiversity.",
      img: supplyChains,
    },
    {
      title: "Empower Local Communites",
      text: "Support Agrify in uplifting local economies by backing farming practices that align with global sustainability and ESG standards",
      img: localFarmers,
    },
  ];
  return { menu, solutions, router };
};

export default useBusinessLogic;
