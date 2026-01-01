// Gender constants
const GENDER = {
  PRIA: "Pria",
  WANITA: "Wanita",
};

// Relationship types
const RELATIONSHIP_TYPES = {
  AYAH: "ayah",
  IBU: "ibu",
  ANAK: "anak",
  PASANGAN: "pasangan",
  SAUDARA: "saudara",
  MANTAN: "mantan",
  PARENT: "parent",
  SPOUSE: "spouse",
  SIBLING: "sibling",
  CHILD: "child",
  CUSTOM: "custom",
};

// HTTP Status Codes
const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
};

// User Roles
const USER_ROLE = {
  ADMIN: "admin",
  USER: "user",
};

// Privacy Types for Family/Silsilah
const PRIVACY_TYPE = {
  PUBLIC: "PUBLIC",
  PRIVATE: "PRIVATE",
};

// Member Status
const MEMBER_STATUS = {
  ALIVE: "ALIVE",
  DECEASED: "DECEASED",
};

// Direction types for relationships
const RELATIONSHIP_DIRECTION = {
  MOTHER: "mother",
  FATHER: "father",
  CHILD: "child",
  SPOUSE: "spouse",
  BOTH: "both",
};

// Generation markers
const GENERATION = {
  ROOT: 0,
  CHILDREN: 1,
  GRANDCHILDREN: 2,
  GREAT_GRANDCHILDREN: 3,
};

module.exports = {
  GENDER,
  RELATIONSHIP_TYPES,
  HTTP_STATUS,
  USER_ROLE,
  PRIVACY_TYPE,
  MEMBER_STATUS,
  RELATIONSHIP_DIRECTION,
  GENERATION,
};
