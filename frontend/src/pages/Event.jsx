import Layout from "../layout/Layout";
import { useParams } from "react-router-dom";
import events from "../data/events";
import identities from "../data/identities";
import SimpleMapComponent from "../components/SimpleMapComponent";
import IdentityCard from "../components/IdentityCardComponent";
import { Star, MessageSquare, User, Info, Landmark } from "lucide-react";
import { useState } from "react";

export default function Event() {
    const { id } = useParams();
    const [comment, setComment] = useState("");
    const event = events.find((e) => e.id === Number(id)) || events.find((e) => e.id === 0);

    return (
        <Layout>
            <div className="min-h-screen bg-gray-50">
                <div className="relative rounded-2xl p-8 m-4 rounded-xl text-white overflow-hidden" style={{ background: "linear-gradient(135deg, #a17aadff 0%, #728ad8ff 33%, #14ac00a4 65%, #ffee00ff 100%)" }}>
                    <h1 className="text-3xl font-bold relative z-10">{event.name}</h1>
                    <p className="mt-2 relative z-10">{event.description}</p>
                    <div className="absolute right-0 top-0 h-full"
                        style={{
                            width: "400px",
                            backgroundImage: "url('https://i.imgur.com/hUkN5hD.png')",
                            backgroundSize: "100% auto",
                            backgroundPosition: "center",
                            backgroundRepeat: "no-repeat",
                            maskImage: "linear-gradient(to right, transparent, black 50%)",
                            WebkitMaskImage: "linear-gradient(to right, transparent, black 50%)", opacity: 0.95,
                        }}
                    ></div>
                </div>

                <div className="p-8 grid grid-cols-1 lg:grid-cols-12 gap-8 -mt-20 relative z-20" style={{ marginTop: "1rem" }}>
                    <div className="lg:col-span-4 space-y-6 ">
                        <SimpleMapComponent latitude={event.latitude} longitude={event.longitude} zoom={17} />
                    </div>
                    <div className="lg:col-span-4 space-y-6 ">
                        <div className="bg-gradient-to-r from-[#f2f5fc] via-[#f7f5ff] to-[#fff0f8] rounded-xl shadow-lg p-6 flex flex-col justify-between" style={{ marginBottom: "20px" }}>
                            <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
                                <Info className="w-6 h-6 mr-3 text-purple-500" />
                                Informacje o wydarzeniu
                            </h2>
                            <h3 className="text-gray-800 mb-3">
                                <span className="font-semibold">Data: </span>
                                {new Date(event.date).toLocaleDateString('pl-PL', { day: 'numeric', month: 'long', year: 'numeric' })}
                            </h3><h3 className="text-gray-800 mb-3"><span className="font-semibold">Czas trwania: </span> {event.duration}</h3>
                        </div>
                        <div className="bg-gradient-to-r from-[#f2f5fc] via-[#f7f5ff] to-[#fff0f8] rounded-xl shadow-lg p-6 flex flex-col justify-between" style={{ marginBottom: "20px" }}>
                            <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
                                <Landmark className="w-6 h-6 mr-3 text-green-500" />
                                Organizator
                            </h2>
                            <IdentityCard id={event.organizer} details={true} message={true}></IdentityCard>
                            <div className="text-right mt-3">
                                <span className="text-sm text-gray-500 italic">Zaufany od 2020 roku</span>
                            </div>
                        </div>
                    </div>

                    <div className="lg:col-span-4 space-y-6 ">
                        <div className="bg-gradient-to-r from-[#f2f5fc] via-[#f7f5ff] to-[#fff0f8] rounded-xl shadow-lg p-6 flex flex-col justify-between" style={{ marginBottom: "20px" }}>
                            <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
                                <User className="w-6 h-6 mr-3 text-blue-500" />
                                Uczestnicy
                            </h2>
                            {event.members.map((member) => (
                                <IdentityCard id={member} details={true} message={true}></IdentityCard>
                            ))}
                        </div>
                    </div>
                </div>
                {/* Comment Section */}
                <div className="px-8 pb-8">
                    <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 bg-gradient-to-r from-[#f2f5fc] via-[#f7f5ff] to-[#fff0f8]">
                        <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
                            <MessageSquare className="w-6 h-6 mr-3 text-green-500" />
                            Zostaw komentarz o wolontariuszu
                        </h2>

                        <div className="space-y-4">
                            <div>
                                <label htmlFor="comment" className="block text-sm font-medium text-gray-700 mb-2">
                                    Twój komentarz
                                </label>
                                <textarea
                                    id="comment"
                                    value={comment}
                                    onChange={(e) => setComment(e.target.value)}
                                    placeholder="Podziel się swoimi przemyśleniami o współpracy z tym wolontariuszem..."
                                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none transition-all duration-200 bg-gradient-to-r from-gray-50 to-white"
                                    rows="4"
                                />
                            </div>

                            <div className="flex justify-between items-center">
                                <span className="text-sm text-gray-500">
                                    {comment.length}/500 znaków
                                </span>
                                <button
                                    onClick={() => {
                                        if (comment.trim()) {
                                            alert('Komentarz został wysłany!');
                                            setComment('');
                                        }
                                    }}
                                    className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white px-6 py-2 rounded-xl shadow-lg transition-all duration-200 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                                    disabled={!comment.trim()}
                                >
                                    Wyślij komentarz
                                </button>
                            </div>

                            {/* Sample comments */}
                            <div className="mt-6 pt-6 border-t border-gray-200">
                                <h3 className="text-lg font-semibold text-gray-800 mb-4">Poprzednie komentarze</h3>
                                <div className="space-y-4">
                                    <div className="bg-gradient-to-r from-gray-50 to-white p-4 rounded-xl border border-gray-100">
                                        <div className="flex items-center justify-between mb-2">
                                            <div className="flex items-center">
                                                <img
                                                    src="https://randomuser.me/api/portraits/women/1.jpg"
                                                    alt="Anna Kowalska"
                                                    className="w-8 h-8 rounded-full mr-3"
                                                />
                                                <span className="font-medium text-gray-800">Anna Kowalska</span>
                                                <span className="ml-2 text-sm text-gray-500">Koordynator</span>
                                            </div>
                                            <div className="flex items-center text-yellow-600">
                                                <Star className="w-4 h-4 mr-1 fill-current" />
                                                <span className="text-sm">4.9</span>
                                            </div>
                                        </div>
                                        <p className="text-gray-600 text-sm">
                                            Alec to fantastyczny wolontariusz! Bardzo zaangażowany, punktualny i pomocny. Jego pozytywne nastawienie motywuje całą grupę.
                                        </p>
                                        <span className="text-xs text-gray-400 mt-2 block">2 dni temu</span>
                                    </div>

                                    <div className="bg-gradient-to-r from-gray-50 to-white p-4 rounded-xl border border-gray-100">
                                        <div className="flex items-center justify-between mb-2">
                                            <div className="flex items-center">
                                                <img
                                                    src="https://randomuser.me/api/portraits/men/4.jpg"
                                                    alt="Piotr Nowak"
                                                    className="w-8 h-8 rounded-full mr-3"
                                                />
                                                <span className="font-medium text-gray-800">Piotr Nowak</span>
                                                <span className="ml-2 text-sm text-gray-500">Organizacja</span>
                                            </div>
                                            <div className="flex items-center text-yellow-600">
                                                <Star className="w-4 h-4 mr-1 fill-current" />
                                                <span className="text-sm">4.8</span>
                                            </div>
                                        </div>
                                        <p className="text-gray-600 text-sm">
                                            Profesjonalne podejście i doskonała komunikacja. Alec świetnie sprawdził się podczas Festiwalu Równości.
                                        </p>
                                        <span className="text-xs text-gray-400 mt-2 block">1 tydzień temu</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
}
