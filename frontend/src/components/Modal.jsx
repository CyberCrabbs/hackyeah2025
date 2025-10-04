import { useState } from "react";

export default function Modal({isOpen, setIsOpen, event}) {
//   const [isOpen, setIsOpen] = useState(false);
console.log(event);
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      {/* <button
        onClick={() => setIsOpen(true)}
        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
      >

      allDay
: 
false
description
: 
"Big coding event."
end
: 
Mon Oct 06 2025 23:34:25 GMT+0200 (Central European Summer Time) {}
id
: 
undefined
start
: 
Sun Oct 05 2025 23:34:25 GMT+0200 (Central European Summer Time) {}
title
: 
"Hackathon 2025"
        Otwórz modal
      </button> */}

      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-xl p-6 w-96 relative ">
            <h2 className="text-xl font-semibold mb-4">{event.title}</h2>
            <p className="text-gray-600 mb-6">
              {event.description}
            </p>
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
