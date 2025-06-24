import { useEffect, useState } from "react";

export default function StatusConnection() {
  const [online, setOnline] = useState(navigator.onLine);

  useEffect(() => {
    const updateOnlineStatus = () => {
      setOnline(navigator.onLine);
    };

    window.addEventListener("online", updateOnlineStatus);
    window.addEventListener("offline", updateOnlineStatus);

    return () => {
      window.removeEventListener("online", updateOnlineStatus);
      window.removeEventListener("offline", updateOnlineStatus);
    };
  }, []);

  return (
    <div
      className={`fixed bottom-4 right-4 px-4 py-2 rounded shadow-lg text-white text-sm ${
        online ? "bg-green-600" : "bg-red-600"
      }`}
    >
      {online ? "Conectado à internet" : "Sem conexão"}
    </div>
  );
}
