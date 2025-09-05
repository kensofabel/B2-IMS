// Audit logs functions

function loadAuditLogs() {
    // Load audit logs data
    const auditLogs = dataManager.getAuditLogs();
    const tableBody = document.getElementById('audit-logs-table-body');

    tableBody.innerHTML = auditLogs.length > 0
        ? auditLogs.map(log => `
            <tr>
                <td>${posSystem.formatDate(log.timestamp)}</td>
                <td>${log.user}</td>
                <td>${log.action}</td>
                <td>${log.details}</td>
                <td>${log.ipAddress || 'N/A'}</td>
            </tr>
        `).join('')
        : '<tr><td colspan="5" style="text-align: center;">No audit logs available</td></tr>';
}

function filterAuditLogs() {
    const filter = document.getElementById('audit-log-filter').value;
    const dateFrom = document.getElementById('audit-log-date-from').value;
    const dateTo = document.getElementById('audit-log-date-to').value;

    let filteredLogs = dataManager.getAuditLogs();

    // Filter by type
    if (filter !== 'all') {
        filteredLogs = filteredLogs.filter(log => log.type === filter);
    }

    // Filter by date range
    if (dateFrom) {
        filteredLogs = filteredLogs.filter(log => new Date(log.timestamp) >= new Date(dateFrom));
    }
    if (dateTo) {
        filteredLogs = filteredLogs.filter(log => new Date(log.timestamp) <= new Date(dateTo));
    }

    const tableBody = document.getElementById('audit-logs-table-body');
    tableBody.innerHTML = filteredLogs.length > 0
        ? filteredLogs.map(log => `
            <tr>
                <td>${posSystem.formatDate(log.timestamp)}</td>
                <td>${log.user}</td>
                <td>${log.action}</td>
                <td>${log.details}</td>
                <td>${log.ipAddress || 'N/A'}</td>
            </tr>
        `).join('')
        : '<tr><td colspan="5" style="text-align: center;">No audit logs match the filter criteria</td></tr>';

    posSystem.showToast(`Filtered to ${filteredLogs.length} audit log entries`, 'info');
}

function exportAuditLogs() {
    const auditLogs = dataManager.getAuditLogs();
    if (auditLogs.length === 0) {
        posSystem.showToast('No audit logs to export', 'warning');
        return;
    }

    // Create CSV content
    const headers = ['Timestamp', 'User', 'Action', 'Details', 'IP Address'];
    const csvContent = [
        headers.join(','),
        ...auditLogs.map(log => [
            `"${posSystem.formatDate(log.timestamp)}"`,
            `"${log.user}"`,
            `"${log.action}"`,
            `"${log.details}"`,
            `"${log.ipAddress || 'N/A'}"`
        ].join(','))
    ].join('\n');

    // Create and download file
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `audit-logs-${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    posSystem.showToast('Audit logs exported successfully!', 'success');
}
