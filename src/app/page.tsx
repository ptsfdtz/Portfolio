import Home from "@/components/home";

export default function App() {
  const assets = {
    avatar: "/placeholders/avatar.svg",
    dog: "/placeholders/dog.svg",
    action: "/placeholders/action.svg",
    webagent: "/placeholders/webagent.svg",
    chatbot: "/placeholders/chatbot.svg",
    paper: "/placeholders/paper.svg",
    resume: "/resume",
  };

  const photos = ["/photos/photo-1.svg", "/photos/photo-2.svg", "/photos/photo-3.svg"];

  return (
    <Home
      actionImageUrl={assets.action}
      avatarUrl={assets.avatar}
      chatbotUrl={assets.chatbot}
      dogUrl={assets.dog}
      paperUrl={assets.paper}
      photos={photos}
      resumeUrl={assets.resume}
      webagentUrl={assets.webagent}
    />
  );
}
