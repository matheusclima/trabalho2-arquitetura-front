import BandsPage from "@/components/bands";

export default async function Home() {
  return (
    <div className="h-screen flex justify-center py-10 px-40">
      <BandsPage />
    </div>
  );
}
