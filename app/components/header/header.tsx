"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import styles from "./header.module.css";
import { MdLightMode, MdDarkMode } from "react-icons/md";
import { IoPeopleCircle, IoPeopleCircleOutline } from "react-icons/io5";
import { FaLink } from "react-icons/fa";
import { IoIosSend } from "react-icons/io";
import Link from "next/link";

function Header() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  const toggleTheme = () => {
    const next = theme === "dark" ? "light" : "dark";
    if (
      typeof document !== "undefined" &&
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (document as any).startViewTransition
    ) {
      try {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (document as any).startViewTransition(() => setTheme(next));
      } catch {
        setTheme(next);
      }
    } else {
      setTheme(next);
    }
  };

  if (!mounted) return <header className={styles.header} />;

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.title}>
          {theme === "dark" ? (
            <IoPeopleCircle size={35} />
          ) : (
            <IoPeopleCircleOutline size={35} />
          )}
          主页
        </div>
        <Link href="/" className={styles.item}>
          个人介绍
        </Link>
        <Link href="/projects" className={styles.item}>
          我的项目
        </Link>
        <Link href="/link" className={styles.item}>
          <FaLink size={20} /> 友链
        </Link>
        <Link href="/send" className={styles.item}>
          <IoIosSend size={25} /> 联系我
        </Link>
        <div className={styles.actions}>
          <button
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className={styles.btn}
          >
            {theme === "dark" ? (
              <MdDarkMode size={30} />
            ) : (
              <MdLightMode size={30} />
            )}
          </button>
        </div>
      </div>
    </header>
  );
}

export { Header };
