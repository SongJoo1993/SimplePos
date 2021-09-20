const existingUsers = [
    {
        id: 1,
        first_name: "song",
        last_name: "joo",
        email: "songjoo29@gmail.com",
        password: 1234,
        phone: "647-829-3936",
        address: "71 Olive Ave",
    },
    {
        id: 2,
        first_name: "hyun joon",
        last_name: "kim",
        email: "hjoon12@gmail.com",
        password: 5678,
        phone: "647-981-0012",
        address: "90 Olive Ave",
    },
]

exports.seed = function(knex) {
    return knex("users")
    .del()
    .then(() => {
        return knex("users").insert(existingUsers);
    })
};