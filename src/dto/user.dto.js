class UserDTO {
  constructor(data) {
    this.username = data.username;
    this.password = data.password;
    this.name = data.name;
    this.email = data.email;
    this.role = data.role || "user";
    this.verifyUser = data.verifyUser || false;
    this.verifyCode = data.verifyCode || "";
    this.isOnline = data.isOnline || false
  }
}

export default UserDTO;