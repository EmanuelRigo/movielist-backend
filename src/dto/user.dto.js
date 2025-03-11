class UserDTO {
  constructor(data) {
    this.username = data.username;
    this.password = data.password;
    this.firstname = data.firstname;
    this.lastname = data.lastname;
    this.email = data.email;
    this.role = data.role || "user";
    this.verifyUser = data.verifyUser || false;
    this.verifyCode = data.verifyCode || "";
    this.isOnline = data.isOnline || false
  }
}

export default UserDTO;