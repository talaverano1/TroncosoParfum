import Navbar from "@/app/components/layout/Navbar";
import Footer from "@/app/components/layout/Footer";
import NosotrosClient from "./NosotrosClient";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Nosotros | Troncoso Perfumes",
  description: "La esencia de Mendoza convertida en perfume. Conocé la historia detrás de nuestras fragancias de alta concentración.",
};

export default function NosotrosPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[#0A0A0A] pt-28 pb-12 overflow-hidden">
        <NosotrosClient />
      </main>
      <Footer />
    </>
  );
}
