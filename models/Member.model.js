// models/Member.model.js

class Member {
  constructor(
    id,
    name,
    surname,
    email,
    username,
    password,
    createdAt,
    isActive,
    isDeleted,
    satisElemaniKodu,
    yoneticiId
  ) {
    this.id = id;
    this.name = name;
    this.surname = surname;
    this.email = email;
    this.username = username;
    this.password = password;
    this.createdAt = createdAt;
    this.isActive = isActive;
    this.isDeleted = isDeleted;
    this.satisElemaniKodu = satisElemaniKodu;
    this.yoneticiId = yoneticiId;
  }
}

module.exports = Member;
