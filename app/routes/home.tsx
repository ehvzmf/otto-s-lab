import type { Route } from "./+types/home";
import { Header } from "../components/Header";
import { StockTable } from "../components/StockTable";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Otto's Lab - 주식 투자 분석" },
    { name: "description", content: "Otto's Lab 주식 투자 포트폴리오 관리 시스템" },
  ];
}

export default function Home() {
  return (
    <div>
      <Header />
      <StockTable />
    </div>
  );
}
