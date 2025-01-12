export default function loadSettings(container) {
    const html = `
      <h1 style="text-align: center; margin-bottom: 20px;">Settings</h1>
      <div class="container">
        <form>
          <div class="mb-3">
            <label for="siteTitle" class="form-label">Site Title</label>
            <input type="text" class="form-control" id="siteTitle" value="Admin Dashboard" />
          </div>
          <div class="mb-3">
            <label for="adminEmail" class="form-label">Admin Email</label>
            <input type="email" class="form-control" id="adminEmail" value="admin@example.com" />
          </div>
          <button type="submit" class="btn btn-success">Save Settings</button>
        </form>
      </div>
    `;
    container.innerHTML = html;
  }
  