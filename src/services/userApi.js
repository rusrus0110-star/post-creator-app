const API_BASE_URL = "https://699eb2fe78dda56d396b07da.mockapi.io/users";

// Проверка существования username
export const checkUsernameExists = async (username) => {
  try {
    console.log("=== CHECK USERNAME ===");
    console.log("Checking username:", username);
    console.log("API URL:", `${API_BASE_URL}?user=${username}`);

    const response = await fetch(`${API_BASE_URL}?user=${username}`);

    console.log("Response status:", response.status);

    // MockAPI возвращает 404 если ничего не найдено - это нормально
    if (response.status === 404) {
      console.log("404 - User not found (OK)");
      console.log("Username exists: false");
      console.log("======================");
      return false;
    }

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const users = await response.json();
    console.log("Found users:", users);
    console.log("Users count:", users.length);
    console.log("Username exists:", users.length > 0);
    console.log("======================");

    return users.length > 0;
  } catch (error) {
    console.error("Error checking username:", error);
    // Если ошибка сети или другая проблема - возвращаем false
    return false;
  }
};

// Проверка существования email
export const checkEmailExists = async (email) => {
  try {
    console.log("=== CHECK EMAIL ===");
    console.log("Checking email:", email);
    console.log("API URL:", `${API_BASE_URL}?email=${email}`);

    const response = await fetch(`${API_BASE_URL}?email=${email}`);

    console.log("Response status:", response.status);

    // MockAPI возвращает 404 если ничего не найдено - это нормально
    if (response.status === 404) {
      console.log("404 - Email not found (OK)");
      console.log("Email exists: false");
      console.log("===================");
      return false;
    }

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const users = await response.json();
    console.log("Found users:", users);
    console.log("Users count:", users.length);
    console.log("Email exists:", users.length > 0);
    console.log("===================");

    return users.length > 0;
  } catch (error) {
    console.error("Error checking email:", error);
    // Если ошибка сети или другая проблема - возвращаем false
    return false;
  }
};

// Регистрация нового пользователя
export const registerUser = async (userData) => {
  try {
    console.log("=== REGISTER USER ===");
    console.log("User data:", userData);

    const response = await fetch(API_BASE_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user: userData.username,
        email: userData.email,
        firstName: userData.firstName,
        lastName: userData.lastName,
        password: userData.password,
        age: parseInt(userData.age),
        phone: userData.phone,
        agreeToTerms: userData.agreeToTerms,
        agreedAt: Math.floor(Date.now() / 1000),
      }),
    });

    console.log("Response status:", response.status);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log("User registered:", data);
    console.log("=====================");

    return data;
  } catch (error) {
    console.error("Error registering user:", error);
    throw error;
  }
};
