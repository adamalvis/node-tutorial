const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/playground') 
  .then(() => console.log('connected to mongodb'))
  .catch(err => console.error('Could not connect to MongoDB...', err));

const courseSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 255,
  },
  category: {
    type: String,
    required: true,
    enum: ['web', 'mobile', 'network'],
    lowercase: true
  },
  author: String,
  tags: {
    type: Array,
    validate: {
      isAsync: true,
      validator: function (v, callback) {
        setTimeout(() => {
          // async work
          const result = v && v.length > 0;
          callback(result);
        }, 1000);
      },
      message: 'A course should have at least one tag',
    }
  },
  date: { type: Date, default: Date.now },
  isPublished: Boolean,
  price: {
    type: Number,
    required: function() {
      return this.isPublished;
    },
    min: 10,
    max: 200,
    get: v => Math.round(v),
    set: v =>  Math.round(v),
  },
});

const Course = mongoose.model('courses', courseSchema);

async function createCourse() {
  const course = new Course({
    name: 'Node.js Course',
    author: 'Mosh',
    tags: ['frontend'],
    isPublished: true,
    category: 'Web',
    price: 99.99
  });
  
  try {
    await course.validate();
    const result = await course.save();
  } catch(e) {
    for(let field in e.errors) {
      console.log(e.errors[field].message);
    }
  }
}

async function getCourses() {
  const pageNumber = 2;
  const pageSize = 10;

  const courses = await Course
    .find({ _id: '5b99ad16344f3a9c0d1e9b65' })
    // .skip((pageNumber - 1) * pageSize)
    // .limit(pageSize)
    .sort({ name: 1 })
  console.log(courses[0].price);
}

async function updateCourse(id) {
  // Approach: query first
  const course = await Course.findByIdAndUpdate(id, {
    $set: {
      author: 'Jason',
      isPublished: false
    },
  }, { new: true });
  console.log(course);
}

async function removeCourse(id) {
  const result = await Course.findByIdAndRemove(id);
  console.log(result);
}

getCourses();
// createCourse();
// removeCourse('5b883ad92e4bc4a7ed2b0a74');
