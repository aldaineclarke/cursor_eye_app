export class User {
    constructor(
        public _id? : string,
        public firstName? : string, 
        public lastName? : string, 
        public email? : string, 
        public password? : string,
        public confirmPassword? : string,
        // public profileImage? : string | File,
        // public otp?: string
    ) {}
}