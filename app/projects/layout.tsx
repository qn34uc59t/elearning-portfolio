import Script from "next/script";

export default function ProjectsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div data-project-route="">
      <Script id="project-page-marker" strategy="beforeInteractive">
        {`document.documentElement.dataset.projectPage="true";`}
      </Script>
      {children}
    </div>
  );
}
