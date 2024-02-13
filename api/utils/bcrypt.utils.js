const bcrypt = require('bcrypt');

async function encryptPassword(password) {
  try {
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    const hashedPassword = await bcrypt.hash(password, salt);

    return hashedPassword;
  } catch (error) {
    console.error('Error encrypting password:', error);
    throw error;
  }
}

async function comparePasswords(plainPassword, hashedPassword) {
  try {
    const match = await bcrypt.compare(plainPassword, hashedPassword);
    
    return match;
  } catch (error) {
    console.error('Error comparing passwords:', error);
    throw error;
  }
}

module.exports = {
  encryptPassword,
  comparePasswords
};