exports.seed = function (knex, Promise) {
  // Deletes ALL existing entries
  return knex("users")
    .del()
    .then(function () {
      // Inserts seed entries
      return knex("users").insert([
        {
          id: 1,
          email: "bob@email.com",
          password: "123",
        },
        {
          id: 2,
          email: "bobby@email.com",
          password: "456",
        },
        {
          id: 3,
          email: "bobb@email.com",
          password: "789",
        },
      ]);
    });
};
