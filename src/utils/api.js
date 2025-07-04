export const fetchEmployees = async (page = 1, results = 10) => {
  try {
    const response = await fetch(
      `https://randomuser.me/api/?page=${page}&results=${results}`
    );
    const data = await response.json();
    // Map RandomUser data to employee model
    return data.results.map((user, index) => ({
      id: `${page}-${index + 1}`,
      name: { first: user.name.first, last: user.name.last },
      age: user.dob.age,
      class: `Class ${Math.floor(Math.random() * 5) + 1}`,
      subjects: ['Math', 'Science', 'History'],
      attendance: `${Math.floor(Math.random() * 100)}%`,
      email: user.email,
      phone: user.phone,
    }));
  } catch (error) {
    console.error('Error fetching employees:', error);
    return [];
  }
};
