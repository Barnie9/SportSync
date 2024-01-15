
import User from './User';

interface Event {
    id: number;
    organizer: User;
    title: string;
    description: string;
    startDate: string;
    startTime: string;
    endTime: string;
    location: string;
    fieldType: string;
    maxPlayers: number;
    price: number;
}

export default Event;
