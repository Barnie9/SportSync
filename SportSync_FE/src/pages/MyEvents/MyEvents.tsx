
// CSS
import MyEventsCSS from "./MyEvents.module.css";

// Components
import Menu from "../../components/Menu/Menu";

interface Props {
    onChangeUsername: (username: string) => void;
}

function MyEvents({ onChangeUsername }: Props) {
    return (
        <div className={MyEventsCSS.page}>
            <Menu selectedPage="My Events" onChangeUsername={onChangeUsername} />
        </div>
    );
}

export default MyEvents;
