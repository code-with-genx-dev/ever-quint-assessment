import moment from "moment"
import { useEffect, useState } from "react"

interface timeIndicatorProps {
    pageTitle?: string
}
const TimeIndicator: React.FC<timeIndicatorProps> = ({ pageTitle }) => {
    const [time, setTime] = useState<Date | null>();

    function sessionIndicator(time: Date | null) {
        const hour:any = time?.getHours()
        if (hour >= 5 && hour < 12) return "Morning 🌅";
        if (hour >= 12 && hour < 15) return "Afternoon ☀️";
        if (hour >= 15 && hour < 17) return "Evening 🌇";
        return "Night 🌙";
    }

    useEffect(() => {
        const interval = setInterval(() => {
            const now = new Date();
            setTime(now);
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div>
            <p className="text-[14px] font-semibold text-[#222]">Hello User Good<span>{sessionIndicator(new Date())}</span></p>
            <p className="text-[12px] text-[#222]">{moment(time).format('MMMM Do YYYY, h:mm:ss a')}</p>
        </div>
    )
}

export default TimeIndicator