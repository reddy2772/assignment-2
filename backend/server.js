const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('./cloudinary');
const Student = require('./models/studentSchema');

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI || "your-fallback-local-mongodb", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('✅ MongoDB connected'))
.catch((err) => console.error('❌ MongoDB error:', err));

// Cloudinary Storage config
const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'student_uploads',
    allowed_formats: ['jpg', 'jpeg', 'png'],
  },
});

const upload = multer({ storage });

// Routes

// Get all students
app.get('/students', async (req, res) => {
  try {
    const students = await Student.find();
    res.json(students);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch students' });
  }
});

// Get student by ID
app.get('/students/:id', async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    if (!student) {
      return res.status(404).json({ error: 'Student not found' });
    }
    res.json(student);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch student' });
  }
});

// Create new student
app.post('/students', upload.single('profilePhoto'), async (req, res) => {
  try {
    const {
      studentId,
      firstName,
      lastName,
      email,
      dob,
      department,
      enrollmentYear,
      isActive,
    } = req.body;

    const profilePhoto = req.file ? req.file.path : null;

    const student = new Student({
      studentId,
      firstName,
      lastName,
      email,
      dob,
      department,
      enrollmentYear,
      isActive,
      profilePhoto,
    });

    await student.save();
    res.status(201).json({ message: 'Student added successfully', student });
  } catch (error) {
    res.status(500).json({ error: 'Failed to add student' });
  }
});

// Update student
app.put('/students/:id', upload.single('profilePhoto'), async (req, res) => {
  try {
    const {
      studentId,
      firstName,
      lastName,
      email,
      dob,
      department,
      enrollmentYear,
      isActive,
    } = req.body;

    const updatedData = {
      studentId,
      firstName,
      lastName,
      email,
      dob,
      department,
      enrollmentYear,
      isActive,
    };

    if (req.file) {
      updatedData.profilePhoto = req.file.path;
    }

    const updatedStudent = await Student.findByIdAndUpdate(req.params.id, updatedData, {
      new: true,
    });

    if (!updatedStudent) {
      return res.status(404).json({ error: 'Student not found' });
    }

    res.json({ message: 'Student updated successfully', student: updatedStudent });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update student' });
  }
});

// Delete student
app.delete('/students/:id', async (req, res) => {
  try {
    const deletedStudent = await Student.findByIdAndDelete(req.params.id);
    if (!deletedStudent) {
      return res.status(404).json({ error: 'Student not found' });
    }
    res.json({ message: 'Student deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete student' });
  }
});

// Server listen
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
