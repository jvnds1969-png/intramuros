function updateTaskStatus(taskId, bundleId) {
  const subtasks = document.querySelectorAll(
    '.task-checkbox[data-task-id="' + taskId + '"]'
  );
  const total = subtasks.length;
  const completed = Array.from(subtasks).filter(cb => cb.checked).length;
  const allChecked = total > 0 && completed === total;

  const taskItem = document.querySelector('.task-item[data-task-id="' + taskId + '"]');
  if (taskItem) {
    taskItem.classList.toggle('completed', allChecked);
    const statusLabel = taskItem.querySelector('.task-status-label');
    if (statusLabel) statusLabel.textContent = allChecked ? 'In orde' : 'Open';
  }

  if (bundleId) updateBundleProgress(bundleId, completed, total);

  if (!patientTasksList || !taskItem) return;

  const existingLi = patientTasksList.querySelector('li[data-task-id="' + taskId + '"]');

  if (allChecked) {
    if (!existingLi) {
      const title = taskItem.querySelector('.task-title')?.textContent?.trim() || 'Taak';
      const providerText = taskItem.querySelector('.task-provider')?.textContent?.trim() || '';
      const li = document.createElement('li');
      li.dataset.taskId = taskId;
      // Taak + zorgverlener samen tonen
      li.textContent = title + ' – in orde · ' + providerText;
      patientTasksList.appendChild(li);
    }
  } else {
    if (existingLi) existingLi.remove();
  }
}
