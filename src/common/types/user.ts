export interface UserContacts {
    email: string;
    phone: string;
}

export interface UserData {
    firstName: string;
    lastName: string;
    age: number;
    position: string;
    contacts: UserContacts;
    bio: string;
    photoUrl: string;
}