import Steps from "app/components/Home/Steps";
import ActionBar from "app/components/shared/ActonBar";

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="w-full overflow-auto pb-44 pt-5 flex flex-col items-center justify-center relative">
      <Steps />
      <div className="border border-colorBorder rounded-sm w-full min-h-24 mt-16 p-4">
        {children}
      </div>
      <ActionBar />
    </main>
  );
}
