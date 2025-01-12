export default function loadUsers(container) {
    const html = `
      <h1 style="text-align: center; margin-bottom: 20px;">User Management</h1>
      <div class="container">
        <div class="row">
          <div class="col-md-12">
            <table class="table table-striped">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1</td>
                  <td>John Doe</td>
                  <td>john.doe@example.com</td>
                  <td>Admin</td>
                  <td><button class="btn btn-primary btn-sm">Edit</button></td>
                </tr>
                <tr>
                  <td>2</td>
                  <td>Jane Smith</td>
                  <td>jane.smith@example.com</td>
                  <td>User</td>
                  <td><button class="btn btn-primary btn-sm">Edit</button></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    `;
    container.innerHTML = html;
  }
  