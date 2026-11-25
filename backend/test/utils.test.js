// Unit tests for backend helper functions (Node's built-in test runner, no extra packages)
const test = require("node:test")
const assert = require("node:assert")
const { generateOTP } = require("../utils/GenerateOtp")
const { sanitizeUser } = require("../utils/SanitizeUser")

test("generateOTP returns a 4-digit string", () => {
  for (let i = 0; i < 100; i++) {
    const otp = generateOTP()
    assert.strictEqual(typeof otp, "string")
    assert.match(otp, /^\d{4}$/)
  }
})

test("sanitizeUser keeps only safe fields and drops the password", () => {
  const user = { _id: "1", email: "a@b.com", password: "hashed", isVerified: true, isAdmin: false, name: "x" }
  assert.deepStrictEqual(sanitizeUser(user), { _id: "1", email: "a@b.com", isVerified: true, isAdmin: false })
})
