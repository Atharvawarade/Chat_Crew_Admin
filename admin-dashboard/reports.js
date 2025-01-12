export default function loadReports(container) {
    const html = `
      <h1 style="text-align: center; margin-bottom: 20px;">Reports</h1>
      <div class="container">
        <p>Here you can view and generate various reports:</p>
        <ul>
          <li><a href="#">Daily Report</a></li>
          <li><a href="#">Weekly Report</a></li>
          <li><a href="#">Monthly Report</a></li>
        </ul>
      </div>
    `;
    container.innerHTML = html;
  }
  