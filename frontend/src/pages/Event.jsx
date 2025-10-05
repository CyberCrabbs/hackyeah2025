import Layout from "layout/Layout";
import { useParams } from "react-router-dom";
import events from "../data/events";
import identities from "../data/identities";
import SimpleMapComponent from "../components/SimpleMapComponent";
import IdentityCard from "../components/IdentityCardComponent";

export default function Event() {
    const { id } = useParams();
    const event = events.find((e) => e.id === Number(id));

    if (!event) return <Layout><div>Event not found</div></Layout>;

    var organizer = identities.find((e) => e.id == Number(event.organizer));
    
    if (!organizer) organizer = identities.find((e) => e.id == 14);

    return (
        <Layout>
            <div className="flex flex-col">
                <div className="bg-gradient-to-r from-[#2968AB] via-[#66A140] to-[#9B174A] p-8 m-4  rounded-xl text-white">
                    <h1 className="text-3xl font-bold">{event.name}</h1>
                    <p className="mt-2">{event.description}</p>
                </div>

                <div className="grid grid-cols-3 gap-4 m-4">
                    <div className="">
                        <SimpleMapComponent latitude={event.latitude} longitude={event.longitude} zoom={17} />
                    </div>
                    <div className="">
                        <div className="bg-gradient-to-r from-[#f2f5fc] via-[#ede9fe] to-[#fff0f8] rounded-xl shadow-lg p-6 flex flex-col justify-between" style={{ marginBottom: "20px" }}>
                            <h2 className="text-2xl font-bold text-gray-800 mb-3">Event Info</h2>
                            <p className="text-lg text-gray-700">
                                <strong>Data:</strong> {new Date(event.date).toLocaleDateString('pl-PL', {
                                    day: 'numeric',
                                    month: 'long',
                                    year: 'numeric'
                                })}
                            </p>

                            <p className="text-lg text-gray-700"><strong>Duration:</strong> {event.duration}</p>
                        </div>
                        <div className="bg-gradient-to-r from-[#f2f5fc] via-[#ede9fe] to-[#fff0f8] rounded-xl shadow-lg p-6 flex flex-col justify-between h-full" style={{ marginBottom: "20px" }}>
                            <div>
                                <h2 className="text-2xl font-bold text-gray-800 mb-3">Organizer Information</h2>

                                <p className="text-lg text-gray-700"><strong>Name:</strong> {organizer.name}</p>
                                <p className="text-lg text-gray-700"><strong>Email:</strong> {organizer.email}</p>

                                {organizer.organization && (
                                    <p className="text-lg text-gray-700"><strong>Organization:</strong> {organizer.organization}</p>
                                )}
                            </div>
                            <div className="text-right">
                                <span className="text-sm text-gray-500 italic">Trusted since 2020</span>
                            </div>
                        </div>
                    </div>

                    <div className="">
                        <div className="bg-gradient-to-r from-[#f2f5fc] via-[#ede9fe] to-[#fff0f8] rounded-xl shadow-lg p-6 flex flex-col justify-between" style={{ marginBottom: "20px" }}>
                            <h2 className="text-2xl font-bold text-gray-800 mb-3">Members</h2>
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
