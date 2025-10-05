import identities from "../data/identities";
import { useNavigate, Link } from "react-router";

export default function IdentityCard({ id, message, details }) {
  let navigate = useNavigate();

  const identity = identities.find((item) => item.id === Number(id));

  if (!identity) {
    return <div>Identity not found</div>;
  }

  const { name, photo, number, email, type } = identity;

  return (
    <div
      key={id}
      className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow" 
      style={{marginBottom: "10px"}}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="w-20 h-20 rounded-full overflow-hidden flex-shrink-0" style={{ marginRight: "15px" }}>
            <img
              src={photo}
              alt="Profile"
              className="object-cover w-full h-full"
            />
          </div>
          <div className="min-w-0">
            <h3 className="font-semibold text-gray-900 truncate">{name}</h3>
            {type && (
              <p className="font-semibold text-sm text-gray-600 truncate">{type}</p>
            )}
            {details && (
              <>
                <p className="text-sm text-gray-600 truncate">{email}</p>
                <p className="text-sm text-gray-600 truncate">{number}</p>
              </>
            )}
          </div>
        </div>
        {message && (
          <button className="text-[#9B174A] font-bold" onClick={() => navigate("/chat")}>Napisz</button>

        )}
      </div>
    </div>
  );
}
