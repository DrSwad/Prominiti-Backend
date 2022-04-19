const status = {
  BAD_REQUEST: 400, // Client-side input fails validation
  UNAUTHORIZED: 401, // User isn't authenticated
  FORBIDDEN: 403, // User is authenticated, but not allowed to access the resource
  NOT_FOUND: 404, // Resource not found
};

export default {
  UNRECOGNIZED: {
    status: status.BAD_REQUEST,
    message:
      "Error processing the request in server! Kindly inform the admins to resolve the issue.",
  },
  BAD_FIELD: {
    status: status.BAD_REQUEST,
    message:
      "Invalid input! Kindly make sure to fill up all of the required input fields.",
  },
  UNAUTHORIZED: {
    status: status.UNAUTHORIZED,
    message: "Kindly signin to proceed.",
  },
  FORBIDDEN: {
    status: status.FORBIDDEN,
    message: "You're not authorized to perform the action.",
  },
  SIGNUP_FIELD: {
    status: status.BAD_REQUEST,
    message:
      "Invalid inputs! Kindly make sure to fill up all of the required input fields.",
  },
  SIGNIN_FIELD: {
    status: status.BAD_REQUEST,
    message:
      "Invalid inputs! Kindly make sure to fill up all of the required input fields.",
  },
  USER_NOT_FOUND: {
    status: status.NOT_FOUND,
    message: "No user found matching the provided credentials.",
  },
  REMOVING_SOLE_ADMIN: {
    status: status.FORBIDDEN,
    message: "Cannot remove the only remaining admin.",
  },
  FORGOTPWD_ENTRY_NOT_FOUND: {
    status: status.NOT_FOUND,
    message:
      "The user with the provided credentials did not made any request to reset password.",
  },
  FORGOTPWD_UNAUTHORIZED: {
    status: status.UNAUTHORIZED,
    message:
      "Verification code doesn't match, the code might have been expired. Kindly send another request to" +
      " reset your password and follow the new instructions sent to your email.",
  },
  CONFIRM_PWD_FAILED: {
    status: status.UNAUTHORIZED,
    message:
      "Passwords don't match! Kindly type the new password carefully in the input fields to make sure" +
      " they match.",
  },
  AVATAR_TOO_LARGE: {
    status: status.BAD_REQUEST,
    message: "File too large! Kindly make sure the file size is within 5MB.",
  },
  AVATAR_DIMENSION_TOO_SMALL: {
    status: status.BAD_REQUEST,
    message:
      "Image dimension too small. The image is probably clipped too much.",
  },
};
