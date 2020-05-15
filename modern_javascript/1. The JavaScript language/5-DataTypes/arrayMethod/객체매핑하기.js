let john = { name: "John", surname: "Smith", id: 1 };
let pete = { name: "Pete", surname: "Hunt", id: 2 };
let mary = { name: "Mary", surname: "Key", id: 3 };

let users = [john, pete, mary];

const mapUser = (user) => {
    return {
        fullName: user.name + " " + user.surname,
        id: user.id,
    };
};
let usersMapped = users.map((user) => mapUser(user));

/*
또는 요렇게 하면 된다
let usersMapped = users.map(user => ({
  fullName: `${user.name} ${user.surname}`,
  id: user.id
}));
*/
console.log(usersMapped[0].id); // 1
console.log(usersMapped[0].fullName); // John Smith
