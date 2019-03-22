const bcrypt = require('bcryptjs');

const myFunction = async ()=>{
    const password = 'Ram@0156';
    const hashedPassword = await bcrypt.hash(password,8);

    console.log(password);
    console.log(hashedPassword);
    const isMatch = await bcrypt.compare('Ram@0156',hashedPassword);
    console.log(isMatch)
}
myFunction();