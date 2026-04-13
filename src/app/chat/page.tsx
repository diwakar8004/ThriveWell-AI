import Navbar from "@/components/Navbar";
import ChatWindow from "@/components/chat/ChatWindow";

export default function ChatPage() {
  return (
    <div className="flex flex-col min-h-dvh bg-[#FDFBF7]">
      <Navbar />
      <main className="flex-1 flex flex-col min-h-0 px-2 py-2 sm:p-4 md:p-6 lg:p-8 sm:py-4 md:py-6 lg:py-8">
        <div className="flex-1 flex justify-stretch min-h-0 w-full max-w-4xl mx-auto">
          <ChatWindow />
        </div>
      </main>
    </div>
  );
}
