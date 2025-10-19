export class User {
    constructor(
        public _id? : string,
        public first_nm? : string, 
        public last_nm? : string, 
        public email? : string, 
        public password? : string,
        public confirmPassword? : string,
        // public profileImage? : string | File,
        // public otp?: string
    ) {}
}