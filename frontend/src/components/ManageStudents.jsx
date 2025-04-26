import React from 'react';
import './ManageStudent.css';

const ManageStudent = ({ students, handleEdit, handleDelete, apiUrl, loading }) => {
  return (
    <div className="manage-student-container card">
      <h2>Manage Students</h2>

      {loading ? (
        <div className="loading-indicator">
          <div className="spinner" /> Loading students...
        </div>
      ) : (
        <table className="student-table">
          <thead>
            <tr>
              <th>Photo</th>
              <th>Student ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>DOB</th>
              <th>Department</th>
              <th>Year</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {students.length === 0 ? (
              <tr>
                <td colSpan="9" className="no-data">No students found.</td>
              </tr>
            ) : (
              students.map((student) => (
                <tr key={student._id}>
                  <td>
                    {student.profilePhoto ? (
                      <img
                        src={`${apiUrl}uploads/${student.profilePhoto}`}
                        alt="Profile"
                        className="student-photo"
                      />
                    ) : (
                      <span className="no-photo">N/A</span>
                    )}
                  </td>
                  <td>{student.studentId}</td>
                  <td>{student.firstName} {student.lastName}</td>
                  <td>{student.email}</td>
                  <td>{student.dob ? student.dob.substring(0, 10) : 'N/A'}</td>
                  <td>{student.department}</td>
                  <td>{student.enrollmentYear}</td>
                  <td>
                    <span className={`status ${student.isActive ? 'active' : 'inactive'}`}>
                      {student.isActive ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                  <td>
                    <button className="btn btn-secondary" onClick={() => handleEdit(student)}>Edit</button>
                    <button className="btn btn-danger" onClick={() => handleDelete(student._id)}>Delete</button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ManageStudent;
