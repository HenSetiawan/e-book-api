import bcrypt from 'bcrypt'

async function hashString(str) {
  const saltRounds = 10;
  try {
    const hashedStr = await bcrypt.hash(str, saltRounds);
    return hashedStr;
  } catch (error) {
    console.error("Error:", error);
    throw new Error("Hashed failed");
  }

}

async function verifyHashed(plainStr, hashedStr) {
  try {
    const match = await bcrypt.compare(plainStr, hashedStr);
    return match;
  } catch (error) {
    console.error("Error verifying password:", error);
    throw new Error("Verification failed");
  }
}

export { hashString,verifyHashed };