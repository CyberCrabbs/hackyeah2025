import Layout from "layout/Layout";
import { useParams } from "react-router-dom";
import events from "../data/events";
import identities from "../data/identities";
import SimpleMapComponent from "../components/SimpleMapComponent";
import IdentityCard from "../components/IdentityCardComponent";

export default function Event() {
    const { id } = useParams();
    const event = events.find((e) => e.id === Number(id)) || events.find((e) => e.id === 0);

    return (
        <Layout>
            <div className="flex flex-col">
                <div className="bg-gradient-to-r from-[#2968AB] via-[#66A140] to-[#9B174A] p-8 m-4  rounded-xl text-white">
                    <h1 className="text-3xl font-bold">{event.name}</h1>
                    <p className="mt-2">{event.description}</p>
                </div>

                <div className="p-8 grid grid-cols-1 lg:grid-cols-12 gap-8 -mt-20 relative z-20" style={{ marginTop: "1rem" }}>
                        <div className="lg:col-span-4 space-y-6 ">
                        <SimpleMapComponent latitude={event.latitude} longitude={event.longitude} zoom={17} />
                    </div>
                    <div className="lg:col-span-4 space-y-6 ">
                        <div className="bg-gradient-to-r from-[#f2f5fc] via-[#f7f5ff] to-[#fff0f8] rounded-xl shadow-lg p-6 flex flex-col justify-between" style={{ marginBottom: "20px" }}>
                            <h2 className="text-2xl font-bold text-gray-800 mb-3">Informacje o wydarzeniu</h2>
                            <p className="text-lg text-gray-700">
                                <strong>Data:</strong> {new Date(event.date).toLocaleDateString('pl-PL', {
                                    day: 'numeric',
                                    month: 'long',
                                    year: 'numeric'
                                })}
                            </p>
                            <p className="text-lg text-gray-700"><strong>Czas trwania:</strong> {event.duration}</p>
                        </div>
                        <div className="bg-gradient-to-r from-[#f2f5fc] via-[#f7f5ff] to-[#fff0f8] rounded-xl shadow-lg p-6 flex flex-col justify-between" style={{ marginBottom: "20px" }}>
                            <h2 className="text-2xl font-bold text-gray-800 mb-3">Organizator</h2>
                            <IdentityCard id={event.organizer} details={true} message={true}></IdentityCard>
                            <div className="text-right mt-3">
                                <span className="text-sm text-gray-500 italic">Zaufany od 2020 roku</span>
                            </div>
                        </div>
                    </div>

                    <div className="lg:col-span-4 space-y-6 ">
                        <div className="bg-gradient-to-r from-[#f2f5fc] via-[#f7f5ff] to-[#fff0f8] rounded-xl shadow-lg p-6 flex flex-col justify-between" style={{ marginBottom: "20px" }}>
                            <h2 className="text-2xl font-bold text-gray-800 mb-3">Uczestnicy</h2>
                            {event.members.map((member) => (
                                <IdentityCard id={member} details={true} message={true}></IdentityCard>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
}
