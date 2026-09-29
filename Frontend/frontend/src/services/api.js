const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

// --- Auth Endpoints ---

export const loginUser = async (credentials) => {
  const response = await fetch(`${API_URL}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  });
  
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Login failed");
  }
  
  return response.json();
};

export const registerUser = async (userData) => {
  const response = await fetch(`${API_URL}/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });
  
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Registration failed");
  }
  
  return response.json();
};

//  Student Endpoints 

export const getStudents = async () => {
  const response = await fetch(`${API_URL}/student`);
  if (!response.ok) throw new Error("Failed to fetch students");
  return response.json();
};

export const createStudent = async (studentData) => {
  const response = await fetch(`${API_URL}/student`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(studentData),
  });
  if (!response.ok) throw new Error("Failed to create student");
  return response.json();
};

export const updateStudent = async (id, studentData) => {
  const response = await fetch(`${API_URL}/student/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(studentData),
  });
  if (!response.ok) throw new Error("Failed to update student");
  return response.json();
};

export const deleteStudent = async (id) => {
  const response = await fetch(`${API_URL}/student/${id}`, {
    method: "DELETE",
  });
  if (!response.ok) throw new Error("Failed to delete student");
  return response.json();
};
