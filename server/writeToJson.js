const fs = require('fs');

export default function writeToJson(users) {
    fs.writeFileSync('./users.json', JSON.stringify(users, null, 2));
    console.log('Updated users.json!');
}
