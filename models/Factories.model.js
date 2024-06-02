class Factories {
  // Id, Name, CreatedAt, Username, Password, LastLogin

  constructor(id, name, createdAt, username, password, lastLogin) {
    this.id = id;
    this.name = name;
    this.createdAt = createdAt || new Date();
    this.username = username || null;
    this.password = password || null;
    this.lastLogin = lastLogin || null;
  }

}

module.exports = Factories;