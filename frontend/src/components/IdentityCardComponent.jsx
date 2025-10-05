import identities from "../data/identities";

export default function IdentityCard({ id }) {
  const identity = identities.find((item) => item.id === Number(id));

  if (!identity) {
    return <div>Identity not found</div>;
  }

  const { name, photo, number, email, organization } = identity;

  return (
    <div
      key={id}
      className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
    >
      <div className="flex items-start space-x-3">
        <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
          <img
            src={photo}
            alt="Profile"
            className="object-cover w-full h-full"
          />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-1">
            <h3 className="font-semibold text-gray-900 truncate">{name}</h3>
          </div>
          {organization && (<p className="text-sm text-gray-600 truncate mb-1">{organization}</p>)}
          <p className="text-sm text-gray-600 truncate mb-1">{email}</p>
          <p className="text-sm text-gray-600 truncate">{number}</p>
        </div>
      </div>
    </div>
  );
}
