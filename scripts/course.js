// WDD 231 Course List Array
const courses = [
  {
    subject: 'CSE',
    number: 110,
    title: 'Introduction to Programming',
    credits: 2,
    certificate: 'Web and Computer Programming',
    description:
      'This course will introduce students to programming. It will introduce the building blocks of programming languages (variables, decisions, calculations, loops, array, and input/output) and use them to solve problems.',
    technology: ['Python'],
    completed: true // mark this true if you completed it
  },
  {
    subject: 'WDD',
    number: 130,
    title: 'Web Fundamentals',
    credits: 2,
    certificate: 'Web and Computer Programming',
    description:
      'This course introduces students to the World Wide Web and to careers in web site design and development. The course is hands on with students actually participating in simple web designs and programming.',
    technology: ['HTML', 'CSS'],
    completed: true
  },
  {
    subject: 'CSE',
    number: 111,
    title: 'Programming with Functions',
    credits: 2,
    certificate: 'Web and Computer Programming',
    description:
      'CSE 111 students become more organized, efficient, and powerful programmers by learning to research and call functions, write their own, and handle errors.',
    technology: ['Python'],
    completed: true
  },
  {
    subject: 'CSE',
    number: 210,
    title: 'Programming with Classes',
    credits: 2,
    certificate: 'Web and Computer Programming',
    description:
      'This course introduces the notion of classes and objects, encapsulation, inheritance, and polymorphism.',
    technology: ['C#'],
    completed: false
  },
  {
    subject: 'WDD',
    number: 131,
    title: 'Dynamic Web Fundamentals',
    credits: 2,
    certificate: 'Web and Computer Programming',
    description:
      'Students learn to create dynamic websites that use JavaScript to respond to events, update content, and create responsive user experiences.',
    technology: ['HTML', 'CSS', 'JavaScript'],
    completed: true
  },
  {
    subject: 'WDD',
    number: 231,
    title: 'Frontend Web Development I',
    credits: 2,
    certificate: 'Web and Computer Programming',
    description:
      'Students focus on user experience, accessibility, compliance, performance optimization, and API usage.',
    technology: ['HTML', 'CSS', 'JavaScript'],
    completed: false
  }
];

// Selectors
const courseContainer = document.querySelector('#courseContainer');
const totalCredits = document.querySelector('#totalCredits');

// Display function
function displayCourses(list) {
  courseContainer.innerHTML = '';

  let total = 0;

  list.forEach(course => {
    const card = document.createElement('div');
    card.classList.add('course-card');
    if (course.completed) card.classList.add('completed');

    card.innerHTML = `
      <h3>${course.subject} ${course.number}</h3>
      <p><strong>${course.title}</strong></p>
      <p>${course.description}</p>
      <p><strong>Credits:</strong> ${course.credits}</p>
      <p><strong>Technologies:</strong> ${course.technology.join(', ')}</p>
    `;

    total += course.credits;
    courseContainer.appendChild(card);
  });

  totalCredits.textContent = `Total credits: ${total}`;
}

// Filter buttons
document.querySelector('#all').addEventListener('click', () => displayCourses(courses));
document.querySelector('#cse').addEventListener('click', () =>
  displayCourses(courses.filter(course => course.subject === 'CSE'))
);
document.querySelector('#wdd').addEventListener('click', () =>
  displayCourses(courses.filter(course => course.subject === 'WDD'))
);

// Default view
displayCourses(courses);