import React from 'react';

const StudentForm = ({ form, editingStudentId, handleChange, handleSubmit, handleCancelEdit, loading }) => {
  return (
    <div className="form-section">
      <div className="card">
        <div className="card-header">
          <h2>{editingStudentId ? 'Edit Student' : 'Add New Student'}</h2>
        </div>
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="studentId">Student ID</label>
            <input 
              type="text" 
              id="studentId" 
              name="studentId" 
              className="form-control" 
              value={form.studentId} 
              onChange={handleChange} 
              required 
            />
          </div>
          
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="firstName">First Name</label>
              <input 
                type="text" 
                id="firstName" 
                name="firstName" 
                className="form-control" 
                value={form.firstName} 
                onChange={handleChange} 
                required 
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="lastName">Last Name</label>
              <input 
                type="text" 
                id="lastName" 
                name="lastName" 
                className="form-control" 
                value={form.lastName} 
                onChange={handleChange} 
                required 
              />
            </div>
          </div>
          
          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input 
              type="email" 
              id="email" 
              name="email" 
              className="form-control" 
              value={form.email} 
              onChange={handleChange} 
              required 
            />
          </div>
          
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="dob">Date of Birth</label>
              <input 
                type="date" 
                id="dob" 
                name="dob" 
                className="form-control" 
                value={form.dob} 
                onChange={handleChange} 
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="enrollmentYear">Enrollment Year</label>
              <input 
                type="number" 
                id="enrollmentYear" 
                name="enrollmentYear" 
                className="form-control" 
                value={form.enrollmentYear} 
                onChange={handleChange} 
                min="2000" 
                max="2030" 
              />
            </div>
          </div>
          
          <div className="form-group">
            <label htmlFor="department">Department</label>
            <select 
              id="department" 
              name="department" 
              className="form-control" 
              value={form.department} 
              onChange={handleChange}
            >
              <option value="">Select Department</option>
              <option value="Computer Science">Computer Science</option>
              <option value="Engineering">Engineering</option>
              <option value="Business">Business</option>
              <option value="Arts">Arts</option>
              <option value="Science">Science</option>
              <option value="Medicine">Medicine</option>
              <option value="Law">Law</option>
            </select>
          </div>
          
          <div className="form-group">
            <div className="form-check">
              <input 
                type="checkbox" 
                id="isActive" 
                name="isActive" 
                className="form-check-input" 
                checked={form.isActive} 
                onChange={handleChange} 
              />
              <label htmlFor="isActive" className="form-check-label">Active Student</label>
            </div>
          </div>
          
          <div className="btn-group">
            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? (
                <>
                  <span className="spinner"></span>
                  <span>{editingStudentId ? 'Updating...' : 'Adding...'}</span>
                </>
              ) : (
                <>{editingStudentId ? 'Update Student' : 'Add Student'}</>
              )}
            </button>
            
            {editingStudentId && (
              <button 
                type="button" 
                className="btn btn-secondary" 
                onClick={handleCancelEdit}
                disabled={loading}
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default StudentForm;