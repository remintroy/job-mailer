import style from "./auth.module.scss";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Authentication",
  description: "Job mailer Mail you company now",
};

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <section lang="en">
      <div className={style.body}>{children}</div>
    </section>
  );
}
