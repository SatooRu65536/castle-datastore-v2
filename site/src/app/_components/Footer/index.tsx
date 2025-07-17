"use client";

import { usePathname } from "next/navigation";
import styles from "./index.module.scss";

export default function Footer() {
  const path = usePathname();
  const isHide = path === "/map";

  return (
    <footer className={isHide ? styles.hide : styles.footer}>
      <p>SatooRu © 2023 Copyright.</p>
    </footer>
  );
}
