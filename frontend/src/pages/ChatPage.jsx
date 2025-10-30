import { useChatStore } from "../store/useChatStore";

import BorderAnimatedContainer from "../components/BorderAnimatedContainer";
import ProfileHeader from "../components/ProfileHeader";
import ActiveTabSwitch from "../components/ActiveTabSwitch";
import ChatsList from "../components/ChatsList";
import ContactList from "../components/ContactList";
import ChatContainer from "../components/ChatContainer";
import NoConversationPlaceholder from "../components/NoConversationPlaceholder";

function ChatPage() {
  const { activeTab, selectedUser, setSelectedUser } = useChatStore();

  return (
    <div className="relative w-full h-[100dvh] md:h-[800px] max-w-6xl mx-auto">
      {/* Mobile full-screen chat overlay */}
      {selectedUser && (
        <div className="fixed inset-0 z-20 bg-slate-900 md:hidden">
          <div className="flex flex-col h-full">
            {/* Back button for mobile */}
            <div className="md:hidden flex items-center px-4 py-2 border-b border-slate-700">
              <button onClick={() => setSelectedUser(null)} className="text-sm">
                ← Back
              </button>
              <span className="mx-auto font-medium">{selectedUser.fullName}</span>
            </div>
            <ChatContainer />
          </div>
        </div>
      )}

      <BorderAnimatedContainer>
        <div className="flex h-full w-full overflow-hidden">
          
          {/* LEFT SIDE - Chat/Contacts List */}
          <div
            className={`
              bg-slate-800/50 backdrop-blur-sm flex flex-col transition-all
              w-full md:w-80
              ${selectedUser ? "hidden md:flex" : "flex"}
            `}
          >
            <ProfileHeader />
            <ActiveTabSwitch />

            <div className="flex-1 overflow-y-auto p-4 space-y-2">
              {activeTab === "chats" ? <ChatsList /> : <ContactList />}
            </div>
          </div>

          {/* RIGHT SIDE - Chat Area */}
          <div
            className={`
              flex-1 bg-slate-900/50 backdrop-blur-sm flex flex-col
              ${!selectedUser ? "hidden md:flex" : "hidden md:flex"}
            `}
          >
            {/* Back button for mobile */}
            {selectedUser && (
              <div className="md:hidden flex items-center px-4 py-2 border-b border-slate-700">
                <button
                  onClick={() => setSelectedUser(null)}
                  className="text-sm"
                >
                  ← Back
                </button>
                <span className="mx-auto font-medium">
                  {selectedUser.fullName}
                </span>
              </div>
            )}

            {selectedUser ? (
              <ChatContainer />
            ) : (
              <NoConversationPlaceholder />
            )}
          </div>

        </div>
      </BorderAnimatedContainer>
    </div>
  );
}

export default ChatPage;
