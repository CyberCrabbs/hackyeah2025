import MapComponent from "./MapComponent";

export default function Modal({ isOpen, setIsOpen, event }) {
  console.log(event);
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      {isOpen && (
        <div className="fixed inset-0  bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-xl p-6 relative  w-[900px]">
            <h2 className="text-xl font-semibold mb-4">{event.title}</h2>
            <p className="text-gray-600 mb-6">{event.description}</p>
            <div>
              <MapComponent marks={[event]} />
            </div>
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setIsOpen(false)}
                className="px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-100"
              >
                Anuluj
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                OK
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
