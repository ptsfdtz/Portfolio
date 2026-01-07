import Home from "@/components/home";

export default function App() {
  const assets = {
    avatar: "/placeholders/avatar.jpg",
    dog: "/placeholders/avatar-1.svg",
    action: "/placeholders/LiteSound.png",
    liteMark: "/placeholders/LiteMark.png",
    chatbot: "/placeholders/physics-lab.png",
    paper: "/placeholders/coin-search.png",
    resume: "https://resume.ptsfdtz.top/",
  };

  const photos = [
    "/photos/001.jpg",
    "/photos/002.jpg",
    "/photos/003.jpg",
    "/photos/004.jpg",
    "/photos/005.jpg",
    "/photos/006.jpg",
    "/photos/007.jpg",
  ];

  return (
    <Home
      actionImageUrl={assets.action}
      avatarUrl={assets.avatar}
      chatbotUrl={assets.chatbot}
      dogUrl={assets.dog}
      liteMarkUrl={assets.liteMark}
      paperUrl={assets.paper}
      photos={photos}
      resumeUrl={assets.resume}
    />
  );
}
