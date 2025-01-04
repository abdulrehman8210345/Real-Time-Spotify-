import UsersListSkeleton from "@/components/skeletons/UsersListSkeleton";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useChatStore } from "@/stores/useChatStore";

const UsersList = () => {
  const { selectedUser, setSelectedUser, users, isLoading, onlineUsers } =
    useChatStore();
   
  return (
    
    <div className="border-r border-zinc-800">
      <div className="flex flex-col h-full">
        <ScrollArea className="h-[calc(100vh-280px)]">
          <div className="space-y-2 lg:p-4 p-0">
            {isLoading ? (
              <UsersListSkeleton />
            ) : (
              users.map((user) => (
                <div
                  key={user.ClerkId}
                  onClick={() => setSelectedUser(user)}
                  className={`flex items-center justify-center lg:justify-start gap-3 p-3 
										rounded-lg cursor-pointer transition-colors ${
                      selectedUser?.ClerkId === user.ClerkId
                        ? "bg-zinc-800"
                        : "hover:bg-zinc-800/50"
                    }`}
                >
                  <div className="relative">
                    <Avatar className="lg:size-9 2xl:size-12 size-8">
                      <AvatarImage src={user.imageUrl} />
                      <AvatarFallback>{user.fullName[0]}</AvatarFallback>
                    </Avatar>
                    <div
                      className={`absolute bottom-0 right-0 2xl:h-3 2xl:w-3 lg:h-2 lg:w-2 rounded-full ring-2 ring-zinc-900
                        ${
                          onlineUsers.has(user.ClerkId)
                            ? "bg-green-500"
                            : "bg-zinc-500"
                        }`}
                    />
                  </div>
                  <div className='flex-1 min-w-0 lg:block hidden'>
                  <span className='font-medium 2xl:text-lg lg:text-sm truncate'>{user.fullName}</span>
                  </div>
                </div>
              ))
            )}
          </div>
        </ScrollArea>
      </div>
    </div>
  );
};

export default UsersList;
