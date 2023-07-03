export const metadata = {
  title: "Drawing-io",
  description: "A simple drawing app",
  url: "https://drawing-io.vercel.app",
  image: "https://drawing-io.vercel.app/images/og.png",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className=" heropattern-fourpointstars-gray-300 dark:heropattern-fourpointstars-gray-600">
      {children}
    </div>
  );
}
