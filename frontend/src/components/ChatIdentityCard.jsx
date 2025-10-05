import identities from "../data/identities";

export default function ChatIdentityCard({ id, details = false }) {
  const identity = identities.find((item) => item.id === Number(id));

  if (!identity) {
    return <div>Identity not found</div>;
  }

  const { name, photo, number, email, type } = identity;

  // Generate realistic "last seen" times
  const getLastSeen = (id) => {
    const times = [
      "online", 
      "2 min temu", 
      "5 min temu", 
      "15 min temu", 
      "1 godz temu", 
      "3 godz temu", 
      "wczoraj", 
      "2 dni temu"
    ];
    // Use ID to consistently assign the same "last seen" time
    return times[id % times.length];
  };

  const lastSeen = getLastSeen(id);
  const isOnline = lastSeen === "online";

  return (
    <div
      key={id}
      className="border border-gray-200 rounded-lg p-3 hover:shadow-md transition-shadow bg-white"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="relative">
            <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
              <img
                src={photo}
                alt="Profile"
                className="object-cover w-full h-full"
              />
            </div>
            {/* Online status indicator */}
            {isOnline && (
              <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></div>
            )}
          </div>
          <div className="min-w-0 flex-1">
            <h3 className="font-semibold text-gray-900 truncate text-sm">{name}</h3>
            {type && (
              <p className="text-xs text-gray-500 truncate">{type}</p>
            )}
            {details && (
              <>
                <p className="text-xs text-gray-600 truncate">{email}</p>
                <p className="text-xs text-gray-600 truncate">{number}</p>
              </>
            )}
          </div>
        </div>
        
        {/* Last seen status */}
        <div className="text-right flex-shrink-0">
          <p className={`text-xs font-medium ${
            isOnline 
              ? "text-green-600" 
              : "text-gray-500"
          }`}>
            {lastSeen}
          </p>
          {/* Unread message indicator (optional) */}
          {id % 3 === 0 && !isOnline && (
            <div className="w-2 h-2 bg-blue-500 rounded-full mt-1 ml-auto"></div>
          )}
        </div>
      </div>
    </div>
  );
}