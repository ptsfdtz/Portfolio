"use client";
import styles from "./page.module.css";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Atom } from "./components";

export default function Home() {
  // 中文打字机文本
  const fullText =
    "欢迎访问我的个人网站！在这里你可以看到我的工作经历，个人技能，以及一些项目经验。推门进来吧，此处永远备着一份舍不得褪去的热枕和未写完的下一行 <>";
  const [displayedText, setDisplayedText] = useState("");

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      setDisplayedText(fullText.slice(0, index));
      index++;
      if (index > fullText.length) clearInterval(interval);
    }, 50);

    return () => clearInterval(interval);
  }, []);

  return (
    // Tailwind 负责外边距与响应式布局；视觉/排版由 module.css 控制（微动画）
    <div className={`px-6 py-12`}>
      <section className="max-w-6xl mx-auto lg:flex lg:items-center lg:gap-12">
        <div className="lg:w-7/12">
          {/* 主标题淡入，标题样式由 module.css 管理 */}
          <motion.h1
            initial={{ opacity: 0, y: 26 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className={`text-5xl lg:text-6xl font-extrabold mb-30 text-gray-900 font-sans ${styles.fadeIn}`}
          >
            Welcome👋
          </motion.h1>

          {/* 打字机文字（副标题） */}
          <motion.p
            className={`text-lg lg:text-xl text-gray-700 max-w-xl font-sans ${styles.fadeIn}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            {displayedText}
            <motion.span
              animate={{ opacity: [0, 1, 0] }}
              transition={{ repeat: Infinity, duration: 1 }}
              className={styles.cursor}
            />
          </motion.p>
        </div>

        <div className="lg:w-5/12 flex justify-center items-center mt-10 lg:mt-0">
          {/* 使用内联 SVG 动画组件替换静态插图 */}
          <div className={styles.illustration}>
            <Atom />
          </div>
        </div>
      </section>
    </div>
  );
}
