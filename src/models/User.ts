export default interface User {
    [x: string]: any;
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    gender: string;
    isVerified: boolean;
    avatar: string;
    status: string;
}
