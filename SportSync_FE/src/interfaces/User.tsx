
import Rating from './Rating';

interface User {
    id: number;
    rating: Rating;
    username: string;
    emailAddress: string;
    password: string;
    firstName: string;
    lastName: string;
    birthDate: string;
    phoneNumber: string;
    foot: string;
    position: string;
    profilePicturePath: string;
    token: string;
    isConfirmed: boolean;
    createdAt: string;
}

export default User;
